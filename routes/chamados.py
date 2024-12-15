from flask import Blueprint, render_template

chamados_route = Blueprint('chamados', __name__)

@chamados_route.route('/')
def chamados():
    return render_template('chamados.html')