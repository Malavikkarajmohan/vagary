from flask import Flask, render_template, jsonify, request, abort
import json
from pymongo import MongoClient

app = Flask(__name__)

@app.route("/", methods = ['GET','POST'])
def sign_up():
    return render_template("sign_up.html")

@app.route("/register", methods = ['POST'])
def register():
    client = MongoClient()
    content = request.get_json()
    myclient = client.vagary.users
    exists = myclient.find_one(content)
    if exists:
        return abort(500)
    else:
        x = myclient.insert_one(content)
        return render_template('/home')

@app.route("/check_login", methods = ['GET'])
def check():
    client = MongoClient()
    content = request.get_json()
    myclient = client.vagary.users
    exists = myclient.find_one(content)
    if not exists:
        return abort(500)
    else:
       return render_template('/home')
    

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/home")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/packages")
def packages():
    return render_template("packages.html")

@app.route("/blog")
def blog():
    return render_template("blog.html")

@app.route("/single_blog")
def single_blog():
    return render_template("single-blog.html")

@app.route("/top_place")
def top_place():
    return render_template("top_place.html")

@app.route("/tour_details")
def tour_details():
    return render_template("tour_details.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")


if(__name__ == "__main__"):
    app.run(debug=True)