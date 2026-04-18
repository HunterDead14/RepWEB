import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Plan } from '~/types/plan'

export const useSubscriptionStore = defineStore('subscription', () => {
  const selectedPlan = ref<Plan | null>(null)

  const hasSelectedPlan = computed(() => selectedPlan.value !== null)

  function setPlan(plan: Plan) {
    selectedPlan.value = plan
  }

  function clearPlan() {
    selectedPlan.value = null
  }

  return {
    selectedPlan,
    hasSelectedPlan,
    setPlan,
    clearPlan
  }
})
