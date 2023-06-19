function validateSchema(email) {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (regex.test(email)) {
    return email;
  }
  throw new Error('Введен некорректный email');
}

module.exports = { validateSchema };
