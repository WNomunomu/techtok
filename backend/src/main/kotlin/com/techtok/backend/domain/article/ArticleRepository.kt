package com.techtok.backend.domain.article

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ArticleRepository : JpaRepository<Article, Long> {
    fun existsBySourceUrl(sourceUrl: String): Boolean
    fun findAllByOrderByCreatedAtDesc(): List<Article>
}