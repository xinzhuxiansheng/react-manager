// 格式化金额
export const formatMoney = (num: number | string) => {
  const a = parseFloat(num.toString())
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

// 格式化数字
export const formatNum = (num: number | string) => {
  const a = num.toString()
  if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

// 格式化日期
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date
  if (rule === 'yyyy-MM-dd') return curDate.toLocaleDateString().replaceAll('/', '-')
  if (rule === 'HH:mm:sss') return curDate.toLocaleTimeString().replaceAll('/', '-')
  return curDate.toLocaleDateString().replaceAll('/', '-')
}
