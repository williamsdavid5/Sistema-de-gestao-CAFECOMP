from src.aviso import Aviso


from flask import Blueprint, render_template, jsonify, request

noticias_route = Blueprint('noticias', __name__)

@noticias_route.route('/')
def noticias():
    return render_template('noticias.html')

@noticias_route.route('/<string:matricula>/new')
def nova_noticia(matricula:str):
    try:
        data = request.get_json()
        news = Aviso(data['titulo'], data['subtitulo'], data['texto'], data['data'], data['imagens'])

        imagem_bin = None
        # Ler o arquivo como binário
        # with open(arquivo_path, 'rb') as file:
        #     blob_data = file.read()

    except Exception as e:
        print(f'erro ao cadastrar aviso: {e}')
        return jsonify({'error': str(e)}), 500