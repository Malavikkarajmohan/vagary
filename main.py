from flask import Flask, render_template, jsonify, request, abort, session, redirect, url_for
import json
from pymongo import MongoClient
from util import findplaces, return_recommended
from flask_cors import CORS
from flask_login import LoginManager, UserMixin

# from recommend_attractions import model

app = Flask(__name__)
CORS(app)

app.secret_key = 'mysecret'

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


@app.route("/", methods = ['GET','POST'])
def sign_up():
    return render_template("sign_up.html")

@app.route('/active')
def active():
    if 'username' in session:
        return 'You are logged in as ' + session['username']
    return redirect(url_for('/'))

@app.route("/register", methods = ['POST', 'GET'])
def register():
    if request.method == 'POST':
        client = MongoClient()
        if(request.form['pass'] != request.form['passvalid']):
            return render_template('sign_up.html')
        content = {
            "username" : request.form['username'],
            "pass" : request.form['pass'],
            "travels" : []
        }
        print(content)
        myclient = client.vagary.users
        exists = myclient.find_one({'username': content['username']})
        if exists:
            return abort(500)
        else:
            x = myclient.insert_one(content)
            session['username'] = request.form['username']
            return redirect(url_for('home'))
    
    else :
        return redirect(url_for('/'))



@app.route("/check_login", methods = ['POST'])
def check():
    client = MongoClient()
    content = {
        'username': request.form['username'],
        'pass': request.form['pass']
    }
    myclient = client.vagary.users
    exists = myclient.find_one(content)
    if not exists:
        return abort(500)
    else:
        session['username'] = request.form['username']
        print(session['username'])
        return redirect(url_for('home'))
    

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/home")
def home():
    return render_template('index.html')

@app.route("/recommend", methods = ['GET'])
def recommend():
    client = MongoClient()
    content = client.vagary.users.find_one({"username": session['username']})
    travels = content['travels']
    #print(travels)
    data = return_recommended(travels)
    print (data)
    return jsonify(data)



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
    found = myclient.find({"persons":content['persons']})
    data = dict()
    search = 1
    for i in found:
        data[search] = i
        search +=1 
    print(type(data))
    return str(data)

@app.route("/book_success", methods = ["POST"])
def book_now():
    content = request.get_json()
    client = MongoClient()
    content = client.vagary.users.update_one({"username": session['username']}, {'$push' : {"travels": content['place']}})
    return render_template('success.html')

if(__name__ == "__main__"):
    app.run(debug=True)