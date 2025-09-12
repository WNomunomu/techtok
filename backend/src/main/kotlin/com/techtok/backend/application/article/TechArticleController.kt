package com.techtok.backend.application.article

import com.techtok.backend.application.article.response.TechArticleResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/articles")
@CrossOrigin(origins = ["http://localhost:5173"], allowCredentials = "true")
class TechArticleController(
    private val techArticleService: TechArticleService,
) {
    @GetMapping
    fun getAllArticles(): List<TechArticleResponse> = techArticleService.getAllArticles()

    @GetMapping("/{id}")
    fun getArticleById(
        @PathVariable id: Long,
    ): ResponseEntity<TechArticleResponse> {
        val article = techArticleService.getArticleById(id)
        return (
            if (article != null) {
                ResponseEntity.ok(article)
            } else {
                ResponseEntity.notFound().build()
            }
        )
    }

    @PostMapping("/fetch")
    fun fetchArticlesManually(): ResponseEntity<String> {
        techArticleService.fetchAndSaveArticles()
        return ResponseEntity.ok("Articles fetch initiated")
    }
}
