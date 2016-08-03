$(function(){
    
    $("body").on("click", '#open' ,function(){
        document.getElementById("myNav").style.height = "100%"
    });
    $("body").on("click", '.closebtn' ,function(){
        document.getElementById("myNav").style.height = "0%"
    });
      $("body").on("click", '#shop-cart' ,function(){
        document.getElementById("myshopcart").style.height = "100%"
    });
       $("body").on("click", '.closebtn' ,function(){
        document.getElementById("myshopcart").style.height = "0%"
    });
        $("body").on("click", '#openItem' ,function(){
        document.getElementById("shopping").style.height = "100%"
    });
       $("body").on("click", '.closebtn' ,function(event){
        document.getElementById("shopping").style.height = "0%"
         event.preventDefault();
    });
           $("body").on("click", '#shop-login' ,function(){
        document.getElementById("myshopcart_table").style.height = "100%"
    });
       $("body").on("click", '.closebtn' ,function(event){
        document.getElementById("myshopcart_table").style.height = "0%"
         event.preventDefault();
    });
    $("body").on('click'," #link-novedades", function()
        {
            $('html, body').animate({scrollTop: $('#novedades').offset().top},800);
            return false;
    });
    $("body").on('click'," .novedades-img", function()
    {
        $('html, body').animate({scrollTop: $('#novedades').offset().top},800);
        return false;
    });
    $("body").on('click'," .gender", function()
    {
        $('html, body').animate({scrollTop: $('#tienda').offset().top},500);
        return false;
    });
    $(document).scroll(function() {
        var y = $(this).scrollTop();
        console.log(y);
    if (y >= 1490 && y <= 2100 ) {
        $('.button-shop').removeClass('hide');
        $('.button-shop').addClass('show');
    } 
    else if(y >= 2850 && y <= 4350 ){
        $('.button-shop').removeClass('hide');
        $('.button-shop').addClass('show');
    }
    else{
        $('.button-shop').removeClass('show');
        $('.button-shop').addClass('hide');
    }
    $("body").on("click", '.button-shop' ,function(event){
        $('.button-shop').removeClass('show');
        $('.button-shop').addClass('hide');
        $('.overlay-c').removeClass('hide');
        $('.overlay-c').addClass('show');
    });
    $("body").on("click", '.closebtn2' ,function(event){
        $('.overlay-c').removeClass('show');
        $('.overlay-c').addClass('hide');
        $('.button-shop').removeClass('hide');
        $('.button-shop').addClass('show');
        event.preventDefault();
    });
});


});
