package com.techtok.backend.repository

import com.techtok.backend.entity.Todo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TodoRepository : JpaRepository<Todo, Long> {
    fun findByIsCompleted(isCompleted: Boolean): List<Todo>
    fun findByTitleContainingIgnoreCase(title: String): List<Todo>
}