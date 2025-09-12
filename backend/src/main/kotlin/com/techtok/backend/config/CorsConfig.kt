package com.techtok.backend.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
class CorsConfig {
    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()

        // Allow the frontend origin
        configuration.allowedOrigins = listOf("http://localhost:5173")

        // Allow all HTTP methods
        configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")

        // Allow all headers
        configuration.allowedHeaders = listOf("*")

        // Allow credentials
        configuration.allowCredentials = true

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)

        return source
    }
}
