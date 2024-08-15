"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/users', methods=['GET', 'POST'])
def handle_users():
    if request.method == 'POST':
        username = request.json.get('username')
        password = request.json.get('password')
        is_active = request.json.get('is_active')
        user = User(
            username = username,
            password = password,
            is_active = is_active,
        )
        db.session.add(user)
        db.session.commit()
        return jsonify(username, is_active), 201
    users = User.query.all()
    user_dictionaries = []
    for user in users:
        user_dictionaries.append(
            user.username
        )
    return jsonify(user_dictionaries), 200

@api.route('/signup', methods=['POST'])
def handle_create_user():
    username = request.json.get('username')
    password = request.json.get('password')
    user = User(
            username = username,
            password = password,
            is_active = is_active,
        )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201

@api.route('/login', methods=['POST'])
def handle_login():
    body = request.json
    email = body.get("email")
    password = body.get("password")
    if email is None or password is None:
        return jsonify({
            "message": "Verify that your body contains both an email and password."
        }), 400
    #find the user in our database
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify({
            "message": "No such user."
        }), 404
    #compare what the user knows against what we know
    #validate that the password entered by the user agrees to the password in the database
    if password != user.password:
        return jsonify({
            "message": "Bad credentials, bad password"
        }), 400
    #user verified, issue token
    token = create_access_token(identity=user.id)
    #send token to user
    return jsonify({
        "token": token
    }), 200

@api.route("/very-important-private-data", methods=["GET"])
@jwt_required()
def handle_super_private_endpoint():
    #check who is making the request
    user = get_jwt_identity()
    user = User.query.get(user_id)
    #get that users email and return
    return jsonify({
        "very-private-data": user.email
    }), 200

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
