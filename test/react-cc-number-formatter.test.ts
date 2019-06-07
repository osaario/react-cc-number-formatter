import DummyClass from '../src/react-cc-number-formatter'
import { CAMEX, CVISA, CMASTER, FOUR_4_6_5_CAPTURE } from '../src/regexs'

/**
 * Dummy test
 */
describe('Regex detect test', () => {
  it('AMEX detect', () => {
    expect(CAMEX.test('378282246310005')).toBeTruthy()
    expect(CAMEX.test('371449635398431')).toBeTruthy()
    expect(CAMEX.test('37')).toBeTruthy()
    expect(CAMEX.test('424242')).toBeFalsy()
    expect(CAMEX.test('')).toBeFalsy()
  })
  it('VISA detect', () => {
    expect(CVISA.test('378282246310005')).toBeFalsy()
    expect(CVISA.test('424242')).toBeTruthy()
    expect(CVISA.test('')).toBeFalsy()
  })
  it('MASTERCARD detect', () => {
    expect(CMASTER.test('378282246310005')).toBeFalsy()
    expect(CMASTER.test('424242')).toBeFalsy()
    expect(CMASTER.test('')).toBeFalsy()
    expect(CMASTER.test('5200828282828210')).toBeTruthy()
  })
})

describe('Regex capture test', () => {
  it('AMEX capture full', () => {
    const captured = FOUR_4_6_5_CAPTURE.exec('378282246310005')!
    expect(captured[1]).toEqual('3782')
    expect(captured[2]).toEqual('822463')
    expect(captured[3]).toEqual('10005')
  })
  it('AMEX capture partial 1', () => {
    const captured = FOUR_4_6_5_CAPTURE.exec('37828224')!
    expect(captured[1]).toEqual('3782')
    expect(captured[2]).toEqual('8224')
    expect(captured[3]).toEqual('')
  })
  it('AMEX capture partial 2', () => {
    const captured = FOUR_4_6_5_CAPTURE.exec('37')!
    expect(captured[1]).toEqual('37')
    expect(captured[2]).toEqual('')
    expect(captured[3]).toEqual('')
  })
})
