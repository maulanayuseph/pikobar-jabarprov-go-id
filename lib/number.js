import numbro from 'numbro'

export function formatNumber (number, format = {}) {
  if (typeof number !== 'number' || Number.isNaN(parseFloat(number))) {
    return ''
  }
  return numbro(number).format({
    thousandSeparated: true,
    ...format
  })
}
