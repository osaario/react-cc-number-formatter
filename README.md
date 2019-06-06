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

export class CreditCardExample extends React.Component {
  state = {
    creditCardNumber: ""
  }
  render() {
    return (
      <CreditCardNumberFormatter
        onChange={unformattedNumber => {
          this.setState({
            creditCardNumber: unformattedNumber
          })
        }}
        unformattedNumber={this.state.creditCardNumber}
      >
        {(formattedNumber, onChange) => (
          <input
            type="tel"
            value={formattedNumber}
            onChange={e => {
              onChange(e.target.value)
            }}
          />
        )}
      </CreditCardNumberFormatter>
    )
  }
}

```
