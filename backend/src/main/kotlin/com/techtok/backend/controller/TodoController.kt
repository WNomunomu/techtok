package com.techtok.backend.controller

import com.techtok.backend.entity.Todo
import com.techtok.backend.service.TodoService
import jakarta.validation.Valid
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

data class CreateTodoRequest(
    @field:NotBlank(message = "Title is required")
    @field:Size(min = 1, max = 200, message = "Title must be between 1 and 200 characters")
    val title: String,
    
    @field:Size(max = 1000, message = "Description cannot exceed 1000 characters")
    val description: String? = null
)

data class UpdateTodoRequest(
    @field:Size(min = 1, max = 200, message = "Title must be between 1 and 200 characters")
    val title: String? = null,
    
    @field:Size(max = 1000, message = "Description cannot exceed 1000 characters")
    val description: String? = null,
    
    val isCompleted: Boolean? = null
)

@RestController
@RequestMapping("/api/v1/todos")
class TodoController(
    private val todoService: TodoService
) {
    
    @GetMapping
    fun getAllTodos(): ResponseEntity<List<Todo>> {
        val todos = todoService.getAllTodos()
        return ResponseEntity.ok(todos)
    }
    
    @GetMapping("/{id}")
    fun getTodoById(@PathVariable id: Long): ResponseEntity<Todo> {
        val todo = todoService.getTodoById(id)
        return ResponseEntity.ok(todo)
    }
    
    @GetMapping("/completed")
    fun getCompletedTodos(): ResponseEntity<List<Todo>> {
        val todos = todoService.getCompletedTodos()
        return ResponseEntity.ok(todos)
    }
    
    @GetMapping("/pending")
    fun getPendingTodos(): ResponseEntity<List<Todo>> {
        val todos = todoService.getPendingTodos()
        return ResponseEntity.ok(todos)
    }
    
    @GetMapping("/search")
    fun searchTodos(@RequestParam query: String): ResponseEntity<List<Todo>> {
        val todos = todoService.searchTodos(query)
        return ResponseEntity.ok(todos)
    }
    
    @PostMapping
    fun createTodo(@Valid @RequestBody request: CreateTodoRequest): ResponseEntity<Todo> {
        val todo = todoService.createTodo(request.title, request.description)
        return ResponseEntity.status(HttpStatus.CREATED).body(todo)
    }
    
    @PutMapping("/{id}")
    fun updateTodo(
        @PathVariable id: Long,
        @Valid @RequestBody request: UpdateTodoRequest
    ): ResponseEntity<Todo> {
        val todo = todoService.updateTodo(id, request.title, request.description, request.isCompleted)
        return ResponseEntity.ok(todo)
    }
    
    @PatchMapping("/{id}/complete")
    fun markAsCompleted(@PathVariable id: Long): ResponseEntity<Todo> {
        val todo = todoService.markAsCompleted(id)
        return ResponseEntity.ok(todo)
    }
    
    @PatchMapping("/{id}/pending")
    fun markAsPending(@PathVariable id: Long): ResponseEntity<Todo> {
        val todo = todoService.markAsPending(id)
        return ResponseEntity.ok(todo)
    }
    
    @DeleteMapping("/{id}")
    fun deleteTodo(@PathVariable id: Long): ResponseEntity<Void> {
        todoService.deleteTodo(id)
        return ResponseEntity.noContent().build()
    }
}