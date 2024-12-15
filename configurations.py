from routes.home import home_route
from routes.login import login_route
from routes.cadastro import cadasto_route
from routes.chamados import chamados_route
from routes.noticias import noticias_route
from routes.noticia_pagina import noticia_pagina_route
from routes.portal_transparencia import portal_transparencia_route

def configure_all(app):
    configure_routes(app)

def configure_routes(app):
    app.register_blueprint(home_route)
    app.register_blueprint(login_route, url_prefix='/login')
    app.register_blueprint(cadasto_route, url_prefix='/cadastro')
    app.register_blueprint(chamados_route, url_prefix='/chamados')
    app.register_blueprint(noticias_route, url_prefix='/noticias')
    app.register_blueprint(noticia_pagina_route, url_prefix='/noticias-pagina')
    app.register_blueprint(portal_transparencia_route, url_prefix='/portal-transparencia')