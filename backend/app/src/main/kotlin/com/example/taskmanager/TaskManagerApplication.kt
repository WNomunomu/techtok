package com.example.taskmanager

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TaskManagerApplication

fun main(args: Array<String>) {
  runApplication<TaskManagerApplication>(*args)
}
