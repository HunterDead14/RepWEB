<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Список постів (Nuxt UI)</h1>

    <UTable
      :data="posts"
      :columns="columns"
      :loading="pending"
    />

    <div class="flex justify-end mt-4 gap-1">
      <button
        v-for="p in totalPages"
        :key="p"
        @click="changePage(p)"
        :class="[
          'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
          page === p ? 'bg-primary-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
        ]"
      >
        {{ p }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'

const page = ref(1)
const posts = ref([])
const total = ref(0)
const perPage = ref(25)
const pending = ref(false)

const totalPages = computed(() => Math.ceil(total.value / perPage.value))

const columns = [
  { accessorKey: 'id', header: '#' },
  { accessorKey: 'user.name', header: 'Автор' },
  { accessorKey: 'category.title', header: 'Категорія' },
  {
    accessorKey: 'title',
    header: 'Заголовок',
    cell: ({ row }: { row: any }) => {
      return h('span', {
        onClick: () => navigateTo(`/Blog/${row.original.id}`),
        class: 'text-primary-500 hover:text-primary-400 hover:underline cursor-pointer font-medium transition-colors'
      }, row.original.title)
    }
  },
  { accessorKey: 'published_at', header: 'Дата публікації' }
]

const loadPosts = async () => {
  pending.value = true
  try {
    const response = await $fetch<any>(`http://127.0.0.1:8000/api/admin/blog/posts?page=${page.value}`)
    posts.value = response.data || []
    total.value = response.total || 0
    perPage.value = response.per_page || 25
  } finally {
    pending.value = false
  }
}

const changePage = async (newPage: number) => {
  page.value = newPage
  await loadPosts()
}

await loadPosts()
</script>
