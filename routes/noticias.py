from flask import Blueprint, render_template

noticias_route = Blueprint('noticias', __name__)

@noticias_route.route('/')
def noticias():
    return render_template('noticias.html')