package com.techtok.backend.application.article

import com.techtok.backend.application.article.response.TechArticleResponse
import com.techtok.backend.application.article.response.QiitaArticle
import com.techtok.backend.domain.techarticle.TechArticle
import com.techtok.backend.domain.techarticle.TechArticleRepository
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Service
class TechArticleService(
    private val techArticleRepository: TechArticleRepository,
    private val webClient: WebClient
) {
    
    private val logger = LoggerFactory.getLogger(TechArticleService::class.java)
    
    companion object {
        private const val QIITA_API_URL = "https://qiita.com/api/v2/items"
        private val ISO_FORMATTER = DateTimeFormatter.ISO_OFFSET_DATE_TIME
    }
    @Scheduled(fixedRate = 200000) // Every 200 seconds
    fun fetchAndSaveArticles() {
        try {
            logger.info("Fetching articles from Qiita API")
            
            val articles = webClient.get()
                .uri(QIITA_API_URL)
                .retrieve()
                .bodyToFlux(QiitaArticle::class.java)
                .collectList()
                .block() ?: emptyList()
            
            articles.forEach { qiitaArticle ->
                val sourceUrl = qiitaArticle.url
                
                // Check if article already exists to avoid duplicates
                if (!techArticleRepository.existsBySourceUrl(sourceUrl)) {

                    val techArticle = TechArticle(
                        sourceUrl = sourceUrl,
                        title = qiitaArticle.title,
                        author = qiitaArticle.user.name + qiitaArticle.user.id,
                        publishedAt = LocalDateTime.parse(qiitaArticle.createdAt, ISO_FORMATTER),
                        summary = ""
                    )
                    
                    techArticleRepository.save(techArticle)
                    logger.info("Saved new article: ${techArticle.title}")
                }
            }
            
            logger.info("Finished processing articles from Qiita API")
            
        } catch (e: Exception) {
            logger.error("Error fetching articles from Qiita API", e)
        }
    }
    
    fun getAllArticles(): List<TechArticleResponse> {
        return techArticleRepository.findAllByOrderByCreatedAtDesc()
            .map { article ->
                TechArticleResponse(
                    id = article.id,
                    title = article.title,
                    author = article.author,
                    summary = article.summary,
                    sourceUrl = article.sourceUrl,
                    publishedAt = article.publishedAt,
                    createdAt = article.createdAt
                )
            }
    }
    
    fun getArticleById(id: Long): TechArticleResponse? {
        return techArticleRepository.findById(id).orElse(null)?.let { article ->
            TechArticleResponse(
                id = article.id,
                title = article.title,
                author = article.author,
                summary = article.summary,
                sourceUrl = article.sourceUrl,
                publishedAt = article.publishedAt,
                createdAt = article.createdAt
            )
        }
    }
}