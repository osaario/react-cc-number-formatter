# React Credit Card Number Formatter

Adapter component that helps in building a payment card *Form*

* Formats credit card numbers to readable format #### #### #### #### and back
* Validates card numbers with luhn check
* Blocks invalid input for *MM*, *YY* and *CVV* fields
* Agnostic about styling

## Installation

```
npm install react-cc-number-formatter
```

## Usage 

Works as an adapter that does all the jamming of spaces in between the numbers 😛. In goes and out comes an unformatted value but the children prop function gets a formatted (with spaces) value that can be then set as a value for the input component. Children function also gets an onChange handler that can be called with the changed formatted input.

Agnostic about styling since children prop function can return any JSX.

```JSX
import React from "react"
import { CreditCardNumberFormatter } from "react-cc-number-formatter"

class Example extends React.Component {
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
        /* Credit card with validated fields and number wihout spaces, along with Credit Card Information */
        onCreditCardChange={(creditCard, creditCardInfo) => {
          this.setState(
            {
              creditCard
            },
            () => {
              if (creditCardInfo.complete && creditCardInfo.luhn) {
                alert("All fields filled and luhn check passed")
              }
            }
          )
        }}
        creditCard={this.state.creditCard}
      >
        {(creditCard, onChange) => (
          <div>
            <input
              value={
                creditCard.number /* This card number is formatted with spaces */
              }
              onChange={e => {
                onChange({ ...creditCard, number: e.target.value })
              }}
            />
            <input
              value={creditCard.cvv}
              onChange={e => {
                onChange({ ...creditCard, cvv: e.target.value })
              }}
            />
            <input
              value={creditCard.mm}
              onChange={e => {
                onChange({ ...creditCard, mm: e.target.value })
              }}
            />
            <input
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



