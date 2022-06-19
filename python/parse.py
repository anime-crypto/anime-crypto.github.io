import requests
import json
from copy import copy
from bs4 import BeautifulSoup as bs

page_size = 12

data = {
	"page": 1,
	"xpage": "catalog",
	"sort": 2,
	"finish": 1,
	"search": {
			"year": 2022,
			"genre": "",
			"season": ""
		}
}

def parse_anime(path):
	ans = {
		"name": "",
		"title": "",
		"image_link": "",
		"type": "",
		"year": "",
		"genres": "",
		"episodes": "",
		"description": "",
		"link": ""
	}
	anilibria_url = "https://www.anilibria.tv"
	url = anilibria_url + path
	site = requests.get(url)
	soup = bs(site.text, "html.parser")
	# with open("test.html", "w") as out:
	# 	out.write(site.text)
	info = soup.find(id="xreleaseInfo")
	img_link = soup.find(id="adminPoster")["src"]
	iframe = soup.find(id="iframeModal")
	iframe_link = iframe.find("pre").get_text()
	ans["name"] = path.split("/")[-1].split(".")[0]
	ans["title"] = info.find("h1").get_text().strip()
	ans["image_link"] = anilibria_url + img_link
	ans["description"] = info.find("p", "detail-description").get_text()
	ans["link"] = iframe_link
	a = info.get_text().split("\n")
	a = [x for x in a if ":" in x]
	for x in a:
		key, value = x.split(":", 1)
		value = value.strip()
		if key == "Сезон":
			ans["year"] = value
		if key == "Жанры":
			ans["genres"] = value
		if key == "Тип":
			ans["episodes"] = value
	return ans

url = "https://www.anilibria.tv/public/catalog.php"
cnt = 0
items = {
	"animes": []
}

try:
	for year in range(2022, 2015, -1):
		form_data = copy(data)
		form_data["search"]["year"] = year
		form_data["search"] = json.dumps(form_data["search"])

		res = requests.post(url, data=form_data).json()
		year_total = res["total"]
		pages = (year_total + page_size - 1) // page_size
		cnt_year = 0
		for i in range(pages):
			page = i + 1
			form_data["page"] = page
			res = requests.post(url, data=form_data).json()
			html = res["table"]
			soup = bs(html, "html.parser")
			for item in soup.find_all("td"):
				cnt += 1
				cnt_year += 1
				name = item.find("span", "anime_name").get_text()
				img_link = item.find("img")["src"]
				link = item.find("a")["href"]
				anime = parse_anime(link)
				items["animes"].append(anime)
				print(f"{cnt = }", end=", ")
				print(f"{year = }", end=", ")
				print(f"{page = }", end=", ")
				print(f"{cnt_year = }")
				print(f"{name = }")
				print()
except:
	print("here")

with open("new_list.json", "w") as out:
	out.write(json.dumps(items, indent=4, ensure_ascii=False))
