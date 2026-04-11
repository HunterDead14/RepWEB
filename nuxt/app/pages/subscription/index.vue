<script setup lang="ts">
import type { Plan } from '~/app/types/plan'

useSeoMeta({
  title: 'Checkout',
  description: 'Subscription checkout page'
})

const route = useRoute()
const router = useRouter()

const planId = Number(route.query.planId)

const { data: plansData } = await useFetch<Plan[]>('/api/plans')

const selectedPlan = computed(() =>
  (plansData.value || []).find(plan => plan.id === planId)
)

const form = reactive({
  cardNumber: '',
  expiry: '',
  cvc: '',
  fullName: '',
  address: '',
  agreed: false
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

async function submitForm() {
  successMessage.value = ''
  errorMessage.value = ''

  if (!selectedPlan.value) {
    errorMessage.value = 'План не знайдено'
    return
  }

  try {
    loading.value = true

    const response = await $fetch<{ success: boolean; message: string }>('/api/subscription/create', {
      method: 'POST',
      body: {
        planId: selectedPlan.value.id,
        ...form
      }
    })

    successMessage.value = response.message

    form.cardNumber = ''
    form.expiry = ''
    form.cvc = ''
    form.fullName = ''
    form.address = ''
    form.agreed = false
  } catch (error: any) {
    errorMessage.value =
      error?.data?.statusMessage ||
      error?.statusMessage ||
      'Сталася помилка при відправці форми'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f5] px-4 py-6">
    <div class="max-w-5xl mx-auto">
      <div class="bg-gray-800 text-white text-center py-3 text-xl font-semibold mb-8">
        Checkout
      </div>

      <button
        class="text-gray-500 text-sm mb-4 hover:text-gray-700"
        @click="router.back()"
      >
        &lt;&lt; back
      </button>

      <h1 class="text-3xl font-bold text-gray-800 mb-2">
        You’re Almost In - Start Your 3-Day Free Trial Now!
      </h1>

      <p class="text-gray-600 text-base mb-8">
        Set up your account to gain instant access! You won’t be charged if you decide to cancel within 3 days
      </p>

      <div v-if="selectedPlan" class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div class="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 max-w-sm">
          <div class="h-1 rounded-t-xl bg-gradient-to-r from-green-400 to-cyan-400 -mt-6 -mx-6 mb-6"></div>

          <h2 class="text-2xl font-bold text-gray-800 mb-3">
            {{ selectedPlan.title }} - {{ selectedPlan.billing === 'annual' ? 'Annual' : 'Monthly' }}
          </h2>

          <div class="inline-block bg-gray-100 text-gray-500 text-sm px-3 py-1 rounded mb-3">
            {{ selectedPlan.badge }}
          </div>

          <div class="flex items-end gap-2 mb-2">
            <span class="text-4xl font-bold text-gray-900">{{ selectedPlan.displayPrice }}</span>
            <span class="text-gray-500 text-lg">{{ selectedPlan.period }}</span>
          </div>

          <p class="text-gray-500 mb-2">
            billed at
            <span v-if="selectedPlan.oldPrice" class="line-through mr-1">{{ selectedPlan.oldPrice }}</span>
            <span class="font-semibold text-gray-800">{{ selectedPlan.billed }}</span>
          </p>

          <p v-if="selectedPlan.savings" class="inline-block bg-green-50 text-green-600 font-semibold px-2 py-1 rounded-md mb-5">
            {{ selectedPlan.savings }}
          </p>

          <hr class="mb-5 border-gray-200">

          <ul class="space-y-3">
            <li
              v-for="feature in selectedPlan.features"
              :key="feature.title"
              class="flex gap-3"
            >
              <span class="text-green-500 mt-1">✦</span>
              <div>
                <p class="font-medium text-gray-800 text-sm leading-snug">{{ feature.title }}</p>
                <p v-if="feature.subtitle" class="text-xs text-gray-500 leading-snug">{{ feature.subtitle }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-5">Order Summary</h2>

          <div class="space-y-4 border-b border-gray-200 pb-6 mb-6">
            <div class="flex justify-between text-gray-700">
              <span>
                {{ selectedPlan.title }} {{ selectedPlan.billing === 'annual' ? 'Annual Plan' : 'Monthly Plan' }}
              </span>
              <span class="font-medium">{{ selectedPlan.billed }}</span>
            </div>

            <div class="flex justify-between text-gray-700">
              <span>Total Due</span>
              <span class="font-medium">{{ selectedPlan.billed }}</span>
            </div>

            <div class="flex justify-between font-bold text-lg text-gray-800">
              <span>Due Today</span>
              <span>$0.00</span>
            </div>
          </div>

          <div class="bg-gray-100 text-center py-4 rounded mb-8 font-medium text-gray-700">
            Includes 3-Day Free Trial
          </div>

          <form class="space-y-5" @submit.prevent="submitForm">
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-3">Billing Information</h3>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
              <div class="grid grid-cols-3 gap-3">
                <input
                  v-model="form.cardNumber"
                  type="text"
                  placeholder="Number"
                  class="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
                />
                <input
                  v-model="form.expiry"
                  type="text"
                  placeholder="MM/YY"
                  class="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
                />
                <input
                  v-model="form.cvc"
                  type="text"
                  placeholder="CVC"
                  class="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <div class="space-y-3">
                <input
                  v-model="form.fullName"
                  type="text"
                  placeholder="Full name"
                  class="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
                />
                <input
                  v-model="form.address"
                  type="text"
                  placeholder="Address"
                  class="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
                />
              </div>
            </div>

            <label class="flex items-start gap-3 text-sm text-gray-700">
              <input
                v-model="form.agreed"
                type="checkbox"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-800"
              />
              <span class="leading-relaxed">
      I consent to Terms of Use and understand my 3-day free trial will automatically convert to
      {{ selectedPlan.billed }} per {{ selectedPlan.billing === 'annual' ? 'year' : 'month' }} unless I cancel.
    </span>
            </label>

            <div v-if="successMessage" class="text-green-600 font-medium">
              {{ successMessage }}
            </div>

            <div v-if="errorMessage" class="text-red-500 font-medium">
              {{ errorMessage }}
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2.5 rounded-md transition disabled:opacity-50"
            >
              {{ loading ? 'Submitting...' : 'Try It Free' }}
            </button>
          </form>
        </div>
      </div>

      <div v-else class="text-red-500 text-lg font-medium">
        План не знайдено. Повернись назад і вибери тариф.
      </div>
    </div>
  </div>
</template>
