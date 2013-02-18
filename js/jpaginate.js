// jQPSP - jQuery Pagination System Plugin v0.1
// based on jPaginate by Angel Grablev
// Dual license under MIT and GPL

/*
Usage:
    $("#content").jPaginate();

Options available:

    items = number of items per page on pagination
    next = text inside next button
    previous = text inside previous button
    active = active link class
    pagination_class = pagination element class
*/


(function($){
    $.fn.jPaginate = function(options) {

        var defaults = {
            items: 4,
            next: ">",
            previous: "<",
            active: "active",
            pagination_class: "pagination",
        };

        var options = $.extend(defaults, options);

        return this.each(function() {
            // object is the selected pagination element list
            obj = $(this);
            // this is how you call the option passed in by plugin of items
            var show_per_page = options.items;
            //getting the amount of elements inside parent element
            var number_of_items = obj.children().size();
            //calculate the number of pages we are going to have
            var number_of_pages = Math.ceil(number_of_items/show_per_page);
            
            //create the pages of the pagination
            var array_of_elements = [];
            var numP = 0;
            var nexP = show_per_page;
            //loop through all pages and assign elements into array
            for (i=1;i<=number_of_pages;i++)
            {    
                array_of_elements[i] = obj.children().slice(numP, nexP);
                numP += show_per_page;
                nexP += show_per_page;
            }
            
            // display first page and set first page div

            if ($("#current_page").text().length > 0) {
                showPage($("#current_page").text());
                createPagination($("#current_page").text());
            } else {
                showPage(1);
                createPagination(1);
                $("#current_page").html(1);
            }

            //show selected page
            function showPage(page) {
                obj.children().hide();
                array_of_elements[page].show();
            }
            
            // create the navigation for the pagination 
            function createPagination(curr) {

                var items = "", nav = "";
                var start = "<div class='pagination pagination-centered'><ul id='pagination' class='"+options.pagination_class+"'>";
                var previous10 = "<li class='mininum'><a class='goto_p10 mininum' href='#'><<</a></li>";
                var previous10_inactive = "<li class='mininum'><a class='inactive mininum'><<</a></li>";
                var next10 = "<li class='mininum'><a class='goto_n10 mininum' href='#'>>></a></li>";
                var previous = "<li><a class='goto_previous' href='#'>"+options.previous+"</a></li>";
                var next = "<li><a class='goto_next' href='#'>"+options.next+"</a></li>";
				var previous_inactive = "<li><a class='inactive'>"+options.previous+"</a></li>";
                var next_inactive = "<li><a class='inactive'>"+options.next+"</a></li>";
                var end = "</ul>";
                var after = number_of_pages - options.after + 1;

                next_num = parseInt(curr) + 1;
                next2_num = parseInt(curr) + 2;
                prev_num = parseInt(curr) - 1;

                if (next_num < 10) { next_num = '0' + next_num }
                if (next2_num < 10) { next2_num = '0' + next2_num }
                if (prev_num < 10) { prev_num = '0' + prev_num }
                if (curr < 10) { curr_num = '0' + curr }
                else { curr_num = curr }

                if (curr == 1) {
                    items += '<li class="active"><a class="'+options.active+'" title="'+curr+'">'+curr_num+'</a></li>';
                    items += '<li><a href="#" class="goto" title="'+(parseInt(curr)+1)+'">'+(next_num)+'</a></li>';
                    items += '<li><a href="#" class="goto" title="'+(parseInt(curr)+2)+'">'+(next2_num)+'</a></li>';
                } else {
                    items += '<li><a href="#" class="goto" title="'+(parseInt(curr)-1)+'">'+(prev_num)+'</a></li>';
                    items += '<li class="active"><a class="'+options.active+'" title="'+curr+'">'+curr_num+'</a></li>';
                    items += '<li><a href="#" class="goto" title="'+(parseInt(curr)+1)+'">'+(next_num)+'</a></li>';
                }

                if (curr != 1 && curr != number_of_pages && curr > 10) {
                    nav = start + previous10 + previous + items + next + next10 + end;
                } else if (curr == number_of_pages){
                    nav = start + previous10 + previous + items + next_inactive + next10 + end;
                } else if (curr == 1) {
                    nav = start + previous10_inactive + previous_inactive + items + next + next10 + end;
                } else if (curr != 1 && curr < 11) {
                    nav = start + previous10_inactive + previous + items + next + next10 + end;
                }

                $(".navigation").html(nav);
            }
			
            // handle click on pagination
            $(document).on("click", "a.goto_first", function(e){
                e.preventDefault();
                showPage(1);
				set_cookie( "current", 1);
                $(".pagination").remove();
                createPagination(1);
            });
            $(document).on("click", "a.goto_p10", function(e){
                e.preventDefault();
                var act = "."+options.active;
                var newcurr = parseInt($("#pagination").find("a.active").attr("title")) - 10;
                $("#current_page").html(newcurr);
				showPage(newcurr);
                $(".pagination").remove();
                createPagination(newcurr);
            });
            $(document).on("click", "a.goto_n10", function(e){
                e.preventDefault();
                var act = "."+options.active;
                var newcurr = parseInt($("#pagination").find("a.active").attr("title")) + 10;
                $("#current_page").html(newcurr);
				showPage(newcurr);
                $(".pagination").remove();
                createPagination(newcurr);
            });
            $(document).on("click", "a.goto", function(e){
                e.preventDefault();
                showPage($(this).attr("title"));
                $("#current_page").html($(this).attr("title"));
                $(".pagination").remove();
                createPagination($(this).attr("title"));
            });
            $(document).on("click", "a.goto_next", function(e){
                e.preventDefault();
                var act = "."+options.active;
                var newcurr = parseInt($("#pagination").find("a.active").attr("title")) + 1;
                $("#current_page").html(newcurr);
				showPage(newcurr);
                $(".pagination").remove();
                createPagination(newcurr);
            });
            $(document).on("click", "a.goto_previous", function(e){
                e.preventDefault();
                var act = "."+options.active;
                var newcurr = parseInt($("#pagination").find("a.active").attr("title")) - 1;
                $("#current_page").html(newcurr);
                showPage(newcurr);
                $(".pagination").remove();
                createPagination(newcurr);
            });
        });

    };

})(jQuery);