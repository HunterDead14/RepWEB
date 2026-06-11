export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const {
    planId,
    cardNumber,
    expiry,
    cvc,
    fullName,
    address,
    agreed
  } = body

  if (!planId || !cardNumber || !expiry || !cvc || !fullName || !address || !agreed) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Заповни всі поля'
    })
  }

  return {
    success: true,
    message: 'Підписка створена успішно'
  }
})
