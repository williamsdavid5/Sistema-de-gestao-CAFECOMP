from flask import Blueprint, render_template

chamados_route = Blueprint('login', __name__)

@chamados_route.route('/')
def chamados():
    return render_template('chamados.html')