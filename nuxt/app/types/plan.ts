export type BillingType = 'monthly' | 'annual'

export interface PlanFeature {
  title: string
  subtitle?: string
}

export interface Plan {
  id: number
  title: string
  billing: BillingType
  price?: number
  displayPrice: string
  period: string
  billed: string
  oldPrice?: string
  badge: string
  savings?: string | null
  features: PlanFeature[]
}
