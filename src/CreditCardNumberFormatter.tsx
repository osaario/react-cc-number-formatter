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
  YY
} from './regexs'

export type BrandType = 'visa' | 'amex' | 'mastercard' | null

function getBrandFor(number: string): BrandType {
  if (CAMEX.test(number)) return 'amex'
  if (CVISA.test(number)) return 'visa'
  if (CMASTER.test(number)) return 'mastercard'
  else return null
}

export interface CreditCard {
  number: string
  mm: string
  yy: string
  cvv: string
  brand: BrandType
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

export class CreditCardNumberFormatter extends React.Component<{
  onChange: (unformatted: CreditCard) => void
  unformatted: CreditCard
  children: (
    formatted: CreditCard,
    onChange: (formatted: CreditCard) => void,
    brand: BrandType
  ) => JSX.Element
}> {
  onChange = (cc: CreditCard) => {
    const brand = getBrandFor(cc.number)
    const mm = MM.exec(cc.mm)![1]
    const yy = YY.exec(cc.yy)![1]
    if (brand) {
      const number = strippedForBrand(brand).exec(cc.number.replace(/\ /g, ''))![1]
      const cvv = cvvForBrand(brand).exec(cc.cvv.replace(/\ /g, ''))![1]
      this.props.onChange({ ...cc, number, cvv, mm, yy })
    } else {
      const nexec = UNKNOWN_STRIPPED.exec(cc.number.replace(/\ /g, ''))
      const number = nexec && nexec[1] ? nexec[1] : ''
      const cvv = UNKNOWN_CVV.exec(cc.cvv.replace(/\ /g, ''))![1]
      console.log({ number, cvv })
      this.props.onChange({ ...cc, number, cvv, mm, yy })
    }
  }
  render() {
    const stripped = this.props.unformatted.number.replace(/\ /g, '')
    const brand = getBrandFor(stripped)
    const cc = this.props.unformatted
    if (brand) {
      const groups = captureForBrand(brand).exec(stripped)!
      const constructed = `${groups[1] || ''} ${groups[2] || ''} ${groups[3] || ''} ${groups[4] ||
        ''}`
      return this.props.children({ ...cc, number: constructed.trim() }, this.onChange, brand)
    } else {
      return this.props.children(cc, this.onChange, null)
    }
  }
}
