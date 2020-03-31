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
    # print(travels)
    clusters = list()
    for i in travels:
        print(i)
        found = countries.find_one({"countries": i})
        clusters.append(found['cluster'])
        # print(found)
    # print(clusters)
    places = list()
    for i in clusters:
        found = countries.find({"cluster": i})
        for doc in found:
            places.append(doc['countries'])
    s = ";"
    places = s.join(places)
    recommended = {"recommend" : places}
    # print(recommended)
    return recommended