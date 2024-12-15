from flask import Blueprint, render_template

portal_transparencia_route = Blueprint('portal-transparencia', __name__)

@portal_transparencia_route.route('/')
def portal_transparencia():
    return render_template('portalTransparencia.html')