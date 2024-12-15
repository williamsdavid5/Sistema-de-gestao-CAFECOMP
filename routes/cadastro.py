from flask import Blueprint, render_template

cadasto_route = Blueprint('cadastro', __name__)

@cadasto_route.route('/')
def cadastro():
    return render_template('cadastro.html')