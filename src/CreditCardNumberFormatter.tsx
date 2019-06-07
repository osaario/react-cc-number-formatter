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
  FOUR_4_6_5_CAPTURE
} from './regexs'

type BrandType = 'visa' | 'amex' | 'mastercard' | null

function getBrandFor(number: string): BrandType {
  if (CAMEX.test(number)) return 'amex'
  if (CVISA.test(number)) return 'visa'
  if (CMASTER.test(number)) return 'mastercard'
  else return null
}

export class CreditCardNumberFormatter extends React.Component<{
  onChange: (unformattedNumber: string) => void
  unformattedNumber: string
  children: (
    formattedNumber: string,
    onChange: (formattedNumber: string) => void,
    brand: BrandType
  ) => JSX.Element
}> {
  onChange = (input: string) => {
    const brand = getBrandFor(input)
    const stripped = input.replace(/\ /g, '')
    if (brand === 'mastercard' || brand === 'visa') {
      if (FOUR_4_4_4_STRIPPED.test(stripped)) this.props.onChange(stripped)
    } else if (brand === 'amex') {
      if (FOUR_4_6_5_STRIPPED.test(stripped)) this.props.onChange(stripped)
    } else {
      if (UNKNOWN_STRIPPED.test(stripped)) this.props.onChange(stripped)
    }
  }
  render() {
    const stripped = this.props.unformattedNumber.replace(/\ /g, '')
    const brand = getBrandFor(stripped)
    if (brand === 'visa' || brand === 'mastercard') {
      const groups = FOUR_4_4_4_CAPTURE.exec(stripped)!
      const constructed = `${groups[1]} ${groups[2]} ${groups[3]} ${groups[4]}`
      return this.props.children(constructed.trim(), this.onChange, brand)
    } else if (brand === 'amex') {
      const groups = FOUR_4_6_5_CAPTURE.exec(stripped)!
      const constructed = `${groups[1]} ${groups[2]} ${groups[3]}`
      return this.props.children(constructed.trim(), this.onChange, brand)
    } else {
      return this.props.children(this.props.unformattedNumber, this.onChange, null)
    }
  }
}
