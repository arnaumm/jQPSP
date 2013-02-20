// jQPSP - jQuery Pagination System Plugin v0.2 20/02/2013 18:40
// based on jPaginate by Angel Grablev
// Dual license under MIT and GPL

/*
Usage:

    Apply the jQPSP() function to the container of the content to be paged.
    Example: $("#content").jQPSP();

Options available:

    01  uniform = 1 to 9 numbers will have two digits (eg. 1 -> 01)
    02  buttons = total of buttons to display
    03  items = number of items per page on pagination
    04  jump = size of the jump to be made
    05  next = text inside next button
    06  prev = text inside previous button
    07  next_jump = text inside next_jump button
    08  prev_jump = text inside prev_jump button
    09  show_next_prev = switch on/off the next and previous buttons
    10  show_next_jump_prev_jump = switch on/off the jump buttons
    11  show_first = displays the first page button 
    12  show_last = displays the last page button
    13  active = active link class
    14  pagination_class = pagination element class
*/


(function($){
    $.fn.jQPSP = function(options) {

        var defaults = {
            uniform: true,          buttons: 10,
            items: 4,               jump: 10,
            first: "First",         last: "Last",
            next: ">",              prev: "<",
            next_jump: ">>",        prev_jump: "<<",
            active: "active",       pagination_class: "pagination", 
            show_next_prev: true,   show_next_jump_prev_jump: true,
            show_first: false,      show_last: false
        };

        var options = $.extend(defaults, options);

        return this.each(function() {

            obj = $(this);

            var show_per_page = options.items;
            var number_of_items = obj.children().size();
            var number_of_pages = Math.ceil(number_of_items/show_per_page);
            
            var array_of_elements = [];
            var start = 0;
            var offset = show_per_page;

            for (i=1;i<=number_of_pages;i++) {    
                
                array_of_elements[i] = obj.children().slice(start, offset);
                start += show_per_page;
                offset += show_per_page;
                
            }
            
            
            $('body').append('<div id="current_page" style="display:none"></div>');
            $('body').append('<div id="total_pages" style="display:none"></div>');


            if ($("#current_page").text().length > 0) {
                showPage($("#current_page").text());
                createPagination($("#current_page").text());                
            } else {                
                showPage(1);
                createPagination(1);
                $("#current_page").html(1);   
                $("#total_pages").html(number_of_pages); 
            }

            //show selected page
            function showPage(page) {
                obj.children().hide();
                array_of_elements[page].show();
            }
            
            // create the navigation for the pagination 
            function createPagination(curr) {
                
                curr = parseInt(curr);

                var items = "";
                var nav = "";
                var nav_array = new Array();
                var next_num = new Array();
                var prev_num = new Array();
                
                var start = "<div class='pagination pagination-centered'><ul id='pagination' class='"+options.pagination_class+"'>";
                
                var first = "<li><a class='goto_first' href='#'>"+options.first+"</a></li>";                
                var last = "<li><a class='goto_last' href='#'>"+options.last+"</a></li>";
                
                var prev_jump = "<li><a class='goto_prev_jump' alt='"+(curr - options.jump)+"' title='"+options.jump+"' href='#'>"+options.prev_jump+"</a></li>";                
                var next_jump = "<li><a class='goto_next_jump' alt='"+(curr + options.jump)+"' title='"+options.jump+"' href='#'>"+options.next_jump+"</a></li>";
                
                var prev = "<li><a class='goto_prev' alt='"+(curr - 1)+"'title='-1' href='#'>"+options.prev+"</a></li>";
                var next = "<li><a class='goto_next' alt='"+(curr + 1)+"'title='+1' href='#'>"+options.next+"</a></li>";
                
                var prev_inactive = "<li><a class='inactive'>"+options.prev+"</a></li>";
                var next_inactive = "<li><a class='inactive'>"+options.next+"</a></li>";
                
                var prev_jump_inactive = "<li class='mininum'><a class='inactive'>"+options.prev_jump+"</a></li>";
                var next_jump_inactive = "<li class='mininum'><a class='inactive'>"+options.next_jump+"</a></li>";
                
                var end = "</ul></div>";
                
                
                for (i = 0; i < options.buttons; i++) {                                                            

                    next_num[i] = parseInt(curr) + i;
                    prev_num[i] = parseInt(curr) - i;
                    
                    if (options.uniform == true && next_num[i] < 10) { next_num[i] = '0'+next_num[i]; }
                    if (options.uniform == true && prev_num[i] < 10) { prev_num[i] = '0'+prev_num[i]; }
                    
                }
                
                
                var curr_num = (options.uniform ==true && curr < 10) ? ('0' + curr) : curr;
                
                
                function create_prev(i) {
                    return '<li><a href="#" class="goto" title="'+(parseInt(curr)-i)+'">'+prev_num[i]+'</a></li>';                    
                }
                function create_next(i) {
                    return '<li><a href="#" class="goto" title="'+(parseInt(curr)+i)+'">'+next_num[i]+'</a></li>';                    
                }
                function create_curr() {
                    return '<li class="active"><a class="'+options.active+'" title="'+curr+'">'+curr_num+'</a></li>';                    
                }
                
               
                if (curr < Math.ceil(options.buttons/2)) 
                {                                        
                    for (i = (curr - 1)  ; i > 0; i--) { items += create_prev(i); }                                                                                                    
                    items += create_curr();                                                            
                    for (i = 1; i < Math.ceil(options.buttons - curr); i++) { items += create_next(i); }                    
                } 
                else if ( curr > number_of_pages - (Math.ceil((options.buttons/2)-1)) ) 
                {
                    for (i = options.buttons - (number_of_pages - curr + 2)  ; i > 0; i--) { items += create_prev(i); }                                         
                    items += create_curr();                                                            
                    for (i = 1; i <= (number_of_pages - curr); i++) { items += create_next(i); }                                           
                } 
                else 
                {                    
                    for (i = Math.ceil((options.buttons/2)-1) ; i > 0; i--) { items += create_prev(i); }                                         
                    items += create_curr();                                        
                    for (i = 1; i < Math.ceil(options.buttons/2); i++) { items += create_next(i); }                    
                }


                nav_array.push(items);
                
                if (options.show_next_prev == true) { nav_array.push(next); nav_array.unshift(prev); }                
                if (options.show_next_jump_prev_jump == true) { nav_array.push(next_jump); nav_array.unshift(prev_jump); }                
                if (options.show_first == true) { nav_array.unshift(first); }
                if (options.show_last == true) { nav_array.push(last); }
                
                nav_array.unshift(start);
                nav_array.push(end);                                
                nav = nav_array.join(' ');
                
                
                $(".navigation").html(nav);
                
            }
            
            function prepare_pagination(x) {                
                $("#current_page").html(x);
                showPage(x);
                $(".pagination").remove();
                createPagination(x);                               
            }
            
            var clicks = new Array();
            clicks.push('a.goto_first','a.goto_last','a.goto_prev_jump','a.goto_next_jump','a.goto','a.goto_next','a.goto_prev');
            
            clicks.forEach(function(item) {
                $(document).off("click", item);
            });
			
            // pagination handlers
            $(document).on("click", "a.goto_first", function(e){
                e.preventDefault();
                prepare_pagination(1);
            });
            $(document).on("click", "a.goto_last", function(e){
                e.preventDefault();
                var newcurr = $("#total_pages").html();
                prepare_pagination(newcurr); 
            });
            $(document).on("click", "a.goto_prev_jump", function(e){
                e.preventDefault();              
                var newcurr = $(this).attr("alt");
                if (newcurr < 1) { newcurr = 1 }                
                prepare_pagination(newcurr);               
            });
            $(document).on("click", "a.goto_next_jump", function(e){
                e.preventDefault();              
                var newcurr = $(this).attr("alt");
                if (number_of_pages < newcurr) { newcurr = number_of_pages }                 
                prepare_pagination(newcurr);
            });
            $(document).on("click", "a.goto", function(e){
                e.preventDefault();                
                prepare_pagination($(this).attr("title"));
            });
            $(document).on("click", "a.goto_next", function(e){
                e.preventDefault();
                var newcurr = $(this).attr("alt");   
                if (number_of_pages < newcurr) { newcurr = number_of_pages }
                prepare_pagination(newcurr);               
            });
            $(document).on("click", "a.goto_prev", function(e){
                e.preventDefault();
                var newcurr = $(this).attr("alt"); 
                if (newcurr < 1) { newcurr = 1 } 
                prepare_pagination(newcurr);
            });
        });
    };
    
})(jQuery);