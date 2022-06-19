import json

cnt = 0

def init(items, path):
    global cnt
    with open(path + "/template.html", "r") as file:
        template = file.read()
    for item in items:
        page = template
        page = page.format(**item)
        with open(f"{path}/{item['name']}.html", "w") as out:
            out.write(page)
            cnt += 1
            print(cnt)

# print(template)
with open("new_list.json", "r") as json_file:
    list = json.loads(json_file.read())
init(list["animes"], "../animes")
init(list["films"], "../films")
init(list["series"], "../series")