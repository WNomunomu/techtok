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

    @Query("SELECT t FROM TechArticle t ORDER BY t.publishedAt DESC, t.id DESC")
    fun findLatestForFeed(pageable: org.springframework.data.domain.Pageable): List<TechArticle>

    @Query(
        """
            SELECT t FROM TechArticle t
            WHERE t.publishedAt < :publishedAt
                OR (t.publishedAt = :publishedAt AND t.id < :id)
            ORDER BY t.publishedAt DESC, t.id DESC
            """,
    )
    fun findLatestForFeedBefore(
        @Param("publishedAt") publishedAt: LocalDateTime,
        @Param("id") id: Long,
        pageable: org.springframework.data.domain.Pageable,
    ): List<TechArticle>

    @Query(
        """
            SELECT t FROM TechArticle t
            WHERE t.updatedAt IS NOT NULL
            ORDER BY t.updatedAt DESC, t.id DESC
            """,
    )
    fun findUpdatedForFeed(pageable: org.springframework.data.domain.Pageable): List<TechArticle>

    @Query(
        """
            SELECT t FROM TechArticle t
            WHERE t.updatedAt IS NOT NULL AND (
                t.updatedAt < :updatedAt
                OR (t.updatedAt = :updatedAt AND t.id < :id)
            )
            ORDER BY t.updatedAt DESC, t.id DESC
            """,
    )
    fun findUpdatedForFeedBefore(
        @Param("updatedAt") updatedAt: LocalDateTime,
        @Param("id") id: Long,
        pageable: org.springframework.data.domain.Pageable,
    ): List<TechArticle>

    @Query("SELECT t FROM TechArticle t ORDER BY t.stocksCount DESC, t.publishedAt DESC, t.id DESC")
    fun findPopularForFeed(pageable: org.springframework.data.domain.Pageable): List<TechArticle>

    @Query(
        """
            SELECT t FROM TechArticle t
            WHERE t.stocksCount < :stocksCount
                OR (
                    t.stocksCount = :stocksCount
                    AND (
                        t.publishedAt < :publishedAt
                        OR (t.publishedAt = :publishedAt AND t.id < :id)
                    )
                )
            ORDER BY t.stocksCount DESC, t.publishedAt DESC, t.id DESC
            """,
    )
    fun findPopularForFeedBefore(
        @Param("stocksCount") stocksCount: Int,
        @Param("publishedAt") publishedAt: LocalDateTime,
        @Param("id") id: Long,
        pageable: org.springframework.data.domain.Pageable,
    ): List<TechArticle>

    @Query("SELECT t FROM TechArticle t ORDER BY t.randomKey ASC, t.id ASC")
    fun findRandomForFeed(pageable: org.springframework.data.domain.Pageable): List<TechArticle>

    @Query(
        """
            SELECT t FROM TechArticle t
            WHERE t.randomKey > :randomKey
                OR (t.randomKey = :randomKey AND t.id > :id)
            ORDER BY t.randomKey ASC, t.id ASC
            """,
    )
    fun findRandomForFeedAfter(
        @Param("randomKey") randomKey: Double,
        @Param("id") id: Long,
        pageable: org.springframework.data.domain.Pageable,
    ): List<TechArticle>

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
