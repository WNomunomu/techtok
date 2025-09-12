package com.techtok.backend.domain.techarticle

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface TechArticleRepository : JpaRepository<TechArticle, Long> {

    @Query("SELECT t FROM TechArticle t ORDER BY t.createdAt DESC")
    fun findAllOrderByCreatedAtDesc(pageable: Pageable): Page<TechArticle>

    @Query("SELECT t FROM TechArticle t ORDER BY t.publishedAt DESC")
    fun findAllOrderByPublishedAtDesc(pageable: Pageable): Page<TechArticle>

    @Query("SELECT t FROM TechArticle t WHERE t.createdAt <= :untilDate ORDER BY t.createdAt DESC")
    fun findByCreatedAtUntil(@Param("untilDate") untilDate: LocalDateTime, pageable: Pageable): Page<TechArticle>

    @Query("SELECT t FROM TechArticle t WHERE t.publishedAt <= :untilDate ORDER BY t.publishedAt DESC")
    fun findByPublishedAtUntil(@Param("untilDate") untilDate: LocalDateTime, pageable: Pageable): Page<TechArticle>

    fun existsBySourceUrl(sourceUrl: String): Boolean

    fun findAllByOrderByCreatedAtDesc(): List<TechArticle>
}