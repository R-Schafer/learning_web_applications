from flask import Flask, redirect, render_template, request

class Dog:
    def __init__(self, name):
        self.name = name
        self.count = 1

app = Flask(__name__)
DOG_NAMES = []

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        if "add_name" in request.form:
            dog_name = request.form['add_name'].strip().title()
            dog_position = index_of_dog_name(dog_name)
            if dog_name != "" and dog_position == None:
                DOG_NAMES.append(Dog(dog_name))
            elif dog_position != None:
                dog = DOG_NAMES[dog_position]
                dog.count += 1        

        elif "delete_name" in request.form:
            dog_name = request.form['delete_name']
            dog_position = index_of_dog_name(dog_name)
            if dog_position != None:
                del DOG_NAMES[dog_position]

        elif "move_up" in request.form:
            dog_name = request.form['move_up']
            dog_position = index_of_dog_name(dog_name)
            if dog_position != None and dog_position > 0:
                DOG_NAMES[dog_position - 1], DOG_NAMES[dog_position] = DOG_NAMES[dog_position], DOG_NAMES[dog_position - 1]

        elif "move_down" in request.form:
            dog_name = request.form['move_down']
            dog_position = index_of_dog_name(dog_name)
            if dog_position != None and dog_position < len(DOG_NAMES) - 1:
                DOG_NAMES[dog_position + 1], DOG_NAMES[dog_position] = DOG_NAMES[dog_position], DOG_NAMES[dog_position + 1]

    return render_template('index.html', dogs=DOG_NAMES)


# function to help find the position of each dictionary
def index_of_dog_name(dog_name):
    for i in range(len(DOG_NAMES)):
        dog = DOG_NAMES[i]
        if dog.name == dog_name:
            return i

    return None


# Dog Search Page

@app.route("/search")
def search():
    search_results = [] 
    if 'search_dog' in request.args:
        for dog in DOG_NAMES:
            if request.args['search_dog'].lower() in dog.name.lower():
                search_results.append(dog)
    else:
        search_results = DOG_NAMES

    return render_template('search.html', search_results=search_results)

