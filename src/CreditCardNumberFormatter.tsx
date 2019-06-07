// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import React from 'react'
import {
  CAMEX,
  CVISA,
  CMASTER,
  FOUR_4_4_4_STRIPPED,
  FOUR_4_6_5_STRIPPED,
  UNKNOWN_STRIPPED,
  FOUR_4_4_4_CAPTURE,
  FOUR_4_6_5_CAPTURE,
  OTHER_CVV,
  UNKNOWN_CVV,
  AMEX_CVV,
  MM,
  YY,
  MM_VALID,
  YY_VALID,
  OTHER_CVV_VALID,
  AMEX_CVV_VALID,
  FOUR_4_4_4_STRIPPED_VALID,
  FOUR_4_6_5_STRIPPED_VALID
} from './regexs'

export type BrandType = 'visa' | 'amex' | 'mastercard'

function getBrandFor(number: string): BrandType | undefined {
  if (CAMEX.test(number)) return 'amex'
  if (CVISA.test(number)) return 'visa'
  if (CMASTER.test(number)) return 'mastercard'
  else return undefined
}

export interface CreditCard {
  number: string
  mm: string
  yy: string
  cvv: string
  brand?: BrandType
  complete?: boolean
  luhn?: boolean
}

// https://en.wikipedia.org/wiki/Luhn_algorithm#Description

function luhn(value: string) {
  return (
    value
      .split('')
      .reverse()
      .map(x => parseInt(x, 10))
      .map((x, idx) => (idx % 2 ? x * 2 : x))
      .map(x => (x > 9 ? (x % 10) + 1 : x))
      .reduce((accum, x) => (accum += x), 0) %
      10 ===
    0
  )
}

function captureForBrand(brand: BrandType) {
  if (brand === 'mastercard' || brand === 'visa') {
    return FOUR_4_4_4_CAPTURE
  } else {
    return FOUR_4_6_5_CAPTURE
  }
}

function strippedForBrand(brand: BrandType) {
  if (brand === 'mastercard' || brand === 'visa') {
    return FOUR_4_4_4_STRIPPED
  } else {
    return FOUR_4_6_5_STRIPPED
  }
}

function cvvForBrand(brand: BrandType) {
  if (brand === 'mastercard' || brand === 'visa') {
    return OTHER_CVV
  } else {
    return AMEX_CVV
  }
}

function cvvValidForBrand(brand: BrandType) {
  if (brand === 'mastercard' || brand === 'visa') {
    return OTHER_CVV_VALID
  } else {
    return AMEX_CVV_VALID
  }
}

function numberValidForBrand(brand: BrandType) {
  if (brand === 'mastercard' || brand === 'visa') {
    return FOUR_4_4_4_STRIPPED_VALID
  } else {
    return FOUR_4_6_5_STRIPPED_VALID
  }
}
function checkValid(creditCard: CreditCard, brand: BrandType) {
  const numberValid = numberValidForBrand(brand).test(creditCard.number.replace(/\ /g, ''))
  const mmValid = MM_VALID.test(creditCard.mm)
  const yyValid = YY_VALID.test(creditCard.yy)
  const cvvValid = cvvValidForBrand(brand).test(creditCard.cvv)
  const valid = numberValid && mmValid && yyValid && cvvValid
  return valid
}

export class CreditCardNumberFormatter extends React.Component<{
  onChange: (unformatted: CreditCard) => void
  unformatted: CreditCard
  children: (formatted: CreditCard, onChange: (formatted: CreditCard) => void) => JSX.Element
}> {
  onChange = (cc: CreditCard) => {
    const brand = getBrandFor(cc.number)
    const mm = MM.exec(cc.mm)![1]
    const yy = YY.exec(cc.yy)![1]
    if (brand) {
      const number = strippedForBrand(brand).exec(cc.number.replace(/\ /g, ''))![1]
      const cvv = cvvForBrand(brand).exec(cc.cvv.replace(/\ /g, ''))![1]
      const strippedCC = { number, cvv, mm, yy }
      this.props.onChange({
        ...strippedCC,
        brand,
        complete: checkValid(strippedCC, brand),
        luhn: luhn(strippedCC.number)
      })
    } else {
      const number = UNKNOWN_STRIPPED.exec(cc.number.replace(/\ /g, ''))![1]
      const cvv = UNKNOWN_CVV.exec(cc.cvv.replace(/\ /g, ''))![1]
      console.log({ number, cvv })
      this.props.onChange({ number, cvv, mm, yy, brand: undefined, complete: false, luhn: false })
    }
  }
  render() {
    const cc = this.props.unformatted
    const brand = getBrandFor(cc.number)
    if (brand) {
      const groups = captureForBrand(brand).exec(cc.number)!
      const number = `${groups[1] || ''} ${groups[2] || ''} ${groups[3] || ''} ${groups[4] ||
        ''}`.trim()
      return this.props.children(
        {
          ...cc,
          number,
          brand,
          complete: checkValid(cc, brand),
          luhn: luhn(cc.number)
        },
        this.onChange
      )
    } else {
      return this.props.children(
        { ...cc, complete: false, brand: undefined, luhn: luhn(cc.number) },
        this.onChange
      )
    }
  }
}
