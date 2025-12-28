package com.techtok.backend.domain.techarticle

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
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
    fun findByCreatedAtUntil(
        @Param("untilDate") untilDate: LocalDateTime,
        pageable: Pageable,
    ): Page<TechArticle>

    @Query("SELECT t FROM TechArticle t WHERE t.publishedAt <= :untilDate ORDER BY t.publishedAt DESC")
    fun findByPublishedAtUntil(
        @Param("untilDate") untilDate: LocalDateTime,
        pageable: Pageable,
    ): Page<TechArticle>

    fun existsBySourceUrl(sourceUrl: String): Boolean

    fun existsByQiitaId(qiitaId: String): Boolean

    fun findBySourceUrl(sourceUrl: String): TechArticle?

    fun findByQiitaId(qiitaId: String): TechArticle?

    fun findTopByOrderByPublishedAtDesc(): TechArticle?

    @Modifying
    @Query(
        value = """
            UPDATE tech_articles
            SET random_key = random()
            WHERE id IN (
                SELECT id
                FROM tech_articles
                ORDER BY random()
                LIMIT :limit
            )
            """,
        nativeQuery = true,
    )
    fun refreshRandomKeys(
        @Param("limit") limit: Int,
    ): Int

    fun findAllByOrderByCreatedAtDesc(): List<TechArticle>
}
