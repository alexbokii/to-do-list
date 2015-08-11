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

            function initializeMonth(monthNum, year) {
                // 1. Found how many days do we have
                var numberOfDaysInMonth = generalService.daysInMonth(monthNum, year);
                scope.curMonthName = generalService.getCurrentMonth(monthNum);
                scope.curMonthNum = monthNum;
                scope.curYear = year;

                // 2. Create new array with objects for each day
                var newMonth = [];

                for(var i = 0; i < numberOfDaysInMonth; i++) {
                    var newDay = {
                        day: i+1,
                        month: scope.curMonthName,
                        year: year,
                        weekdayNum: generalService.getWeekdayNum(i+1, scope.curMonthName , year),
                        weekdayName: generalService.getWeekdayName(generalService.getWeekdayNum(i+1, scope.curMonthName , year)),
                        note: []
                    };
                    
                    newMonth.push(newDay);
                };
                
                return newMonth;
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
                    scope.month = initializeMonth(curMonth - 1, curYear);
                }
                else {
                    scope.month = initializeMonth(11, curYear - 1);
                }
                updateViewToDoNotes();
            };

            scope.goToNextMonth = function(curMonth, curYear) {
                if(curMonth != 11) {
                    scope.month = initializeMonth(curMonth + 1, curYear);
                }
                else {
                    scope.month = initializeMonth(0, curYear + 1);
                }
                updateViewToDoNotes();
            };
        }
    }
});

