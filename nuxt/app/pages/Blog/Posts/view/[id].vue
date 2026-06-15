<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <UCard v-if="post">
      <template #header>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ post.title }}</h1>
        <div class="flex gap-4 text-gray-500 text-sm mt-2">
          <span v-if="post.category">Категорія {{ post.category.title }}</span>
          <span v-if="post.user">Автор {{ post.user.name }}</span>
          <span>Дата {{ post.date_published || 'Не опубліковано' }}</span>
        </div>
      </template>

      <div class="prose dark:prose-invert max-w-none py-4 whitespace-pre-wrap">
        {{ post.content_raw || 'Текст відсутній...' }}
      </div>

      <template #footer>
        <div class="flex justify-between items-center">
          <UBadge :color="post.is_published ? 'success' : 'gray'">
            {{ post.is_published ? 'Опубліковано' : 'Чернетка' }}
          </UBadge>
          <UButton to="/Blog/BlogPostsUi" color="gray" variant="ghost" icon="i-heroicons-arrow-left">
            Назад до списку
          </UButton>
        </div>
      </template>
    </UCard>

    <!-- Скелетон, поки дані вантажаться -->
    <div v-else class="space-y-4">
      <USkeleton class="h-12 w-3/4" />
      <USkeleton class="h-4 w-1/2" />
      <USkeleton class="h-64 w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const postId = route.params.id
const post = ref(null)

const { data } = await useFetch<any>(`http://127.0.0.1:8000/api/admin/blog/posts/${postId}`)

if (data.value?.data) {
  post.value = data.value.data
}
</script>
