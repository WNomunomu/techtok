package com.techtok.backend.domain.techarticle

import jakarta.persistence.*
import jakarta.validation.constraints.*
import java.time.LocalDateTime

@Entity
@Table(name = "tech_articles")
data class TechArticle(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "title", nullable = false, length = 500)
    @NotBlank(message = "タイトルは必須です")
    @Size(max = 200, message = "タイトルは200文字以内で入力してください")
    val title: String,

    @Column(name = "summary", nullable = false, columnDefinition = "TEXT")
    @NotBlank(message = "要約は必須です")
    val summary: String,

    @Column(name = "author", nullable = false, length = 100)
    @NotBlank(message = "著者は必須です")
    @Size(max = 100, message = "著者は100文字以内で入力してください")
    val author: String,

    @Column(name = "source_url", nullable = false, length = 1000, unique = true)
    @NotBlank(message = "ソースURLは必須です")
    @Size(max = 1000, message = "ソースURLは1000文字以内で入力してください")
    @Pattern(regexp = "https?://.*", message = "有効なURLを入力してください")
    val sourceUrl: String,

    @Column(name = "published_at", nullable = false)
    @NotNull(message = "公開日時は必須です")
    val publishedAt: LocalDateTime,

    @Column(name = "created_at", nullable = false)
    @NotNull(message = "作成日時は必須です")
    val createdAt: LocalDateTime = LocalDateTime.now()
) {
    constructor() : this(
        id = null,
        title = "",
        summary = "",
        author = "",
        sourceUrl = "",
        publishedAt = LocalDateTime.now(),
        createdAt = LocalDateTime.now()
    )
}