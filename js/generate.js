$(document).ready(function(){
	let animes;

	const xmlhttp = new XMLHttpRequest();
	xmlhttp.onload = function() {
		list = JSON.parse(this.responseText);
		animes = list.animes;
		$(".product__item__text").children("h5").html(function(i, origHTML){
			if (i < animes.length)
				return animes[i].title
			return origHTML
		});
		$(".product__item").parent().attr("href", function(i, orig){
			if (i < animes.length)
				return "animes/" + animes[i].name + ".html"
			return orig
		})
		$(".product__item__pic").attr("data-setbg", function(i, orig){
			if (i < animes.length)
				return animes[i].image_link
			return orig
		});
		$(".product__item__pic").attr("style", function(i, orig){
			if (i < animes.length)
				return 'background-image: url("' + animes[i].image_link + '");'
			return orig
		});
		$(".comment").remove();
		$(".view").remove()
	}
	xmlhttp.open("GET", "../python/list.json");
	xmlhttp.send();
});