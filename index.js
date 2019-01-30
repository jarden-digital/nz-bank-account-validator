const data = require('./bankData.js')
const leftPad = require('left-pad')
const bankData = data.bankData

const isValidBankAndBranch = (bankId, branch) => {
  if (!bankData.map(o => o.id).includes(+bankId)) return false
  const bank = bankData.find(o => o.id === +bankId)
  return bank.branches.map(b => +branch >= b.from && +branch <= b.to).some(r => r)
}

const getWeightFactor = (bankId, accountNumber) => {
  switch (+bankId) {
    case 8:
      return '000000076543210000'
    case 9:
      return '000000000054320001'
    case 25:
    case 33:
      return '000000017317310000'
    case 26:
    case 28:
    case 29:
      return '000000013713710371'
    case 31:
      return '000000000000000000'
    default:
      if (+accountNumber < 990000) return '00637900A584210000'
      else return '00000000A584210000'
  }
}

const getModulo = (bankId) => {
  switch (+bankId) {
    case 25:
    case 33:
    case 26:
    case 28:
    case 29:
      return 10
    case 31:
      return 1
    default:
      return 11
  }
}

const isValidNZBankNumber = (bk, brch, acct, suf) => {
  const bank = leftPad(bk, 2, '0')
  const branch = leftPad(brch, 4, '0')
  const account = leftPad(acct,8, '0')
  const suffix = leftPad(suf, 4, '0')
  if (+account === 0) return false
  if (!isValidBankAndBranch(bank, branch)) return false
  const checkString = bank + branch + account + suffix
  if (checkString.length !== 18) return false
  const weightFactor = getWeightFactor(bank, account)
  const result = weightFactor.split('')
    .map((v, i) => (v === 'A' ? 10 : +v) * +checkString
      .split('')[i])
    .reduce((acc, curr) => acc + curr)
  const checkNumber = getModulo(bank)
  return result % checkNumber === 0
}

exports.isValidNZBankNumber = isValidNZBankNumber
