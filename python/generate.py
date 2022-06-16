import json

def init(items, path):
    with open(path + "/template.html", "r") as file:
        template = file.read()
    for item in items:
        page = template
        page = page.format(**item)
        with open(f"{path}/{item['name']}.html", "w") as out:
            out.write(page)

# print(template)
with open("list.json", "r") as json_file:
    list = json.loads(json_file.read())
init(list["animes"], "../animes")
init(list["films"], "../films")
init(list["series"], "../series")