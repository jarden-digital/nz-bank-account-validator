# nz-bank-account-validator

[![npm](https://img.shields.io/npm/v/@fnzc/nz-bank-account-validator.svg)](https://www.npmjs.com/package/@fnzc/nz-bank-account-validator) [![npm](https://img.shields.io/npm/dt/@fnzc/nz-bank-account-validator.svg)](https://www.npmjs.com/package/@fnzc/nz-bank-account-validator.svg)

_A validator for New Zealand bank accounts_

## Installation

```
npm install --save nz-bank-account-validator
```
or
```
yarn add nz-bank-account-validator
```

## Usage

Function requires four string parameters:
* Bank ID
* Bank Branch
* Account Base
* Suffix
Returns a boolean.

```
var bankAccountValidator = require('nz-bank-account-validator');
bankAccountValidator.isValidNZBankNumber('00', '0000', '00000000', '000');
```

## Algorithm

The algorithm is based on the 'Non-Resident Withholding Tax And Resident Withholding Tax Specification Document' issues by the Inland Revenue on the 31st of March 2016.

### Bank account number validation

The bank account number format used by all banks is numeric and includes the following parts:

* Bank ID (maximum 2 digits)
* Bank branch (maximum 4 digits)
* Account base number (maximum 8 digits)
* Account suffix (maximum 4 digits).
    
For processing at Inland Revenue the fields for the individual account number parts are all of maximum size. If less than the maximum number of digits is supplied, then values are right justified and the fields padded with zeroes (where applicable).

The first step in the validation process is to verify the bank branch number. For every bank ID, a range of branch numbers is allocated. If the bank ID is not one of those listed below or the branch number is not included in the range(s) specified, the bank account number is invalid. If the branch number is valid, then derive the appropriate code from the “Algorithm” column below and perform the second validation step as outlined in the first paragraph over the page.

| Bank ID | Valid Branch Numbers | Algorithm |
|---|---|---|
|01|0001 - 0999, 1100 - 1199, 1800 - 1899|See note|
|02|0001 - 0999, 1200 - 1299|See note|
|03|0001 - 0999, 1300 - 1399, 1500 - 1599, 1700 – 1799 , 1900 - 1999|See note|
|06|0001 - 0999, 1400 - 1499|See note|
|08|6500 - 6599|D|
|09|0000|E|
|11|5000 - 6499, 6600 - 8999|See note|
|12|3000 - 3299, 3400 – 3499, 3600 - 3699|See note|
|13|4900 - 4999|See note|
|14|4700 - 4799|See note|
|15|3900 - 3999|See note|
|16|4400 - 4499|See note|
|17|3300 - 3399|See note|
|18|3500 - 3599|See note|
|19|4600 - 4649|See note|
|20|4100 - 4199|See note|
|21|4800 - 4899|See note|
|22|4000 - 4049|See note|
|23|3700 - 3799|See note|
|24|4300 - 4349|See note|
|25|2500 - 2599|F|
|26|2600 - 2699|G|
|27|3800 - 3849|See note|
|28|2100 - 2149|G|
|29|2150 - 2299|G|
|30|2900 - 2949|See note|
|31|2800 - 2849|X|
|33|6700 - 6799|F|
|35|2400 - 2499|See note|
|38|9000 - 9499|See note|

**Note**: If the account base number is below 00990000 then apply algorithm A, otherwise apply algorithm B.

The second validation step is a modulus n algorithm applied to the whole account number. The algorithm type is derived from the table on the previous page. Follow this process:

* Identify the corresponding weight factor for every digit in the account number as showninthetablebelow. Note:allfields(iebankID,bankbranch,accountbase and account suffix) are right justified and padded with zeroes.
* Add together the products of the weight factors and their associated account number digit. If the algorithm E or G is used then add the two digits of the product (tens and ones), and again the two digits of the result before summing (see example 3 on page 16).
* Divide the sum by the value in the “Modulo” column below. If the remainder is zero then the bank account number is valid.

| Algorithm | Bank | Branch | Account Base | Suffix | Modulo |
|---|---|---|---|---|---|
|A|00|6379|00A58421|0000|11|
|B|00|0000|00A58421|0000|11|
|C|37|0000|91A53421|0000|11|
|D|00|0000|07654321|0000|11|
|E|00|0000|00005432|0001|11|
|F|00|0000|01731731|0000|10|
|G|00|0000|01371371|0371|10|
|X|00|0000|00000000|0000|1|

**Note 1**: Algorithm C is not currently used by the banks.
**Note 2**: Algorithm X (for Bank ID 31) always verifies the bank account number to be valid. It is included in this table so the same validation logic can be applied to all account numbers.

## [Changelog](https://github.com/FNZC/nz-bank-account-validator/blob/master/CHANGELOG.md)

## Contributing

Pull requests are welcome.

## [License](https://github.com/FNZC/nz-bank-account-validator/blob/master/LICENSE)
