calendar.directive('myCalendar', function(generalService) {
    return {
        restrict: "EA",
        templateUrl: 'calendar.tpl.html',
        scope: {
            toDoList: '='
        },
        link: function(scope, el, attr) {

            var today = new Date();
            scope.curMonthNum = today.getMonth();
            scope.curMonthName = generalService.getCurrentMonth(scope.curMonthNum);
            scope.curYear = today.getFullYear();
            scope.dayToday = generalService.getCurrentDay(today);

            scope.month = initializeMonth(scope.curMonthNum, scope.curYear);
            addDataFromPrevAndNextMonths();


            function initializeMonth(monthNum, year) {
                // 1. Found how many days do we have
                var numberOfDaysInMonth = generalService.daysInMonth(monthNum, year);
                var monthName = generalService.getCurrentMonth(monthNum);

                // 2. Create new array with objects for each day
                var newMonth = [];

                for(var i = 0; i < numberOfDaysInMonth; i++) {
                    var newDay = {
                        day: i+1,
                        month: monthName,
                        year: year,
                        weekdayNum: generalService.getWeekdayNum(i+1, monthName , year),
                        weekdayName: generalService.getWeekdayName(generalService.getWeekdayNum(i+1, monthName, year)),
                        note: []
                    };
                    
                    newMonth.push(newDay);
                };
                
                return newMonth;
            };

            function addDataFromPrevAndNextMonths() {
                addPartOfPreviousMonth();
                addPartOfUpcomingMonth();
            };

            function updateViewToDoNotes() {
                for(var i = 0; i < scope.toDoList.length; i++) {
                    for(var j = 0; j < scope.month.length; j++) {
                        if(scope.toDoList[i].day == scope.month[j].day &&
                            scope.toDoList[i].month == scope.month[j].month &&
                            scope.toDoList[i].year == scope.month[j].year) {
                                scope.month[j].note.push(scope.toDoList[i].note); 
                        }
                    }
                }

                for(var i = 0; i < scope.month.length; i++) {
                    if(scope.month[i].note.length > 0) {
                        scope.month[i].note = generalService.checkDupes(scope.month[i].note);
                    }
                }
            }

            function addPartOfPreviousMonth() {
                // 1. Count how many days we should add
                var startDayNum = scope.month[0].weekdayNum;
                var daysFromPrevMonth;
                var previousMonth;

                if (scope.month[0].weekdayNum != 1) {
                    daysFromPrevMonth = scope.month[0].weekdayNum - 1;
                }

                // 2. Create prev month and choose days we need
                if(scope.curMonthNum != 0) {
                    previousMonth = initializeMonth(scope.curMonthNum - 1, scope.curYear);
                }
                else {
                    previousMonth = initializeMonth(11, scope.curYear - 1);
                }
                
                // 3. Add days to month array
                var daysFromPreviousMonthArr = [];
                for(var i = 0; i < daysFromPrevMonth; i++) {
                    daysFromPreviousMonthArr.push(previousMonth[previousMonth.length - (i + 1)]);
                }
                daysFromPreviousMonthArr = daysFromPreviousMonthArr.reverse();

                for(var i = 0; i < daysFromPreviousMonthArr.length; i++) {
                    daysFromPreviousMonthArr[i].disable = true;
                }

                // 4. Merge arrays
                scope.month = daysFromPreviousMonthArr.concat(scope.month);
            }

            function addPartOfUpcomingMonth() {
                // 1. Count how many days we should add
                var endDayNum = scope.month[scope.month.length - 1].weekdayNum;
                var daysToNextMonth;
                var nextMonth;

                if (scope.month[scope.month.length - 1].weekdayNum != 7) {
                    daysToNextMonth = 7 - scope.month[scope.month.length - 1].weekdayNum;
                }

                // 2. Create prev month and choose days we need
                if(scope.curMonthNum != 11) {
                    nextMonth = initializeMonth(scope.curMonthNum + 1, scope.curYear);
                }
                else {
                    nextMonth = initializeMonth(0, scope.curYear + 1);
                }
                
                // 3. Add days to month array
                var daysToNextMonthArr = [];
                for(var i = 0; i < daysToNextMonth; i++) {
                    daysToNextMonthArr.push(nextMonth[i]);
                }

                for(var i = 0; i < daysToNextMonthArr.length; i++) {
                    daysToNextMonthArr[i].disable = true;
                }

                // 4. Merge arrays
                scope.month = scope.month.concat(daysToNextMonthArr);
            }

            // scope functions
            scope.addNote = function(day) {
                scope.visible = true;
                scope.addNoteToDay = day;
            };

            scope.saveNote = function(day, mon, year, note) {
                scope.visible = false;
                scope.$emit('addNote', day, mon, year, note);
            
                updateViewToDoNotes();
                
            };

            scope.goToPreviousMonth = function(curMonth, curYear) {
                if(curMonth != 0) {
                    scope.curMonthNum = curMonth - 1;
                    scope.curYear = curYear;
                    scope.month = initializeMonth(curMonth - 1, curYear);
                }
                else {
                    scope.curMonthNum = 11;
                    scope.curYear = curYear - 1;
                    scope.month = initializeMonth(11, curYear - 1);
                }
                scope.curMonthName = generalService.getCurrentMonth(scope.curMonthNum);

                updateViewToDoNotes();
                addDataFromPrevAndNextMonths();
            };

            scope.goToNextMonth = function(curMonth, curYear) {
                if(curMonth != 11) {
                    scope.curMonthNum = curMonth + 1;
                    scope.curYear = curYear;
                    scope.month = initializeMonth(curMonth + 1, curYear);
                }
                else {
                    scope.curMonthNum = 0;
                    scope.curYear = curYear + 1;
                    scope.month = initializeMonth(0, curYear + 1);
                }
                scope.curMonthName = generalService.getCurrentMonth(scope.curMonthNum);

                updateViewToDoNotes();
                addDataFromPrevAndNextMonths();
            };
        }
    }
});

