# React Credit Card Number Formatter

Adapter component that helps in building a payment card *Form*

* Formats credit card numbers to readable format: #### #### #### ####
* Validates card numbers with luhn check
* Blocks invalid input for *MM*, *YY* and *CVV* fields
* Agnostic about styling, works with all UI Libraries
* Supports Visa, MasterCard and Amex
* Works also with copy-pasted numbers

## Installation

```
npm install react-cc-number-formatter
```

## Example 


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
        /* Credit card with valid fields and number without spaces, along with Credit Card Information */
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
        {(creditCard, emitChange) => (
          <div>
            <input
              value={
                creditCard.number /* This card number is formatted with spaces */
              }
              onChange={e => {
                /* Blocks invalid input */
                emitChange({ ...creditCard, number: e.target.value })
              }}
            />
            <input
              value={creditCard.cvv}
              onChange={e => {
                emitChange({ ...creditCard, cvv: e.target.value })
              }}
            />
            <input
              value={creditCard.mm}
              onChange={e => {
                emitChange({ ...creditCard, mm: e.target.value })
              }}
            />
            <input
              value={creditCard.yy}
              onChange={e => {
                emitChange({ ...creditCard, yy: e.target.value })
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
onCreditCardChange: (creditCard: CreditCard, creditCardInfo: CreditCardInfo) => void
creditCard: CreditCard
children: (
  creditCard: CreditCard,
  emitChange: (creditCard: CreditCard) => void,
  creditCardInfo: CreditCardInfo
) => JSX.Element
```

### CreditCard

```JSX
interface CreditCard {
  number: string
  mm: string
  yy: string
  cvv: string
}
```

### CreditCardInfo

```JSX
interface CreditCardInfo {
  brand?: BrandType
  complete: boolean
  yyComplete: boolean
  cvvComplete: boolean
  numberComplete: boolean
  mmComplete: boolean
  luhn: boolean
}
```

### BrandType

```JSX
BrandType = 'visa' | 'amex' | 'mastercard'
```



