import json
from pymongo import MongoClient
import pandas as pd
from flask import jsonify


def findplaces(content):
    content = {'places': content['place']}
    # print(content)
    client = MongoClient()
    places = client.vagary.places.find(content)
    # print(list(places))
    return places

def return_recommended(travels):

    client = MongoClient()
    countries = client.vagary.clustered
    clusters = list()
    for i in travels:
        found = countries.find_one({"countries": i})
        clusters.append(found['cluster'])

    places = list()
    for i in clusters:
        found = countries.find({"cluster": i})
        for doc in found:
            places.append(doc['countries'])
    
    return jsonify({"recommend": places})