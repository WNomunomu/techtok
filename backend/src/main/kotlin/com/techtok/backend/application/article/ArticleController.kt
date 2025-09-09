package com.techtok.backend.application.article

import com.techtok.backend.application.article.response.ArticleResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/articles")
class ArticleController(
    private val articleService: ArticleService
) {

    @GetMapping
    fun getAllArticles(): List<ArticleResponse> {
        return articleService.getAllArticles()
    }

    @GetMapping("/{id}")
    fun getArticleById(@PathVariable id: Long): ResponseEntity<ArticleResponse> {
        val article = articleService.getArticleById(id)
        return if (article != null) {
            ResponseEntity.ok(article)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping("/fetch")
    fun fetchArticlesManually(): ResponseEntity<String> {
        articleService.fetchAndSaveArticles()
        return ResponseEntity.ok("Articles fetch initiated")
    }
}