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

export function formatNumberPlusMinus (number, format = {}) {
  if (typeof number !== 'number' || Number.isNaN(parseFloat(number))) {
    return '+0'
  }
  if (number >= 0) {
    return '+' + numbro(number).format({
      thousandSeparated: true,
      ...format
    })
  } else if (number < 0) {
    return numbro(number).format({
      thousandSeparated: true,
      ...format
    })
  } else {
    return '+0'
  }
}

export function formatNumberOnlyPlus (number, format = {}) {
  if (typeof number !== 'number' || Number.isNaN(parseFloat(number))) {
    return ''
  }
  if (number >= 0) {
    return '+' + numbro(number).format({
      thousandSeparated: true,
      ...format
    })
  } else {
    return '+0'
  }
}
