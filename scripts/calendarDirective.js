calendar.directive('myCalendar', function() {
    return {
        restrict: "EA",
        templateUrl: 'calendar.tpl.html',
        scope: {
            toDoList: '='
        },
        link: function(scope, el, attr) {

            var today = new Date();
            scope.curMonthsNum = today.getMonth();
            scope.curMonths = getCurrentMonth(scope.curMonthsNum);
            scope.week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

            scope.curYear = today.getFullYear();
            scope.numberOfDays = daysInMonth(scope.curMonthsNum, scope.curYear);
            scope.dayToday = getCurrentDay(today);

            scope.months = createMonth(scope.curMonthsNum, scope.curYear);


            // scope functions
            scope.addNote = function(day) {
                scope.visible = true;
                scope.day = day;

                // scope.notes = notes;
            };

            scope.saveNote = function(day, mon, year, note) {
                scope.visible = false;
                scope.$emit('addNote', day, mon, year, note);
            };

            scope.goToPreviousMonth = function(curMonth, curYear) {
                scope.curMonthsNum =  getPreviousMonthNum(curMonth, curYear);
                scope.curYear = getPreviousYear(curMonth, curYear);
                scope.curMonths = getCurrentMonth(scope.curMonthsNum);
                console.log(scope.curMonthsNum, scope.curYear, scope.curMonths);
                scope.numberOfDays = daysInMonth(scope.curMonthsNum, scope.curYear);
                console.log(scope.numberOfDays);

                scope.months = createMonth(scope.curMonthsNum, scope.curYear);
            };

            scope.goToNextMonth = function(curMonth, curYear) {
                scope.curMonthsNum =  getUpcomingMonthNum(curMonth, curYear);
                scope.curYear = getUpcomingYear(curMonth, curYear);
                scope.curMonths = getCurrentMonth(scope.curMonthsNum);
                console.log(scope.curMonthsNum, scope.curYear, scope.curMonths);
                scope.numberOfDays = daysInMonth(scope.curMonthsNum, scope.curYear);
                console.log(scope.numberOfDays);

                scope.months = createMonth(scope.curMonthsNum, scope.curYear);
            }

            scope.$on('updateToDoList', function(ev, toDoObj) {
                // scope.months = getToDoForCurMonth(toDoObj, scope.months);
            });

            
        }
    }
});

function getToDoForCurMonth(toDoList, months) {
    for(var i = 0; i < months.length; i++) {
        for(var j = 0; j < toDoList.length; j++) {
            if(months[i].num == toDoList[j].day) {
                months[i].note = toDoList[j].note;
            }
        }
    }
    return months;
};

function createMonth(thisMonth, year) {
    console.log(thisMonth, year);
    var month = getCurrentMonth(thisMonth);
    var newMonth = [];
    var days = daysInMonth(thisMonth, year);
    for(var i = 0; i < days; i++) {
        var newDay = {
            day: i+1,
            month: month,
            year: year,
            weekdayNum: getWeekdayNum(i+1, month, year),
            weekdayName: getWeekdayName(getWeekdayNum(i+1, month, year)),
            note: []
        };
        newMonth.push(newDay);
    };

    return newMonth;
};

function getPreviousMonthNum(month, year) {
    if(month != 0) {
        return month - 1;
    }
    else {
        return 11;
    }
};

function getPreviousYear(month, year) {
    if(month != 0) {
        return year;
    }
    else {
        return year - 1;
    }
};

function getUpcomingMonthNum(month, year) {
    if(month != 11) {
        return month + 1;
    }
    else {
        return 0;
    }
}

function getUpcomingYear(month, year) {
    if(month != 0) {
        return year;
    }
    else {
        return year + 1;
    }
};