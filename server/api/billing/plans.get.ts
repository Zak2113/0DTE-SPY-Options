// server/api/billing/plans.get.ts
import Stripe from 'stripe'

export default defineCachedEventHandler(async () => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecretKey)

  // Fetch all active prices and expand the product data
  const { data: prices } = await stripe.prices.list({
    active: true,
    expand: ['data.product'],
  })

  const formattedPlans = prices.map((price) => {
    const product = price.product as Stripe.Product
    
    return {
      priceId: price.id,
      name: product.name,
      description: product.description,
      priceFormatted: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
      }).format((price.unit_amount || 0) / 100),
      interval: price.recurring?.interval, 
      
      tier: product.metadata.tier || 'basic',
      features: product.metadata.features ? product.metadata.features.split(',') : [],
      highlighted: product.metadata.highlighted === 'true',
      
      // Parse your 'order' metadata string into a number (defaults to 99 so missing ones go to the end)
      order: parseInt(product.metadata.order || '99', 10),
    }
  })

  // Sort explicitly by the order metadata you defined in Stripe
  return formattedPlans.sort((a, b) => a.order - b.order)

}, {
  maxAge: 60 * 1, // Cache for 1 hour
  name: 'stripe-plans-cache',
})