package com.techtok.backend.domain.article

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "tech_articles")
data class Article(
    @Column(name = "source_url", nullable = false, unique = true, length = 1000)
    val sourceUrl: String,
    
    @Column(name = "title", nullable = false, length = 500)
    val title: String,
    
    @Column(name = "author", nullable = false, length = 100)
    val author: String,
    
    @Column(name = "published_at", nullable = false)
    val publishedAt: LocalDateTime,
    
    @Column(name = "summary", nullable = false, columnDefinition = "TEXT")
    val summary: String = ""
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0
    
    @Column(name = "created_at", nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
}