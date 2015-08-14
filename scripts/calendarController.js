calendar.controller('mainCalendarController', function($scope) {
    $scope.toDoList = [];

    $scope.$on('addNote', function(event, day, month, year, note) {
        console.log(day, month, year, note);
        var newnote = {
            day: day,
            month: month,
            year: year,
            note: note
        };
        $scope.toDoList.push(newnote);
        console.log($scope.toDoList);
    });

    $scope.curMonthName = "";
});