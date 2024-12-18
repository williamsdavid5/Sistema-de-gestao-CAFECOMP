from flask import Blueprint, render_template, request, jsonify

from src.user import User
from database.db import inserir
from database.insert import USUARIO

cadasto_route = Blueprint('cadastro', __name__)


@cadasto_route.route('/')
def cadastro():
    return render_template('cadastro.html')


@cadasto_route.route('/user-new', methods=['POST'])
def novo_cadastro():
    try:
        data = request.get_json()

        resultado = inserir(
            USUARIO, (data['n_matricula'], data['nome'], data['email']))

        if resultado:
            return jsonify({'success': True}), 200
        else:
            return jsonify({'error': 'Erro ao inserir no banco de dados'}), 500

    except Exception as e:
        print(f'erro ao acessar os dados: {e}')
        return jsonify({'error': str(e)}), 500
