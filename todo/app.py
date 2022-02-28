from flask import Flask, render_template, request

app = Flask(__name__)
TODOS = [
    {"action": "feed dog", "done": True, "due": False},
    {"action": "eat breakfast", "done": False, "due": False},
    {"action": "eat lunch", "done": False, "due": True},
]


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        action = request.form["new_todo"]
        new_todo = {"action": action, "done": False, "due": False}
        TODOS.append(new_todo)

    return render_template("todo.html", todos=TODOS)
