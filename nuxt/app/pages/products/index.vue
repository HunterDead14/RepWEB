<script setup lang="ts">
import type { Plan, BillingType } from '~/app/types/plan'
import type { Product } from '~/app/types/product'

useSeoMeta({
  title: 'Список продуктів',
  description: 'Products and pricing plans'
})
const subscriptionStore = useSubscriptionStore()

const billing = ref<BillingType>('annual')

const { data: plansData } = await useFetch<Plan[]>('/api/plans')
const { data: products, pending, error } = await useFetch<Product[]>('/api/products')

const plans = computed(() => {
  return (plansData.value || []).filter(p => p.billing === billing.value)
})

function openSubscription(plan: Plan) {
  subscriptionStore.setPlan(plan)
  navigateTo('/subscription')
}

const globalFilter = ref('')
const pageSize = ref(10)
const page = ref(1)

type SortKey = keyof Product
const sortKey = ref<SortKey>('title')
const sortAsc = ref(true)

const columns = [
  { key: 'thumbnail', label: 'Фото', sortable: false },
  { key: 'title', label: 'Назва', sortable: true },
  { key: 'description', label: 'Опис', sortable: false },
  { key: 'price', label: 'Ціна', sortable: true },
  { key: 'rating', label: 'Оцінка', sortable: true },
  { key: 'brand', label: 'Бренд', sortable: true },
  { key: 'category', label: 'Категорія', sortable: true },
]

const filteredSorted = computed(() => {
  const q = globalFilter.value.toLowerCase()

  let rows = (products.value ?? []).filter(p =>
    [p.title, p.description, p.brand, p.category].some(v => v?.toLowerCase().includes(q))
  )

  rows = [...rows].sort((a, b) => {
    const av = a[sortKey.value]
    const bv = b[sortKey.value]

    const cmp = typeof av === 'number' && typeof bv === 'number'
      ? av - bv
      : String(av).localeCompare(String(bv))

    return sortAsc.value ? cmp : -cmp
  })

  return rows
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredSorted.value.length / pageSize.value)))

watch([globalFilter, sortKey, sortAsc, pageSize], () => {
  page.value = 1
})

const pageRows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredSorted.value.slice(start, start + pageSize.value)
})

function toggleSort(key: SortKey) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
}

function sortIcon(key: SortKey) {
  if (sortKey.value !== key) return '↕'
  return sortAsc.value ? '↑' : '↓'
}

const badgeClass = [
  'bg-gray-100 text-gray-500',
  'bg-green-50 text-green-600',
  'bg-amber-50 text-amber-600'
]

const accentClass = [
  'from-green-400 to-cyan-400',
  'from-green-400 to-cyan-400',
  'from-green-400 to-cyan-400'
]

const starColor = ['#9BE564', '#9BE564', '#9BE564']
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f5] font-sans">
    <main class="max-w-6xl mx-auto px-6 py-8 space-y-10">
      <section>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 class="text-3xl font-bold text-gray-800">
            Start Your 3 Day Free Trial
          </h1>

          <div class="flex items-center gap-3 self-start md:self-auto">
            <span class="text-sm text-green-500 font-medium">Save up to 20%</span>

            <div class="bg-gray-100 p-1 rounded-lg flex">
              <button
                :class="billing === 'annual' ? 'bg-white shadow text-gray-900' : 'text-gray-500'"
                class="px-4 py-1.5 text-sm rounded-md"
                @click="billing = 'annual'"
              >
                Annual
              </button>

              <button
                :class="billing === 'monthly' ? 'bg-white shadow text-gray-900' : 'text-gray-500'"
                class="px-4 py-1.5 text-sm rounded-md"
                @click="billing = 'monthly'"
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-4">
          <div
            v-for="(plan, i) in plans"
            :key="plan.id"
            class="relative bg-white rounded-2xl p-6 w-[290px] border border-gray-200 shadow-sm overflow-hidden"
          >
            <div
              class="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r"
              :class="accentClass[i]"
            />

            <h2 class="text-[20px] font-bold text-gray-800 mb-4">
              {{ plan.title }} - {{ plan.billing === 'annual' ? 'Annual' : 'Monthly' }}
            </h2>

            <span
              class="inline-block text-xs font-medium px-2.5 py-1 rounded-md mb-3"
              :class="badgeClass[i]"
            >
              {{ plan.badge }}
            </span>

            <div class="flex items-baseline mb-2">
              <span class="font-mono text-4xl font-bold text-gray-900 leading-none">
                {{ plan.displayPrice }}
              </span>
              <span class="text-sm text-gray-400 ml-1">{{ plan.period }}</span>
            </div>

            <p class="text-sm text-gray-500 mt-1">
              billed yearly at
              <span v-if="plan.oldPrice" class="line-through opacity-60 mr-1">{{ plan.oldPrice }}</span>
              <strong class="text-gray-900 font-semibold">{{ plan.billed }}</strong>
            </p>

            <p v-if="plan.savings" class="inline-block bg-green-50 text-green-600 text-sm mt-3 px-2 py-1 rounded-md font-medium">
              {{ plan.savings }}
            </p>

            <button
              class="mt-4 w-full py-2.5 rounded-md bg-orange-400 hover:bg-orange-500 text-black font-semibold text-sm transition"
              @click="openSubscription(plan)"            >
              Try It Free
            </button>

            <hr class="border-gray-100 my-5" />

            <ul class="flex flex-col gap-2.5">
              <li
                v-for="feat in plan.features"
                :key="feat.title"
                class="flex items-start gap-2.5"
              >
                <span class="mt-1 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1C8 4.866 11.134 8 15 8C11.134 8 8 11.134 8 15C8 11.134 4.866 8 1 8C4.866 8 8 4.866 8 1Z"
                      :fill="starColor[i]"
                    />
                  </svg>
                </span>

                <div>
                  <div class="text-sm text-gray-900 font-medium leading-snug">
                    {{ feat.title }}
                  </div>
                  <div
                    v-if="feat.subtitle"
                    class="text-xs text-gray-400 leading-snug"
                  >
                    {{ feat.subtitle }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
          Продукти
        </h2>

        <div class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
          <div class="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-gray-100">
            <div class="relative">
              <svg
                class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                v-model="globalFilter"
                type="text"
                placeholder="Пошук продуктів…"
                class="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
              />
            </div>

            <div class="flex items-center gap-2 text-sm text-gray-500">
              <span>Рядків:</span>
              <select
                v-model="pageSize"
                class="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
              </select>
              <span class="text-gray-400">з {{ filteredSorted.length }}</span>
            </div>
          </div>

          <div v-if="pending" class="flex items-center justify-center py-20 gap-3 text-gray-400">
            <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Завантаження…
          </div>

          <div v-else-if="error" class="py-20 text-center text-red-500 text-sm">
            Помилка: {{ error.message }}
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-gray-800 text-white text-xs uppercase tracking-wider">
              <tr>
                <th
                  v-for="col in columns"
                  :key="col.key"
                  class="px-4 py-3 whitespace-nowrap"
                  :class="col.sortable ? 'cursor-pointer select-none hover:bg-gray-700 transition-colors' : ''"
                  @click="col.sortable ? toggleSort(col.key as SortKey) : null"
                >
                    <span class="flex items-center gap-1">
                      {{ col.label }}
                      <span v-if="col.sortable" class="text-gray-400 text-xs">
                        {{ sortIcon(col.key as SortKey) }}
                      </span>
                    </span>
                </th>
              </tr>
              </thead>

              <tbody class="divide-y divide-gray-50">
              <tr
                v-for="p in pageRows"
                :key="p.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-4 py-3">
                  <img
                    :src="p.thumbnail"
                    :alt="p.title"
                    class="w-[90px] h-[90px] object-cover rounded-xl shadow-sm"
                  />
                </td>

                <td class="px-4 py-3 font-semibold text-gray-900 max-w-[140px]">
                  <p class="truncate">{{ p.title }}</p>
                </td>

                <td class="px-4 py-3 text-gray-500 max-w-[220px]">
                  <p class="line-clamp-3 text-xs leading-relaxed">{{ p.description }}</p>
                </td>

                <td class="px-4 py-3 font-mono font-bold text-gray-900 whitespace-nowrap">
                  ${{ p.price.toFixed(2) }}
                </td>

                <td class="px-4 py-3 whitespace-nowrap">
                    <span
                      class="inline-flex items-center gap-1 font-bold text-sm px-2.5 py-1 rounded-full"
                      :class="p.rating >= 4.5 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'"
                    >
                      <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {{ p.rating }}
                    </span>
                </td>

                <td class="px-4 py-3 text-gray-700">{{ p.brand }}</td>

                <td class="px-4 py-3">
                    <span class="inline-block bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full capitalize">
                      {{ p.category }}
                    </span>
                </td>
              </tr>

              <tr v-if="pageRows.length === 0">
                <td colspan="7" class="py-16 text-center text-gray-400">Нічого не знайдено</td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-sm text-gray-500">
            <span>
              Сторінка <strong class="text-gray-900">{{ page }}</strong> з
              <strong class="text-gray-900">{{ totalPages }}</strong>
            </span>

            <div class="flex items-center gap-1">
              <button @click="page = 1" :disabled="page === 1" class="px-2 py-1 rounded-lg hover:bg-gray-100 disabled:opacity-30">«</button>
              <button @click="page--" :disabled="page === 1" class="px-3 py-1 rounded-lg hover:bg-gray-100 disabled:opacity-30">‹</button>

              <template v-for="pg in totalPages" :key="pg">
                <button
                  v-if="Math.abs(pg - page) <= 2 || pg === 1 || pg === totalPages"
                  @click="page = pg"
                  class="w-8 h-8 rounded-lg text-sm font-medium"
                  :class="pg === page ? 'bg-green-500 text-white' : 'hover:bg-gray-100 text-gray-600'"
                >
                  {{ pg }}
                </button>
                <span v-else-if="Math.abs(pg - page) === 3" class="px-1 text-gray-300">…</span>
              </template>

              <button @click="page++" :disabled="page === totalPages" class="px-3 py-1 rounded-lg hover:bg-gray-100 disabled:opacity-30">›</button>
              <button @click="page = totalPages" :disabled="page === totalPages" class="px-2 py-1 rounded-lg hover:bg-gray-100 disabled:opacity-30">»</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
