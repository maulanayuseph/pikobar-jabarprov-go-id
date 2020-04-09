import numbro from 'numbro'

// define a language
numbro.registerLanguage({
  languageTag: 'id-ID',
  // languageName: 'bahasa',
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'rb',
    million: 'jt',
    billion: 'm',
    trillion: 't'
  },
  ordinal: (number) => {
    return number
  },
  currency: {
    symbol: 'Rp',
    position: 'prefix',
    code: 'IDR'
  },
  currencyFormat: {
    thousandSeparated: true,
    totalLength: 4,
    spaceSeparated: true,
    average: true
  },
  formats: {
    fourDigits: {
      totalLength: 4,
      spaceSeparated: true,
      average: true
    },
    fullWithTwoDecimals: {
      output: 'currency',
      mantissa: 2,
      spaceSeparated: true,
      thousandSeparated: true
    },
    fullWithTwoDecimalsNoCurrency: {
      mantissa: 2,
      thousandSeparated: true
    },
    fullWithNoDecimals: {
      output: 'currency',
      spaceSeparated: true,
      thousandSeparated: true,
      mantissa: 0
    }
  }
})

numbro.setLanguage('id-ID')
