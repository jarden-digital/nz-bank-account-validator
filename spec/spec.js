const validator = require('../index.js')

describe("Valid New Zealand Bank Accounts", function() {

  it("should return true for Bank Account number 01090200068389000", function() {
    expect(validator.isValidNZBankNumber('01', '0902', '00068389', '000')).toBe(true);
  });

  it("should return true for Bank Account number 086523019545120001", function() {
    expect(validator.isValidNZBankNumber('08', '6523', '01954512', '0001')).toBe(true);
  });

  it("should return true for Bank Account number 262600003208710032", function() {
    expect(validator.isValidNZBankNumber('26', '2600', '00320871', '0032')).toBe(true);
  });

  it("should return false for Bank Account number 26485749385729888", function() {
    expect(validator.isValidNZBankNumber('26', '4857', '49385729', '888')).toBe(false);
  });

});