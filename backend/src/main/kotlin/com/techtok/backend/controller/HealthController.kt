package com.techtok.backend.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime

@RestController
@RequestMapping("/api")
class HealthController {
    
    @GetMapping("/health")
    fun health(): ResponseEntity<Map<String, Any>> {
        val response = mapOf(
            "status" to "UP",
            "timestamp" to LocalDateTime.now(),
            "application" to "TechTok Backend",
            "version" to "1.0.0"
        )
        return ResponseEntity.ok(response)
    }
    
    @GetMapping("/info")
    fun info(): ResponseEntity<Map<String, Any>> {
        val response = mapOf(
            "application" to mapOf(
                "name" to "TechTok Backend",
                "version" to "1.0.0",
                "description" to "Backend API for TechTok application"
            ),
            "build" to mapOf(
                "version" to "1.0.0",
                "time" to LocalDateTime.now()
            )
        )
        return ResponseEntity.ok(response)
    }
}