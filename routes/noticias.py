from src.aviso import Aviso
from database.db import inserir
from database.insert import MURAL
import os

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
        with open(news.imagens, 'rb') as file:
            imagem_bin = file.read()
        
        resultado = inserir(MURAL, (news.titulo, news.subtitulo, news.texto, news.data, imagem_bin, news.imagens))

        if resultado:
            return jsonify({'success': True}), 200
        else:
            return jsonify({'error': 'Falha ao Criar o chamado'}), 500

    except Exception as e:
        print(f'erro ao cadastrar aviso: {e}')
        return jsonify({'error': str(e)}), 500