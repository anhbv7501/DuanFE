// eslint-disable-next-line no-useless-escape

const REG_EMAIL = /\@+/
const REG_PRICE = /[0-9]$/
function validateName(name) {
  if (!name) return false
  else return true
}
function validateEmail(Email) {
  if (!Email) return false
  return REG_EMAIL.test(Email)
}
function validatePass(pass) {
  if (!pass) return false
  else return true
}
function validateConfirm(confirm, pass) {
  if (!pass) return false
  if (confirm != pass) return false
  else return true
}
function validateDe(description) {
  if (!description) return false
  else return true
}
function validatePrice(Price) {
  if (!Price) return false
  return REG_PRICE.test(Price)
}
export { validateName, validateDe, validatePrice, validatePass, validateEmail, validateConfirm }
