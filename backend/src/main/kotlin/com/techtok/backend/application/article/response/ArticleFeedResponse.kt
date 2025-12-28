package com.techtok.backend.application.article.response

data class ArticleFeedResponse(
    val items: List<TechArticleResponse>,
    val nextCursor: String?,
)

data class FeedCursor(
    val latest: LatestCursor? = null,
    val updated: UpdatedCursor? = null,
    val popular: PopularCursor? = null,
    val random: RandomCursor? = null,
    val seed: String? = null,
)

data class LatestCursor(
    val publishedAt: String,
    val id: Long,
)

data class UpdatedCursor(
    val updatedAt: String,
    val id: Long,
)

data class PopularCursor(
    val stocksCount: Int,
    val publishedAt: String,
    val id: Long,
)

data class RandomCursor(
    val randomKey: Double,
    val id: Long,
)
