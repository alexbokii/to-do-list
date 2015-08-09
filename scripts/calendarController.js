calendar.controller('mainCalendarController', function($scope) {
    var toDoList = [];
    $scope.$on('addNote', function(event, day, mon, year, note) {
        // var newNoteDate = {
        //     day: day,
        //     month: mon,
        //     year: year
        // };
        // var newNoteData = note;
        // toDoList = updateToDoList(toDoList, newNoteDate, newNoteData);

        // update toDoList
        // if(toDoList.length > 0) {
        //     for(var i = 0; i < toDoList.length; i++) {
        //         if(toDoList[i].day == newNoteDate.day && toDoList[i].month == newNoteDate.month && toDoList[i].year == newNoteDate.year) {
        //            toDoList[i].note.push(newNoteData);
        //         }
        //         else {
        //             newNoteDate['note'] = [];
        //             newNoteDate['note'].push(newNoteData);
        //             toDoList.push(newNoteDate);
        //         }
        //     }
        // }
        // else {
        //     newNoteDate['note'] = [];
        //     newNoteDate['note'].push(newNoteData);
        //     toDoList.push(newNoteDate);
        // }

        // // filter dupes with lodash
        // for(var i = 0; i < toDoList.length; i++) {
        //     var todoListNoDupes = checkDupes(toDoList[i].note);
        //     toDoList[i].note = todoListNoDupes;
        // };
    
        // $scope.$broadcast('updateToDoList', toDoList);
    });
});

function updateToDoList(toDoList, newNoteDate, newNoteData) {
    if(toDoList.length > 0) {
        for(var i = 0; i < toDoList.length; i++) {
            if(toDoList[i].day == newNoteDate.day && toDoList[i].month == newNoteDate.month && toDoList[i].year == newNoteDate.year) {
               toDoList[i].note.push(newNoteData);
            }
            else {
                newNoteDate['note'] = [];
                newNoteDate['note'].push(newNoteData);
                toDoList.push(newNoteDate);
            }
        }
    }
    else {
        newNoteDate['note'] = [];
        newNoteDate['note'].push(newNoteData);
        toDoList.push(newNoteDate);
    }

    // filter dupes with lodash
    for(var i = 0; i < toDoList.length; i++) {
        var todoListNoDupes = checkDupes(toDoList[i].note);
        toDoList[i].note = todoListNoDupes;
    };
    return toDoList;  
}

