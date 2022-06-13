import json

def init_animes(animes):
    with open("../animes/template.html", "r") as file:
        template = file.read()
    for anime in animes:
        page = template
        page = page.format(**anime)
        with open(f"../animes/{anime['name']}.html", "w") as out:
            out.write(page)

def init_films(films):
    with open("../films/template.html", "r") as file:
        template = file.read()
    for film in films:
        page = template
        page = page.format(**film)
        with open(f"../films/{film['name']}.html", "w") as out:
            out.write(page)

# print(template)
with open("list.json", "r") as json_file:
    list = json.loads(json_file.read())
init_animes(list["animes"])
init_films(list["films"])