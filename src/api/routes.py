"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/users', methods=['GET', 'POST'])
def handle_users():
    if request.method == 'POST':
        email = request.json.get('email')
        password = request.json.get('password')
        is_active = request.json.get('is_active')
        user = User(
            email=email,
            password=password,
            is_active=is_active,
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({
            "email": email,
            "is_active": is_active
        }), 201
    
    users = User.query.all()
    user_dictionaries = [user.email for user in users]
    return jsonify(user_dictionaries), 200

@api.route('/signup', methods=['POST'])
def handle_create_user():
    email = request.json.get('email')
    password = request.json.get('password')
    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400
    
    existing_user = User.query.filter_by(email=email).one_or_none()
    if existing_user:
        return jsonify({"message": "User already exists."}), 400

    user = User(email=email, password=password, is_active=True)
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error creating user.", "error": str(e)}), 500
    
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

    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify({
            "message": "No such user."
        }), 404

    if password != user.password:
        return jsonify({
            "message": "Bad credentials, bad password"
        }), 400

    token = create_access_token(identity=user.id)
    return jsonify({
        "token": token
    }), 200

@api.route("/very-important-private-data", methods=["GET"])
@jwt_required()
def handle_super_private_endpoint():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({
        "very-private-data": user.email
    }), 200

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200