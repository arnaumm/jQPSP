// jQPSP - jQuery Pagination System Plugin v0.2 19/02/2013 17:00
// based on jPaginate by Angel Grablev
// Dual license under MIT and GPL

/*
Usage:
    $("#content").jPaginate();

Options available:

    items = number of items per page on pagination
    next = text inside next button
    prev = text inside previous button
    next10 = 
    prev10 = 
    active = active link class
    pagination_class = pagination element class
*/


(function($){
    $.fn.jQPSP = function(options) {

        var defaults = {
            uniform: true,
            buttons: 10,
            items: 4,
            next: ">",
            prev: "<",
            next10: ">>",
            prev10: "<<",
            active: "active",
            pagination_class: "pagination"           
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

                var items = "";
                var nav = "";
                var next_num = new Array();
                var prev_num = new Array();
                
                var start = "<div class='pagination pagination-centered'><ul id='pagination' class='"+options.pagination_class+"'>";
                var prev10 = "<li class='mininum'><a class='goto_p10 mininum' href='#'>"+options.prev10+"</a></li>";                
                var next10 = "<li class='mininum'><a class='goto_n10 mininum' href='#'>"+options.next10+"</a></li>";
                var prev = "<li><a class='goto_previous' href='#'>"+options.prev+"</a></li>";
                var next = "<li><a class='goto_next' href='#'>"+options.next+"</a></li>";
		var prev_inactive = "<li><a class='inactive'>"+options.prev+"</a></li>";
                var next_inactive = "<li><a class='inactive'>"+options.next+"</a></li>";
                var prev10_inactive = "<li class='mininum'><a class='inactive mininum'>"+options.prev10+"</a></li>";
                var next10_inactive = "<li class='mininum'><a class='inactive mininum'>"+options.next10+"</a></li>";
                var end = "</ul>";
                
                
                for (i = 0; i < options.buttons; i++) {
                                        
                    //next_num[i] = (options.uniform == true && (parseInt(curr) + i) < 10) ? '0'+(parseInt(curr) + i) : (parseInt(curr) + i);
                    //prev_num[i] = (options.uniform == true && (parseInt(curr) - i) < 10) ? '0'+(parseInt(curr) - i) : (parseInt(curr) - i);                 

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
                
                
                if (curr == number_of_pages) { nav = start + prev10 + prev + items + next_inactive + next10_inactive + end; } 
                else if (curr == 1) { nav = start + prev10_inactive + prev_inactive + items + next + next10 + end; }
                else { nav = start + prev10 + prev + items + next + next10 + end; } 


                $(".navigation").html(nav);
                
            }
            
            function prepare_pagination(x) {                
                $("#current_page").html(x);
                showPage(x);
                $(".pagination").remove();
                createPagination(x);                               
            }
			
            // pagination handlers
            $(document).on("click", "a.goto_first", function(e){
                e.preventDefault();
                prepare_pagination(1);
            });
            $(document).on("click", "a.goto_p10", function(e){
                e.preventDefault();
                var newcurr = parseInt($("#pagination").find("a.active").attr("title")) - 10;                
                if (newcurr < 1) { newcurr = 1 }                
                prepare_pagination(newcurr);               
            });
            $(document).on("click", "a.goto_n10", function(e){
                e.preventDefault();
                var newcurr = parseInt($("#pagination").find("a.active").attr("title")) + 10;                
                if (number_of_pages < newcurr) { newcurr = number_of_pages }                 
                prepare_pagination(newcurr);
            });
            $(document).on("click", "a.goto", function(e){
                e.preventDefault();                
                prepare_pagination($(this).attr("title"));
            });
            $(document).on("click", "a.goto_next", function(e){
                e.preventDefault();
                var newcurr = parseInt($("#pagination").find("a.active").attr("title")) + 1;                
                prepare_pagination(newcurr);               
            });
            $(document).on("click", "a.goto_previous", function(e){
                e.preventDefault();
                var newcurr = parseInt($("#pagination").find("a.active").attr("title")) - 1;                
                prepare_pagination(newcurr);
            });
        });
    };
    
})(jQuery);