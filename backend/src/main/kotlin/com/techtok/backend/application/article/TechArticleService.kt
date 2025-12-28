package com.techtok.backend.application.article

import com.techtok.backend.application.article.response.QiitaArticle
import com.techtok.backend.application.article.response.TechArticleResponse
import com.techtok.backend.application.openai.OpenAiService
import com.techtok.backend.domain.techarticle.TechArticle
import com.techtok.backend.domain.techarticle.TechArticleRepository
import org.slf4j.LoggerFactory
import org.springframework.http.HttpHeaders
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.util.UriComponentsBuilder
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Service
class TechArticleService(
    private val techArticleRepository: TechArticleRepository,
    private val webClient: WebClient,
    private val openAiService: OpenAiService,
) {
    private val logger = LoggerFactory.getLogger(TechArticleService::class.java)

    companion object {
        private const val QIITA_API_URL = "https://qiita.com/api/v2/items"
        private val ISO_FORMATTER = DateTimeFormatter.ISO_OFFSET_DATE_TIME
        private const val PER_PAGE = 100
        private const val POPULAR_QUERY = "stocks:>=50"
    }

    @Scheduled(fixedRateString = "\${app.fetch-rate-ms}")
    fun fetchAndSaveArticles() {
        try {
            logger.info("Fetching articles from Qiita API (latest)")
            val latestPublishedAt = techArticleRepository.findTopByOrderByPublishedAtDesc()?.publishedAt
            val latestArticles = fetchQiitaItems(null, latestPublishedAt)
            latestArticles.forEach { qiitaArticle ->
                upsertFromQiita(qiitaArticle)
            }

            logger.info("Fetching articles from Qiita API (popular)")
            val popularArticles = fetchQiitaItems(POPULAR_QUERY, null)
            popularArticles.forEach { qiitaArticle ->
                upsertFromQiita(qiitaArticle)
            }

            logger.info("Finished processing articles from Qiita API")
        } catch (e: Exception) {
            logger.error("Error fetching articles from Qiita API", e)
        }
    }

    private fun fetchQiitaItems(
        query: String?,
        stopAtPublishedAt: LocalDateTime?,
    ): List<QiitaArticle> {
        val results = mutableListOf<QiitaArticle>()
        var page = 1
        var hasNext = true

        while (hasNext) {
            val uriBuilder =
                UriComponentsBuilder
                    .fromHttpUrl(QIITA_API_URL)
                    .queryParam("page", page)
                    .queryParam("per_page", PER_PAGE)
            if (!query.isNullOrBlank()) {
                uriBuilder.queryParam("query", query)
            }

            val response =
                webClient
                    .get()
                    .uri(uriBuilder.build(true).toUri())
                    .retrieve()
                    .toEntityList(QiitaArticle::class.java)
                    .block()

            val items = response?.body ?: emptyList()
            results.addAll(items)

            hasNext = hasNextPage(response?.headers)
            if (!items.isEmpty() && stopAtPublishedAt != null) {
                val oldestPublishedAt = LocalDateTime.parse(items.last().createdAt, ISO_FORMATTER)
                if (oldestPublishedAt.isBefore(stopAtPublishedAt)) {
                    hasNext = false
                }
            }
            if (page >= 100) {
                hasNext = false
            }
            page += 1
        }

        return results
    }

    private fun hasNextPage(headers: HttpHeaders?): Boolean {
        val linkHeader = headers?.getFirst(HttpHeaders.LINK) ?: return false
        return linkHeader.contains("rel=\"next\"")
    }

    private fun upsertFromQiita(qiitaArticle: QiitaArticle) {
        val sourceUrl = qiitaArticle.url
        val qiitaId = qiitaArticle.id
        val updatedAt = LocalDateTime.parse(qiitaArticle.updatedAt, ISO_FORMATTER)
        val publishedAt = LocalDateTime.parse(qiitaArticle.createdAt, ISO_FORMATTER)

        val existing =
            techArticleRepository.findByQiitaId(qiitaId)
                ?: techArticleRepository.findBySourceUrl(sourceUrl)

        if (existing != null) {
            val updatedArticle =
                existing.copy(
                    qiitaId = qiitaId,
                    updatedAt = updatedAt,
                    stocksCount = qiitaArticle.stocksCount,
                )
            techArticleRepository.save(updatedArticle)
            return
        }

        val summary = openAiService.generateSummary(qiitaArticle.renderedBody)
        val techArticle =
            TechArticle(
                sourceUrl = sourceUrl,
                qiitaId = qiitaId,
                title = qiitaArticle.title,
                author = qiitaArticle.user.name + qiitaArticle.user.id,
                publishedAt = publishedAt,
                updatedAt = updatedAt,
                stocksCount = qiitaArticle.stocksCount,
                summary = summary,
            )

        techArticleRepository.save(techArticle)
        logger.info("Saved new article: ${techArticle.title}")
    }

    fun getAllArticles(): List<TechArticleResponse> =
        techArticleRepository
            .findAllByOrderByCreatedAtDesc()
            .map { article ->
                TechArticleResponse(
                    id = article.id,
                    title = article.title,
                    author = article.author,
                    summary = article.summary,
                    sourceUrl = article.sourceUrl,
                    publishedAt = article.publishedAt,
                    createdAt = article.createdAt,
                )
            }

    fun getArticleById(id: Long): TechArticleResponse? =
        techArticleRepository.findById(id).orElse(null)?.let { article ->
            TechArticleResponse(
                id = article.id,
                title = article.title,
                author = article.author,
                summary = article.summary,
                sourceUrl = article.sourceUrl,
                publishedAt = article.publishedAt,
                createdAt = article.createdAt,
            )
        }
}
