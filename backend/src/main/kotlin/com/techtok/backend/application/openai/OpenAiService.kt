package com.techtok.backend.application.openai

import com.fasterxml.jackson.annotation.JsonProperty
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.bodyToMono

@Service
class OpenAiService(
    private val webClient: WebClient,
) {
    private val logger = LoggerFactory.getLogger(OpenAiService::class.java)

    @Value("\${openai.api.key}")
    private lateinit var apiKey: String

    companion object {
        private const val OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"
    }

    fun generateSummary(renderedBody: String): String {
        try {
            logger.info("API Key loaded: ${if (apiKey.isNotEmpty()) "Yes (${apiKey.length} chars)" else "No - empty or null"}")
            val first100Words = extractFirst100Words(renderedBody)

            val requestBody =
                OpenAiRequest(
                    model = "gpt-4.1-nano",
                    messages =
                        listOf(
                            OpenAiMessage(
                                role = "user",
                                content =
                                    "Please provide a concise summary of this blog post content in 2-3 sentences: $first100Words." +
                                        "In your response, always use the language that the blog is written in. Also, you are writing for" +
                                        "a blog summarization website, so no need to start your response with 'this blog is' or something similar",
                            ),
                        ),
                    maxTokens = 150,
                    temperature = 0.7,
                )

            val response =
                webClient
                    .post()
                    .uri(OPENAI_API_URL)
                    .header("Authorization", "Bearer $apiKey")
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono<OpenAiResponse>()
                    .block()

            return response
                ?.choices
                ?.firstOrNull()
                ?.message
                ?.content
                ?.trim()
                ?: "Unable to generate summary"
        } catch (e: Exception) {
            logger.error("Error generating summary with OpenAI", e)
            return "Summary generation failed"
        }
    }

    private fun extractFirst100Words(text: String): String {
        // Remove HTML tags and extract plain text
        val plainText =
            text
                .replace(Regex("<[^>]*>"), " ")
                .replace(Regex("\\s+"), " ")
                .trim()

        val words = plainText.split(" ")
        return words.take(100).joinToString(" ")
    }
}

data class OpenAiRequest(
    val model: String,
    val messages: List<OpenAiMessage>,
    @JsonProperty("max_tokens") val maxTokens: Int,
    val temperature: Double,
)

data class OpenAiMessage(
    val role: String,
    val content: String,
)

data class OpenAiResponse(
    val choices: List<OpenAiChoice>,
)

data class OpenAiChoice(
    val message: OpenAiMessage,
)
