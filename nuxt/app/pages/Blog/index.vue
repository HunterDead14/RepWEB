<script setup lang="ts">
</script>
<template>
  <div class="container mx-auto p-4 flex justify-center mt-20">
    <div class="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl text-center">
      <h1 class="text-3xl font-bold text-white mb-8">Адмін Панель</h1>

      <div class="flex flex-col gap-4">
        <UButton to="/Blog/BlogPostsUi" color="primary" size="xl" block>
          Управління постами
        </UButton>

        <UButton to="/Blog/BlogCategoriesUi" color="primary" size="xl" block>
          Управління категоріями
        </UButton>
      </div>
    </div>
  </div>
</template>
