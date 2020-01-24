from flask import Flask, render_template, jsonify, request, abort
import json
from pymongo import MongoClient

# class RegistrationForm(Form):
#     username = TextField('Username', [validators.Length(min=4, max=20)])
#     email = TextField('Email Address', [validators.Length(min=6, max=50)])
#     password = PasswordField('New Password', [
#         validators.Required(),
#         validators.EqualTo('confirm', message='Passwords must match')
#     ])
#     confirm = PasswordField('Repeat Password')
#     accept_tos = BooleanField('I accept the Terms of Service and Privacy Notice (updated Jan 22, 2015)', [validators.Required()])
    


app = Flask(__name__)

@app.route("/", methods = ['GET','POST'])
def sign_up():
    # try:
    #     form = RegistrationForm(request.form)

    #     if(request.method = "POST" and form.validate()):
    #         username = form.username.data
    #         email = form.email.data
    #         password = form.password.data
    #         connection = MongoClient()
    #         db = connection['vagary']
    #         collection = db['users']
    return render_template("sign_up.html")
            

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