type BillingType = 'annual' | 'monthly'

interface PlanFeature {
  title: string
  subtitle?: string
}

interface Plan {
  id: number
  title: string
  billing: BillingType
  displayPrice: string
  period: string
  billed: string
  oldPrice?: string
  badge: string
  savings?: string | null
  features: PlanFeature[]
}

export default defineEventHandler((): Plan[] => {
  return [
    // MONTHLY
    {
      id: 1,
      title: 'Starter',
      billing: 'monthly',
      displayPrice: '$99',
      period: '/month',
      billed: '$1,188',
      badge: '3-days free then:',
      savings: null,
      features: [
        { title: 'Primary user only', subtitle: 'extra team members for $35/month' },
        { title: 'Save unlimited properties' },
        { title: '10,000 exports', subtitle: 'additional exports at $0.02 each' },
        { title: '500 free skip traces', subtitle: 'additional skip tracing at $0.08 each' },
        { title: 'Imports $0.01' }
      ]
    },
    {
      id: 2,
      title: 'Team',
      billing: 'monthly',
      displayPrice: '$249',
      period: '/month',
      billed: '$2,988',
      badge: '3-days free then:',
      savings: null,
      features: [
        { title: 'Primary user + 2 team members', subtitle: 'extra team members for $25/month' },
        { title: 'Save unlimited properties' },
        { title: '50,000 exports', subtitle: 'additional exports at $0.01 each' },
        { title: '1,000 free skip traces', subtitle: 'additional skip tracing at $0.08 each' },
        { title: 'Imports $0.01' }
      ]
    },
    {
      id: 3,
      title: 'Business',
      billing: 'monthly',
      displayPrice: '$549',
      period: '/month',
      billed: '$6,588',
      badge: '3-days free then:',
      savings: null,
      features: [
        { title: 'Primary user + 6 team members', subtitle: 'extra team members for $20/month' },
        { title: 'Save unlimited properties' },
        { title: '100,000 exports', subtitle: 'additional exports at $0.01 each' },
        { title: '2,000 free skip traces', subtitle: 'additional skip tracing at $0.08 each' },
        { title: 'Imports $0.01' }
      ]
    },
    // ANNUAL
    {
      id: 4,
      title: 'Starter',
      billing: 'annual',
      displayPrice: '$83.25',
      period: '/month',
      billed: '$999',
      oldPrice: '$1,188',
      badge: '3-days free then:',
      savings: '$189 in savings',
      features: [
        { title: 'Primary user only', subtitle: 'extra team members for $35/month' },
        { title: 'Save unlimited properties' },
        { title: '10,000 exports', subtitle: 'additional exports at $0.02 each' },
        { title: '500 free skip traces', subtitle: 'additional skip tracing at $0.08 each' },
        { title: 'Imports $0.01' }
      ]
    },
    {
      id: 5,
      title: 'Team',
      billing: 'annual',
      displayPrice: '$207.50',
      period: '/month',
      billed: '$2,490',
      oldPrice: '$2,988',
      badge: '3-days free then:',
      savings: '$498 in savings',
      features: [
        { title: 'Primary user + 2 team members', subtitle: 'extra team members for $25/month' },
        { title: 'Save unlimited properties' },
        { title: '50,000 exports', subtitle: 'additional exports at $0.01 each' },
        { title: '1,000 free skip traces', subtitle: 'additional skip tracing at $0.08 each' },
        { title: 'Imports $0.01' }
      ]
    },
    {
      id: 6,
      title: 'Business',
      billing: 'annual',
      displayPrice: '$457.50',
      period: '/month',
      billed: '$5,490',
      oldPrice: '$6,588',
      badge: '3-days free then:',
      savings: '$1,098 in savings',
      features: [
        { title: 'Primary user + 6 team members', subtitle: 'extra team members for $20/month' },
        { title: 'Save unlimited properties' },
        { title: '100,000 exports', subtitle: 'additional exports at $0.01 each' },
        { title: '2,000 free skip traces', subtitle: 'additional skip tracing at $0.08 each' },
        { title: 'Imports $0.01' }
      ]
    }
  ]
})
