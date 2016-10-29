document.addEventListener('DOMContentLoaded', function(event) {

    var cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        cal_months_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'],
        cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        cal_current_date = new Date(),
        today = cal_current_date.getDate(),
        div = document.querySelector('.calendar'),
        actual_month = cal_current_date.getMonth(),
        actual_year = cal_current_date.getYear();
    
    function makeCalendar(actionParameter = false, second = false){
        function makeMonth() {
            function Calendar(month, year) {
                if(actionParameter === "next") { // next month
                    cal_current_date.setMonth(actual_month+1);
                }
                if(actionParameter === "prev") { // previous month
                    cal_current_date.setMonth(actual_month-1);
                }
                this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
                this.year = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
                this.html = '';
            }

            Calendar.prototype.generateHTML = function() {

                // get first day of month
                var firstDay = new Date(this.year, this.month, 1);
                var startingDay = firstDay.getDay();

                // find number of days in month
                var monthLength = cal_days_in_month[this.month];

                // compensate for leap year
                if (this.month == 1) { // February only!
                    if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0) {
                        monthLength = 29;
                    }
                }

                // do the header
                var monthName = cal_months_labels[this.month]
                var html = '<table>';
                html += '<tr><th colspan="7" class="table_head">';
                html += monthName + "&nbsp;" + this.year;
                html += '</th></tr>';
                html += '<tr>';
                for (var i = 0; i <= 6; i++) {
                    html += '<td class="cal_header">';
                    html += cal_days_labels[i];
                    html += '</td>';
                }
                html += '</tr><tr>';

                // fill in the days
                var day = 1;
                // this loop is for weeks (rows)
                for (var i = 0; i < 9; i++) {
                    // this loop is for weekdays (cells)
                    for (var j = 0; j <= 6; j++) {
                        html += '<td class="cell" ondrop="drop(event)" ondragover="allowDrop(event)" data-day=' + day + '>';

                        if (day <= monthLength && (i > 0 || j >= startingDay)) {
                            html += day;
                            day++;
                        }
                        html += '</td>';
                    }
                    // stop making rows if we've run out of days
                    if (day > monthLength) {
                        break;
                    } else {
                        html += '</tr><tr>';
                    }
                }
                html += '</tr></table>';

                this.html = html;
            };
            Calendar.prototype.getHTML = function() {
                return this.html;
            }
            var cal = new Calendar();
            cal.generateHTML();

            $(div).append(cal.getHTML());

        };

        makeMonth();

        //highlight today
        function todayHighlight(){
           var dataDay = $('.cell');
                dataDay.each(function(index, item) {
                    if($(item).attr("data-day") == today){
                        $(this).addClass('today');
                    }
                });
        };

        todayHighlight();
    };
    
    makeCalendar();
    
    var buttonLeft = document.querySelector('.btn_left');
    var buttonRight = document.querySelector('.btn_right');
    
    buttonLeft.addEventListener('click', function(){
       $(div).empty();
        setTimeout(function() {
         makeCalendar("prev");    
        }, 400);
    });
    buttonRight.addEventListener('click', function(){
       $(div).empty();
        setTimeout(function() {
         makeCalendar("next");    
        }, 400);
    });

});