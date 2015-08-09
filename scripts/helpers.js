
function getCurrentMonth(curMonthsNum) {
   var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]; 
    return monthNames[curMonthsNum];
}

function getCurrentYear(today) {
    return today.getFullYear();
}

function getCurrentDay(today) {
    return today.getDate();
}

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

function createMonths(days) {
    var monthsArray = [];
    for(var i = 1; i <= days; i++) {
        monthsArray.push({num: i, note: []});
    }
    return monthsArray;
}

function checkDupes(arr) {
    var arrayWithoutDupes = _.uniq(arr);
    return arrayWithoutDupes;
}

function getWeekdayNum(day, month, year) {
    var curDay = month + day + ", " + year;
    var day = new Date(curDay);
    var weekday = day.getDay();
    return weekday;
}

function getWeekdayName(num) {
    // console.log(num);
    var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return week[num];
}