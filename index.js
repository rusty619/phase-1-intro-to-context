// Your code here

let createEmployeeRecord = (arr) => {
    let record = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record
}
let createEmployeeRecords = (arr) => {
    return arr.map(createEmployeeRecord)
}

function createDSObj(getType, dateStamp) {
    return { type: getType, date: dateStamp.slice(0, 10), hour: parseInt(dateStamp.slice(-4)) }
}

let createTimeInEvent = (obj, dataStamp) => {
    obj.timeInEvents.push(createDSObj("TimeIn", dataStamp))
    return obj
}

let createTimeOutEvent = (obj, dataStamp) => {
    obj.timeOutEvents.push(createDSObj("TimeOut", dataStamp))
    return obj
}

function hoursWorkedOnDate(obj, dateYMD) {
    const timeIn = obj.timeInEvents.find((e) => e.date === dateYMD).hour
    const timeOut = obj.timeOutEvents.find((e) => e.date === dateYMD).hour
    return (timeOut - timeIn) / 100
}

let wagesEarnedOnDate = (obj, dateYMD) => {
    const wage = obj.payPerHour
    const hoursWorked = hoursWorkedOnDate(obj, dateYMD)
    return wage * hoursWorked
}

let allWagesFor = (obj) => {
    const allWages = obj.timeInEvents.map((day) => { return wagesEarnedOnDate(obj, day.date) })
    return allWages.reduce((acc, cv) => acc + cv)
}

let calculatePayroll = (records) => {
    const allPay = (records.map((empl) => { return allWagesFor(empl) }))
    return allPay.reduce((acc, cv) => acc + cv)
}

let findEmployeeByFirstName = (srcArray, first_Name) => {
    return srcArray.find((record) => record.firstName === first_Name)
}