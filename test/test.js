/*
       * 获取上一个月
       */
function getPreMonth (date, containTime) {
  var timeStart = ' 00:00:00'
  var timeEnd = ' 23:59:59'

  var arr = date.split('-')
  var year = arr[0] // 获取当前日期的年份
  var month = arr[1] // 获取当前日期的月份
  var days = new Date(year, month - 1, 0).getDate() // 获取当前日期中月的天数
  var year2 = year
  var month2 = parseInt(month) - 1
  if (month2 == 0) {
    year2 = parseInt(year2) - 1
    month2 = 12
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  var t1 = year2 + '-' + month2 + '-' + 1
  var t2 = year2 + '-' + month2 + '-' + days

  t1 = !containTime ? t1 : t1 + timeStart
  t2 = !containTime ? t2 : t2 + timeEnd
  return [t1, t2]
}

/*
 * 获取下一个月
 */
function getNextMonth (date, containTime) {
  var timeStart = ' 00:00:00'
  var timeEnd = ' 23:59:59'

  var arr = date.split('-')
  var year = arr[0] // 获取当前日期的年份
  var month = arr[1] // 获取当前日期的月份
  var year2 = year
  var month2 = parseInt(month) + 1
  // 超过12个月加一年
  if (month2 == 13) {
    year2 = parseInt(year2) + 1
    month2 = 1
    // new Date()第3个参数默认为1，就是每个月的1号，把它设置为0时， new Date()会返回上一个月的最后一天，然后通过getDate()方法得到天数
    var days2 = new Date(year2, month2, 0).getDate()
    if (month2 < 10) {
      month2 = '0' + month2
    }
    var t1 = year2 + '-' + month2 + '-' + 1
    var t2 = year2 + '-' + month2 + '-' + days2

    t1 = !containTime ? t1 : t1 + timeStart
    t2 = !containTime ? t2 : t2 + timeEnd
    return [t1, t2]
  } else {
    var days2 = new Date(year2, month2, 0).getDate()
    if (month2 < 10) {
      month2 = '0' + month2
    }
    console.log(`${month2 + 1} 月天数：${days2}`)
    var t1 = year2 + '-' + month2 + '-' + 1
    var t2 = year2 + '-' + month2 + '-' + days2

    t1 = !containTime ? t1 : t1 + timeStart
    t2 = !containTime ? t2 : t2 + timeEnd
    return [t1, t2]
  }
}

// 获取上一周开始时间，结束时间
function setWeekDate (dateStr, interval, isPre) {
  var arr = dateStr.split('-')
  var year = arr[0] // 获取当前日期的年份
  var month = arr[1] // 获取当前日期的月份
  var day = arr[2] // 获取当前日期的日

  var date = new Date(year, month - 1, day)
  date.setDate(date.getDate() + interval)
  // 一周中的第几天[0, 6]，星期天是 0, 需要减去7天
  var week = (date.getDay() || 7) - 1
  // 减去 offset，获取第一天
  var offset = ''
  if (isPre) {
    offset = week * -1
  } else {
    offset = 6 - week
  }
  date.setDate(date.getDate() + offset)
  return new Date(date)
}

/**
 * 获取下一周
 * @param dateStr
 * @param containTime
 * @returns {*[]}
 */
function getNextWeek(dateStr, containTime) {
  var timeStart = ' 00:00:00'
  var timeEnd = ' 23:59:59'

  var preWeekStart = setWeekDate(dateStr, 7, true)
  var preWeekEnd = setWeekDate(dateStr, 7, false)

  preWeekStart = !containTime ? formatDate(preWeekStart) : formatDate(preWeekStart) + timeStart
  preWeekEnd = !containTime ? formatDate(preWeekEnd) : formatDate(preWeekEnd) + timeEnd
  var ary = [preWeekStart, preWeekEnd]
  return ary
}

/**
 * 获取上一周
 * @param dateStr
 * @param containTime
 * @returns {*[]}
 */
function getPreWeek (dateStr, containTime) {
  var timeStart = ' 00:00:00'
  var timeEnd = ' 23:59:59'

  var preWeekStart = setWeekDate(dateStr, -7, true)
  var preWeekEnd = setWeekDate(dateStr, -7, false)

  preWeekStart = !containTime ? formatDate(preWeekStart) : formatDate(preWeekStart) + timeStart
  preWeekEnd = !containTime ? formatDate(preWeekEnd) : formatDate(preWeekEnd) + timeEnd

  var ary = [preWeekStart, preWeekEnd]
  return ary
}

console.log(getPreWeek('2019-02-01', true))
console.log(getNextWeek('2019-02-01', true))

console.log(getPreWeek('2019-02-01'))
console.log(getNextWeek('2019-02-01'))

console.log(getPreMonth('2019-12-02', true))
console.log(getNextMonth('2019-12-02', true))

// 格局化日期：yyyy-MM-dd
function formatDate (paramDate) {
  var date = new Date()
  date.setTime(paramDate)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return (year + '-' + month + '-' + day)
}
