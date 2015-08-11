calendar.factory('generalService', function() {
    return {
        getCurrentMonth: function(curMonthNum) {
            var monthNames = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ]; 
            return monthNames[curMonthNum];
        },

        getCurrentDay: function(today) {
            return today.getDate();
        },

        daysInMonth: function(month,year) {
            return new Date(year, month + 1, 0).getDate();
        },

        checkDupes: function(arr) {
            var arrayWithoutDupes = _.uniq(arr);
            return arrayWithoutDupes;
        },

        getWeekdayNum: function(day, month, year) {
            var curDay = month + day + ", " + year;
            var day = new Date(curDay);
            var weekday = day.getDay();
            return weekday;
        },

        getWeekdayName: function(num) {
            var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return week[num];
        }
    }
});