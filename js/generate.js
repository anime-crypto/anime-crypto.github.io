"use strict";
async function hello() {
    console.log("hello world");
}
jQuery(function () {
    let page_size = 18;
    let page = 1;
    let params_str = window.location.search;
    let params = new URLSearchParams(params_str);
    let param = params.get("page");
    if (param)
        page = Number(param);
    let pr = (page - 1) * page_size;
    $(".product__pagination").children("a").attr("href", function (i, val) {
        if (Number($(this).text()) != page)
            $(this).removeAttr("class");
        else
            $(this).attr("class", "current-page");
    });
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        let list = JSON.parse(this.responseText);
        let animes = list.animes;
        $(".product__item__text").children("h5").html(function (i, origHTML) {
            if (i + pr < animes.length)
                return animes[i].title;
            return origHTML;
        });
        $(".product__item").parent().attr("href", function (i, orig) {
            if (i + pr < animes.length)
                return "animes/" + animes[i].name + ".html";
            return orig;
        });
        $(".product__item__pic").attr("data-setbg", function (i, orig) {
            if (i + pr < animes.length)
                return animes[i].image_link;
            return orig;
        });
        $(".product__item__pic").attr("style", function (i, orig) {
            if (i + pr < animes.length)
                return 'background-image: url("' + animes[i].image_link + '");';
            return orig;
        });
        $(".comment").remove();
        $(".view").remove();
    };
    xmlhttp.open("GET", "../python/list.json");
    xmlhttp.send();
});
