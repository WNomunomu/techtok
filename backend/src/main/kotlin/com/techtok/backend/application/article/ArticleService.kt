package com.techtok.backend.application.article

import com.techtok.backend.application.article.response.ArticleResponse
import com.techtok.backend.application.article.response.QiitaArticle
import com.techtok.backend.domain.article.Article
import com.techtok.backend.domain.article.ArticleRepository
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Service
class ArticleService(
    private val articleRepository: ArticleRepository,
    private val webClient: WebClient
) {
    
    private val logger = LoggerFactory.getLogger(ArticleService::class.java)
    
    companion object {
        private const val QIITA_API_URL = "https://qiita.com/api/v2/items"
        private val ISO_FORMATTER = DateTimeFormatter.ISO_OFFSET_DATE_TIME
    }
    
    @Scheduled(fixedRate = 100000) // Every 100 seconds
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
                if (!articleRepository.existsBySourceUrl(sourceUrl)) {
                    // Extract a summary from the body (first 200 characters)
                    val summary = qiitaArticle.body.take(200).replace("\n", " ").trim()
                    
                    val article = Article(
                        sourceUrl = sourceUrl,
                        title = qiitaArticle.title,
                        author = qiitaArticle.user.name ?: qiitaArticle.user.id,
                        publishedAt = LocalDateTime.parse(qiitaArticle.createdAt, ISO_FORMATTER),
                        summary = summary
                    )
                    
                    articleRepository.save(article)
                    logger.info("Saved new article: ${article.title}")
                }
            }
            
            logger.info("Finished processing articles from Qiita API")
            
        } catch (e: Exception) {
            logger.error("Error fetching articles from Qiita API", e)
        }
    }
    
    fun getAllArticles(): List<ArticleResponse> {
        return articleRepository.findAllByOrderByCreatedAtDesc()
            .map { article ->
                ArticleResponse(
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
    
    fun getArticleById(id: Long): ArticleResponse? {
        return articleRepository.findById(id).orElse(null)?.let { article ->
            ArticleResponse(
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