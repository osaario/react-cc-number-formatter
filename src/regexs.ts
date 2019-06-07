export const CVISA = /^4/
export const CMASTER = /^5/
export const CAMEX = /^37/

export const FOUR_4_4_4_STRIPPED = /^([0-9]{0,16}).*$/
export const FOUR_4_4_4_STRIPPED_VALID = /^[0-9]{16}$/
export const FOUR_4_4_4_CAPTURE = /^([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})([0-9]{0,4})$/

export const FOUR_4_6_5_STRIPPED = /^([0-9]{0,15}).*$/
export const FOUR_4_6_5_STRIPPED_VALID = /^[0-9]{0,15}$/
export const FOUR_4_6_5_CAPTURE = /^([0-9]{0,4})([0-9]{0,6})([0-9]{0,5})$/

export const AMEX_CVV = /^([0-9]{0,4}).*$/
export const AMEX_CVV_VALID = /^([0-9]{4})$/

export const OTHER_CVV = /^([0-9]{0,3}).*$/
export const OTHER_CVV_VALID = /^([0-9]{3})$/

export const UNKNOWN_CVV = /^([0-9]{0,4}).*$/

export const MM = /^([0-9]{0,2}).*$/
export const YY = /^([0-9]{0,2}).*$/

export const MM_VALID = /^([0-9]{2})$/
export const YY_VALID = /^([0-9]{2})$/

export const UNKNOWN_STRIPPED = /^[0-9]{0,19}.*$/
