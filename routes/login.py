from flask import Blueprint, render_template, jsonify
from database.db import get_user_by_matricula

login_route = Blueprint('login', __name__)

@login_route.route('/')
def login():
    return render_template('login.html')

@login_route.route('/user/<int:n_matricula>')
def get_user(n_matricula:int): 
    user_data = get_user_by_matricula(n_matricula)

    if 'error' in user_data:
        return jsonify(user_data), 404
    else:
        return jsonify(user_data)