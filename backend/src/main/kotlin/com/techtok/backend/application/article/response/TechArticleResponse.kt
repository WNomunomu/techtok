package com.techtok.backend.application.article.response

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDateTime

data class QiitaArticle(
    val id: String,
    val title: String,
    val body: String,
    @JsonProperty("rendered_body")
    val renderedBody: String,
    val url: String,
    @JsonProperty("created_at")
    val createdAt: String,
    @JsonProperty("updated_at")
    val updatedAt: String,
    val user: QiitaUser,
    val tags: List<QiitaTag>,
    @JsonProperty("likes_count")
    val likesCount: Int,
    @JsonProperty("stocks_count")
    val stocksCount: Int,
    @JsonProperty("comments_count")
    val commentsCount: Int
)

data class QiitaUser(
    val id: String,
    val name: String?,
    @JsonProperty("profile_image_url")
    val profileImageUrl: String?,
    val description: String?
)

data class QiitaTag(
    val name: String,
    val versions: List<String>
)

data class TechArticleResponse(
    val id: Long?,
    val title: String,
    val author: String,
    val summary: String,
    val sourceUrl: String,
    val publishedAt: LocalDateTime,
    val createdAt: LocalDateTime
)