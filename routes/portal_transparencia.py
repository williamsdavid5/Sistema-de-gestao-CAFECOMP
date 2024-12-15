from flask import Blueprint, render_template

portal_tranparencia_route = Blueprint('portal-tranparencia', __name__)

@portal_tranparencia_route.route('/')
def portal_transparencia():
    return render_template('portalTransparencia.html')