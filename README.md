jQPSP
=====

jQuery Pagination System Plugin

$('#current_page').bind('DOMNodeInserted', function() {
    var x = $("#current_page").text();
    alert(x);
    showPage(x);
    $(".pagination").remove();
    createPagination(x);
});

http://www.javascriptobfuscator.com/
http://jsbeautifier.org/

