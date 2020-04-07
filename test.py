import pymongo

client = pymongo.MongoClient("mongodb://richa:abc123@192.168.0.108/vagary")

db = client.vagary

print(db.clustered.count())