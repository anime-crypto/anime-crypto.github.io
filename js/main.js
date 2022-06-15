/*  ---------------------------------------------------
    Theme Name: Anime
    Description: Anime video tamplate
    Author: Colorib
    Author URI: https://colorib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

let header, footer;

const headerxmlhttp = new XMLHttpRequest();
headerxmlhttp.onload = function() {
	header = this.responseText;
}
headerxmlhttp.open("GET", "../header.html");
headerxmlhttp.send();

const footerxmlhttp = new XMLHttpRequest();
footerxmlhttp.onload = function() {
	footer = this.responseText;
}
footerxmlhttp.open("GET", "../footer.html");
footerxmlhttp.send();

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            FIlter
        --------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.filter__gallery').length > 0) {
            var containerEl = document.querySelector('.filter__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Header
    --------------------*/
    $("header").load("header.html", function(responseTxt, statusTxt, xhr){
        /*------------------
            Navigation
        --------------------*/
        $(".mobile-menu").slicknav({
            prependTo: '#mobile-menu-wrap',
            allowParentLinks: true
        });

        $(".header__menu").children().children("li").each(function(i){
            $(this).removeAttr("class")
            pathname = window.location.pathname
            child_href = $(this).children("a").attr("href")
            if ("." + pathname == child_href)
                $(this).attr("class", "active")
        })
    })

    /*------------------
        Footer
    --------------------*/
    $("footer").load("footer.html", function(responseTxt, statusTxt, xhr){
        /*------------------
            Scroll To Top
        --------------------*/
        $("#scrollToTopButton").on("click", function() {
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });
    })

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
		Hero Slider
	--------------------*/
    var hero_s = $(".hero__slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        nav: true,
        navText: ["<span class='arrow_carrot-left'></span>", "<span class='arrow_carrot-right'></span>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false
    });

    /*------------------
        Video Player
    --------------------*/
    const player = new Plyr('#player', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'captions', 'settings', 'fullscreen'],
        seekTime: 25
    });

    /*------------------
        Niceselect
    --------------------*/
    $('select').niceSelect();

})(jQuery);