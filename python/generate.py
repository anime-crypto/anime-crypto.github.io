import json

with open("../animes/template.html", "r") as file:
    template = file.read()
# print(template)
with open("anime_list.json", "r") as json_file:
    animes = json.loads(json_file.read())
for anime in animes:
    page = template
    page = page.format(**anime)
    with open(f"../animes/{anime['name']}.html", "w") as out:
        out.write(page)