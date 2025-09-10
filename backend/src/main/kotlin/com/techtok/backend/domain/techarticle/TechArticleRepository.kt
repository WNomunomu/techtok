package com.techtok.backend.domain.techarticle

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TechArticleRepository : JpaRepository<TechArticle, Long> {
    fun existsBySourceUrl(sourceUrl: String): Boolean
    fun findAllByOrderByCreatedAtDesc(): List<TechArticle>
}