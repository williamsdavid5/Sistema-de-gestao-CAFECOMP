from flask import Blueprint, render_template

noticia_pagina_route = Blueprint('noticia-pagina', __name__)

@noticia_pagina_route.route('/')
def noticia_pagina():
    return render_template('noticiaPagina.html')