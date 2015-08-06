calendar.directive('myCalendar', function() {
    return {
        restrict: "EA",
        templateUrl: 'calendar.tpl.html',
        scope: {
            toDoList: '='
        },
        link: function(scope, el, attr) {

            var today = new Date();
            var curMonthsNum = today.getMonth();
            scope.curMonths = getCurrentMonth(curMonthsNum);

            scope.curYear = getCurrentYear(today);
            scope.numberOfDays = daysInMonth(curMonthsNum, scope.curYear);
            scope.dayToday = getCurrentDay(today);
            scope.months = createMonths(scope.numberOfDays);
           
            scope.addNote = function(day, notes) {
                scope.visible = true;
                scope.day = day;

                scope.notes = notes;
            }
            scope.saveNote = function(day, mon, year, note) {
                scope.visible = false;
                scope.$emit('addNote', day, mon, year, note);
            }

            scope.$on('updateToDoList', function(ev, toDoObj) {
                scope.months = getToDoForCurMonth(toDoObj, scope.months);
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
}