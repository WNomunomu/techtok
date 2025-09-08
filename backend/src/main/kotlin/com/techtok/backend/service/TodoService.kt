package com.techtok.backend.service

import com.techtok.backend.entity.Todo
import com.techtok.backend.repository.TodoRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
@Transactional
class TodoService(
    private val todoRepository: TodoRepository
) {
    
    fun getAllTodos(): List<Todo> {
        return todoRepository.findAll()
    }
    
    fun getTodoById(id: Long): Todo {
        return todoRepository.findById(id)
            .orElseThrow { IllegalArgumentException("Todo not found with id: $id") }
    }
    
    fun getCompletedTodos(): List<Todo> {
        return todoRepository.findByIsCompleted(true)
    }
    
    fun getPendingTodos(): List<Todo> {
        return todoRepository.findByIsCompleted(false)
    }
    
    fun searchTodos(searchTerm: String): List<Todo> {
        return todoRepository.findByTitleContainingIgnoreCase(searchTerm)
    }
    
    fun createTodo(title: String, description: String? = null): Todo {
        val todo = Todo(
            title = title,
            description = description
        )
        return todoRepository.save(todo)
    }
    
    fun updateTodo(id: Long, title: String? = null, description: String? = null, isCompleted: Boolean? = null): Todo {
        val todo = getTodoById(id)
        
        val updatedTodo = todo.copy(
            title = title ?: todo.title,
            description = description ?: todo.description,
            isCompleted = isCompleted ?: todo.isCompleted,
            updatedAt = LocalDateTime.now()
        )
        
        return todoRepository.save(updatedTodo)
    }
    
    fun markAsCompleted(id: Long): Todo {
        return updateTodo(id, isCompleted = true)
    }
    
    fun markAsPending(id: Long): Todo {
        return updateTodo(id, isCompleted = false)
    }
    
    fun deleteTodo(id: Long) {
        if (!todoRepository.existsById(id)) {
            throw IllegalArgumentException("Todo not found with id: $id")
        }
        todoRepository.deleteById(id)
    }
}