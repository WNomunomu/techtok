package com.techtok.backend.application.article

import com.techtok.backend.application.article.response.TechArticleResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/articles")
class TechArticleController(
    private val techArticleService: TechArticleService
) {

    @GetMapping
    fun getAllArticles(): List<TechArticleResponse> {
        return techArticleService.getAllArticles()
    }

    @GetMapping("/{id}")
    fun getArticleById(@PathVariable id: Long): ResponseEntity<TechArticleResponse> {
        val article = techArticleService.getArticleById(id)
        return (if (article != null) {
            ResponseEntity.ok(article)
        } else {
            ResponseEntity.notFound().build()
        }) as ResponseEntity<TechArticleResponse>
    }

    @PostMapping("/fetch")
    fun fetchArticlesManually(): ResponseEntity<String> {
        techArticleService.fetchAndSaveArticles()
        return ResponseEntity.ok("Articles fetch initiated")
    }
}