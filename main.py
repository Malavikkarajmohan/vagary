from flask import Flask, render_template, jsonify, request, abort
import json
from pymongo import MongoClient
from search import findplaces
from flask_cors import CORS
# from recommend_attractions import model

app = Flask(__name__)
CORS(app)


app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route("/", methods = ['GET','POST'])
def sign_up():
    return render_template("sign_up.html")

@app.route("/register", methods = ['POST'])
def register():
    
    client = MongoClient()
    if(request.form['pass'] != request.form['passvalid']):
        return render_template('sign_up.html')
    content = {
        "username" : request.form['username'],
        "pass" : request.form['pass']
    }
    print(content)
    myclient = client.vagary.users
    exists = myclient.find_one(content)
    if exists:
        return abort(500)
    else:
        x = myclient.insert_one(content)
        return render_template('index.html')

@app.route("/check_login", methods = ['POST'])
def check():
    client = MongoClient()
    content = {

    }
    myclient = client.vagary.users
    exists = myclient.find_one(content)
    if not exists:
        return abort(500)
    else:
       return render_template('index.html')
    

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/home", methods = ['POST'])
def home():
    content = request.get_json()
    client = MongoClient()
    recommend_data = client.vagary.purchaseOrders[content.username]
    # predicted_place = model.predict(recommend_data)
    return predicted_place, 200

@app.route('/search', methods = ['GET','POST'])
def search():
    return render_template('search.html')


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

@app.route("/bring_searches", methods = ["POST"])
def results():
    content = request.get_json()
    client = MongoClient()
    myclient = client.vagary.places
    found = myclient.find_one({"persons":content['persons']})
    return str(found)



if(__name__ == "__main__"):
    app.run(debug=True)