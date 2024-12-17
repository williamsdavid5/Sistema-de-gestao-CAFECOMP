from flask import Blueprint, render_template, jsonify
from database.db import get_user_by_email

login_route = Blueprint('login', __name__)

@login_route.route('/')
def login():
    return render_template('login.html')

@login_route.route('/user/<string:email>')
def get_user(email): 
    user_data = get_user_by_email(email)

    if 'error' in user_data:
        return jsonify(user_data), 404
    else:
        return jsonify(user_data)