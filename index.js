// Your code here
/** 
 * The arg they want passed is an arr, which already has 4 ele 
 */
const createEmployeeRecord = (arr) => {
  //  console.log(arr)
  //  console.log(arr[0])
   return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
   }  
}

//converts nested arrary means iterate and New array means we need to use an array method that iterates and returns a new array. 
const createEmployeeRecords = (array) => {
   // console.log(array)
    return array.map(arr => createEmployeeRecord(arr))
}

const createTimeInEvent = (object, time) => {
   // console.log(object, time) 
    // adding new keys to the timeInEvent array > we need arr method that allows us to push elements into an arr
    //to add 2 new ele inside the timeInEvents arr via .push() or the spread operator
//to access the Obj > arr via dot notation > .push({objects properties we want to add})
    object.timeInEvents.push({
        type: "TimeIn",
// .split(' ') translate a str into an arr. then grab the indx of the ele we want
        hour: parseInt(time.split(' ')[1]), // Derived from the argument "YYYY-MM-DD HHMM"
        date: time.split(' ')[0] // Derived from the argument "YYYY-MM-DD HHMM"
    })
    return object // employee record
}
//Similar behavior to the previous func
const createTimeOutEvent = (object, time) => {
   // console.log(object, time)
    object.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time.split(' ')[1]), // Derived from the argument
        date: time.split(' ')[0] // Derived from the argument
    })
   return object
}
// so just stepping back from the code for a second - if you have a particular employee, and a specific date they worked on, how would you figure out how many hours that employee worked that day? (add up the hours worked on that date)

// we need to figure out the timeInEvent for this employee on this date 
// we need to figure out the timeOutEvent for this employee on this date
// we can use those two values to calculate the time worked by that employee on that date
// does an employee know about its timeInEvents? does it have a way of tracking those?
// is there a way we could search through that array to find the one that happens on the same  // as the one passed into the function?

const hoursWorkedOnDate = (object, date) => {
    //console.log(object, date)
//create to variables (timeIn / timeOut) assignd to the particular date in or array of obj
// via dot notation we access the object > array > .find() and check if the ele papssed as an arg matches the date in the arra [ element.date ===  date ]
//Access the date properties inside the arr w/ ele.date & match it with the arg given
    let timeIn = object.timeInEvents.find(element => element.date === date)
    let timeOut = object.timeOutEvents.find(element => element.date === date)
   // console.log(object.timeInEvents, object.timeOutEvents)
   // console.log(timeIn.hour, timeOut.hour)

    let calculate = (timeOut.hour - timeIn.hour)/ 100

    return calculate 
}

//To calc the employee earned $54 they need to work 2hrs x $27/hr 
const wagesEarnedOnDate = (object, date) => {
  //  console.log(object, date)
    // let timeIn = object.timeInEvents.find(element => element.date === date)
    // let timeOut = object.timeOutEvents.find(element => element.date === date)
   // console.log(object.timeInEvents, object.timeOutEvents)
  // console.log(timeIn.hour, timeOut.hour, object.payPerHour)

//    let check = ((timeOut.hour - timeIn.hour) * object.payPerHour) / 100

//    return check
return  hoursWorkedOnDate(object, date) * object.payPerHour
}

// So first thing's first, we need to get a list of all of the dates that the employee worked
// where do we have access to the dates that the employee worked? -> timeInEvents or timeOutEvents
// wagesEarnedOnDate() will get us the wages earned on one specific date, if we pass in the date
const allWagesFor = (object) => {
    
    let wage = object.timeInEvents.map(ele => ele.date) //  dates that the employee worked
//let time = object.timeInEvents.map(ele => ele.hour)
   // console.log(wage)
//console.log(object.timeInEvents)

//for each day what are the wagesEarnedOnDate
//day represents the ele
    const check = wage.reduce(function(accumulator, day){ return wagesEarnedOnDate(object, day) + accumulator}, 0)

    console.log(check)
    return check
// const reducer = (accumulator, currentValue) => accumulator + currentValue;

// console.log(object.timeInEvents.reduce(reducer), object.payPerHour);
}

const findEmployeeByFirstName = (array, string) => {
    //    //console.log(array, string)
       let name = array.find(element =>  element.firstName )//console.log(element.firstName))
    
       console.log(array[0].firstName, string)
    
       return name
    
    }

const calculatePayroll = (array) => {
    const check = array.reduce(function(accumulator, day){ return allWagesFor(day) + accumulator},0 )

    return check
}