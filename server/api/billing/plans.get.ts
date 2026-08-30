import Stripe from 'stripe'

export default defineCachedEventHandler(async () => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecretKey)

  // Fetch all active prices and expand the associated product data
  const { data: prices } = await stripe.prices.list({
    active: true,
    expand: ['data.product'],
  })

  // Format the data cleanly for the frontend
  const formattedPlans = prices.map((price) => {
    const product = price.product as Stripe.Product
    
    return {
      priceId: price.id,
      name: product.name,
      description: product.description,
      // Convert cents to formatted dollars (e.g., 2900 -> $29.00)
      priceFormatted: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
      }).format((price.unit_amount || 0) / 100),
      interval: price.recurring?.interval, // 'month' or 'year'
      
      // Extract the metadata we set in the Stripe Dashboard
      tier: product.metadata.tier || 'basic',
      features: product.metadata.features ? product.metadata.features.split(',') : [],
      highlighted: product.metadata.highlighted === 'true',
      order: parseInt(product.metadata.order || '1', 10),
    }
  })

  // Sort plans by the 'order' metadata so Basic -> Essential -> Pro
  return formattedPlans.sort((a, b) => a.order - b.order)

}, {
  maxAge: 60 * 1, // Cache for 1 hour
  name: 'stripe-plans-cache',
})