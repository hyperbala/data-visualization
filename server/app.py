from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from bson.objectid import ObjectId
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB setup
mongo_uri = 'mongodb+srv://balagopal123r:ravibhba@cluster0.rzakxoh.mongodb.net/?retryWrites=true&w=majority'
db_name = 'dashboardDB'
collection_name = 'data'

client = MongoClient(mongo_uri)
db = client[db_name]
collection = db[collection_name]

def check_and_upload_data():
    if collection.name not in db.list_collection_names():
        try:
            with open('jsondata.json', 'r', encoding='utf-8') as file:
                data = json.load(file)
                if isinstance(data, list):
                    collection.insert_many(data)
                else:
                    collection.insert_one(data)
            print("Initial data uploaded successfully.")
        except Exception as e:
            print(f"Error uploading initial data: {str(e)}")

check_and_upload_data()

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        data = json.load(file)
        if isinstance(data, list):
            collection.insert_many(data)
        else:
            collection.insert_one(data)
        return jsonify({"message": "Data uploaded successfully"}), 200
    except ValueError as ve:
        return jsonify({"error": "Invalid JSON format"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/data', methods=['GET'])
def get_data():
    query = {}
    
    filters = {
        "end_year": "end_year",
        "topic": "topic",
        "sector": "sector",
        "region": "region",
        "pest": "pestle",
        "source": "source",
        "swot": "swot",
        "country": "country",
        "city": "city"
    }
    
    for param, field in filters.items():
        value = request.args.get(param)
        if value:
            query[field] = value
    
    data = list(db.data.find(query))
    
    # Convert ObjectId to string
    for item in data:
        item['_id'] = str(item['_id'])
    
    return jsonify(data)

@app.route('/filters', methods=['GET'])
def get_filters():
    filters = {}
    
    filter_fields = ["end_year", "topic", "sector", "region", "pestle", "source", "country"]
    
    for field in filter_fields:
        filters[field] = db.data.distinct(field)
    
    return jsonify(filters)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)