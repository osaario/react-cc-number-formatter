# React Credit Card Number Formatter

Formats credit card numbers to more readable #### #### #### #### (visa and mastercard) and #### ###### #### (amex) format. And then back again.

## Installation

```
npm install react-cc-number-formatter
```

## Usage 

Works as an adapter that does all the jamming of spaces in between the numbers 😛. In goes and out comes an unformatted value but the children prop function gets a formatted (with spaces) value that can be then set as a value for the input component. Children function also gets an onChange handler that can be called with the changed formatted input.

Agnostic about styling since children prop function can return any JSX.

```JSX
import React from "react"
import CreditCardNumberFormatter from "react-cc-number-formatter"

export class CreditCardFormExample extends React.Component {
  state = {
    creditCard: {
      number: "",
      mm: "",
      yy: "",
      cvv: ""
    }
  }
  render() {
    return (
      <CreditCardNumberFormatter
        onChange={creditCard => {
          this.setState({
            creditCard
          })
        }}
        unformatted={this.state.creditCard}
      >
        {(creditCard, onChange) => (
          <div>
            <input
              type="tel"
              value={creditCard.number}
              onChange={e => {
                onChange({ ...creditCard, number: e.target.value })
              }}
            />
            <input
              type="tel"
              value={creditCard.cvv}
              onChange={e => {
                onChange({ ...creditCard, cvv: e.target.value })
              }}
            />
            <input
              type="tel"
              value={creditCard.mm}
              onChange={e => {
                onChange({ ...creditCard, mm: e.target.value })
              }}
            />
            <input
              type="tel"
              value={creditCard.yy}
              onChange={e => {
                onChange({ ...creditCard, yy: e.target.value })
              }}
            />
          </div>
        )}
      </CreditCardNumberFormatter>
    )
  }
}
```

## API

### Props

```JSX
onChange: (unformatted: CreditCard) => void
unformatted: CreditCard
children: (formatted: CreditCard, onChange: (formatted: CreditCard) => void) => JSX.Element
```

### CreditCard


```JSX
interface CreditCard {
  number: string
  mm: string
  yy: string
  cvv: string
  brand?: BrandType
  complete?: boolean
  luhn?: boolean
}
```

### BrandType

```JSX
export type BrandType = 'visa' | 'amex' | 'mastercard'
```



