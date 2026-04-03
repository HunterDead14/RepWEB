<script setup lang="ts">
useSeoMeta({ title: 'Список продуктів' })

const { data, pending } = await useFetch<{ products: any[] }>('/api/products')
const allProducts = computed(() => data.value?.products ?? [])

// Пошук
const globalFilter = ref('')

// Сортування
const sortKey = ref('')
const sortDir = ref<'asc' | 'desc'>('asc')

function sortBy(key: string) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
  currentPage.value = 1
}

function sortIcon(key: string) {
  if (sortKey.value !== key) return '↕'
  return sortDir.value === 'asc' ? '↑' : '↓'
}

// Фільтровані + відсортовані дані
const filteredProducts = computed(() => {
  let list = [...allProducts.value]

  if (globalFilter.value) {
    const q = globalFilter.value.toLowerCase()
    list = list.filter(p =>
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    )
  }

  if (sortKey.value) {
    list.sort((a, b) => {
      const valA = a[sortKey.value]
      const valB = b[sortKey.value]
      if (valA < valB) return sortDir.value === 'asc' ? -1 : 1
      if (valA > valB) return sortDir.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return list
})

// Пагінація
const pageSize = 10
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / pageSize))

const pagedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredProducts.value.slice(start, start + pageSize)
})
</script>

<template>
  <div class="bg-slate-100 min-h-screen p-6">

    <!-- Блоки з лаб 4 -->
    <div class="max-w-5xl mx-auto mb-10">
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Start Your 3 Day Free Trial</h2>
      <div class="flex items-center justify-end gap-2 mb-6">
        <span class="text-emerald-500 text-sm font-medium">Save up to 20%</span>
        <button class="px-3 py-1 bg-slate-800 text-white text-sm rounded">Annual</button>
        <button class="px-3 py-1 text-slate-600 text-sm rounded border border-slate-300">Monthly</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Starter -->
        <div class="bg-white rounded-2xl shadow-md p-8 relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />
          <h3 class="text-xl font-bold text-slate-800 mt-2 mb-3">Starter - Annual</h3>
          <div class="inline-block bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">3-days free then:</div>
          <div class="flex items-baseline gap-1 mb-1">
            <span class="text-3xl font-black text-slate-900">$83.25</span>
            <span class="text-slate-500 text-sm">/month</span>
          </div>
          <p class="text-slate-500 text-xs mb-2">billed yearly at <s>$1,188</s> $999</p>
          <div class="bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">$189 in savings</div>
          <button class="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2.5 rounded-xl mb-5">Try It Free</button>
          <ul class="space-y-2 text-sm text-slate-700">
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Primary user only <span class="text-slate-400 text-xs">(extra $35/month)</span></li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Save unlimited properties</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> 10,000 exports</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> 500 free skip traces</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Imports $0.01</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> FREE daily product trainings</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Full suite of next-gen investing tools</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Industry first AI powered comp tool</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Includes dedicated support agent</li>
          </ul>
        </div>

        <!-- Team -->
        <div class="bg-white rounded-2xl shadow-md p-8 relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />
          <h3 class="text-xl font-bold text-slate-800 mt-2 mb-3">Team - Annual</h3>
          <div class="inline-block bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">3-days free then:</div>
          <div class="flex items-baseline gap-1 mb-1">
            <span class="text-3xl font-black text-slate-900">$207.50</span>
            <span class="text-slate-500 text-sm">/month</span>
          </div>
          <p class="text-slate-500 text-xs mb-2">billed yearly at <s>$2,988</s> $2,490</p>
          <div class="bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">$498 in savings</div>
          <button class="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2.5 rounded-xl mb-5">Try It Free</button>
          <ul class="space-y-2 text-sm text-slate-700">
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Primary user + 2 free team members</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Save unlimited properties</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> 50,000 exports</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> 1,000 free skip traces</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Imports $0.01</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> FREE daily product trainings</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Full suite of next-gen investing tools</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Industry first AI powered comp tool</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Includes dedicated support agent</li>
          </ul>
        </div>

        <!-- Business -->
        <div class="bg-white rounded-2xl shadow-md p-8 relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />
          <h3 class="text-xl font-bold text-slate-800 mt-2 mb-3">Business - Annual</h3>
          <div class="inline-block bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">3-days free then:</div>
          <div class="flex items-baseline gap-1 mb-1">
            <span class="text-3xl font-black text-slate-900">$457.50</span>
            <span class="text-slate-500 text-sm">/month</span>
          </div>
          <p class="text-slate-500 text-xs mb-2">billed yearly at <s>$6,588</s> $5,490</p>
          <div class="bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">$1,098 in savings</div>
          <button class="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2.5 rounded-xl mb-5">Try It Free</button>
          <ul class="space-y-2 text-sm text-slate-700">
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Primary user + 6 free team members</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Save unlimited properties</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> 100,000 exports</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> 2,000 free skip traces</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Imports $0.01</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> FREE daily product trainings</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Full suite of next-gen investing tools</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Industry first AI powered comp tool</li>
            <li class="flex gap-2"><span class="text-emerald-500">✦</span> Includes dedicated support agent</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Таблиця продуктів -->
    <div class="max-w-7xl mx-auto">
      <div class="bg-white rounded-lg shadow overflow-hidden">

        <!-- Тулбар -->
        <div class="flex items-center justify-between px-4 py-2 border-b border-gray-200">
          <h2 class="text-base font-semibold text-gray-700">Список продуктів</h2>
          <input
            v-model="globalFilter"
            type="text"
            placeholder="Пошук..."
            class="border border-gray-300 rounded px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <!-- Таблиця -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
            <tr class="bg-gray-800 text-white text-left">
              <th class="px-3 py-3 font-semibold">Фото</th>
              <th class="px-3 py-3 font-semibold cursor-pointer hover:bg-gray-700 select-none" @click="sortBy('title')">
                Назва {{ sortIcon('title') }}
              </th>
              <th class="px-3 py-3 font-semibold">Опис</th>
              <th class="px-3 py-3 font-semibold cursor-pointer hover:bg-gray-700 select-none" @click="sortBy('price')">
                Ціна {{ sortIcon('price') }}
              </th>
              <th class="px-3 py-3 font-semibold cursor-pointer hover:bg-gray-700 select-none" @click="sortBy('rating')">
                Оцінка {{ sortIcon('rating') }}
              </th>
              <th class="px-3 py-3 font-semibold cursor-pointer hover:bg-gray-700 select-none" @click="sortBy('brand')">
                Бренд {{ sortIcon('brand') }}
              </th>
              <th class="px-3 py-3 font-semibold cursor-pointer hover:bg-gray-700 select-none" @click="sortBy('category')">
                Категорія {{ sortIcon('category') }}
              </th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
            <tr v-if="pending">
              <td colspan="7" class="px-3 py-8 text-center text-gray-400">Завантаження...</td>
            </tr>
            <tr
              v-for="product in pagedProducts"
              :key="product.id"
              class="hover:bg-gray-50"
            >
              <td class="px-3 py-3">
                <img
                  :src="product.thumbnail"
                  :alt="product.title"
                  class="w-[100px] h-[100px] object-cover rounded"
                />
              </td>
              <td class="px-3 py-3 font-semibold text-gray-800">{{ product.title }}</td>
              <td class="px-3 py-3 text-gray-500 max-w-xs truncate">{{ product.description }}</td>
              <td class="px-3 py-3 text-gray-700">${{ product.price }}</td>
              <td class="px-3 py-3">
                  <span :class="product.rating < 4.5 ? 'text-red-500 font-semibold' : 'text-green-500 font-semibold'">
                    {{ product.rating }}
                  </span>
              </td>
              <td class="px-3 py-3 text-gray-600">{{ product.brand }}</td>
              <td class="px-3 py-3 text-gray-600">{{ product.category }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- Пагінація -->
        <div class="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <span class="text-sm text-gray-500">
            Сторінка {{ currentPage }} з {{ totalPages }}
          </span>
          <div class="flex gap-2">
            <button
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40"
              @click="currentPage--"
            >
              ← Назад
            </button>
            <button
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40"
              @click="currentPage++"
            >
              Вперед →
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
