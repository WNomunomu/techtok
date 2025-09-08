package com.example.taskmanager.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/hello")
class HelloController {

  @GetMapping
  fun hello(): Map<String, String> {
    return mapOf(
      "message" to "Hello, Spring Boot with Kotlin!",
      "timestamp" to java.time.LocalDateTime.now().toString()
    )
  }

  @GetMapping("/{name}")
  fun helloName(@PathVariable name: String): Map<String, String> {
    return mapOf(
      "message" to "Hello, $name",
      "timestamp" to java.time.LocalDateTime.now().toString()
    )
  }

}
