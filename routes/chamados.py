from flask import Blueprint, render_template, request, jsonify

from src.chamado import Chamado
from src.user import User
from database.db import get_user_by_matricula, inserir, get_chamado_by_id, get_chamados_by_matricula
from database.insert import CHAMADO

chamados_route = Blueprint('chamados', __name__)

@chamados_route.route('/')
def chamados():
    return render_template('chamados.html')

@chamados_route.route('/new/<string:n_matricula>', methods=['POST'])
def novo_chamado(n_matricula):
    try:
        data = request.get_json()
        user_data = get_user_by_matricula(n_matricula)
        user = User(user_data['n_matricula'], user_data['nome'], user_data['email'], user_data['privilegio'])

        chamado = user.criar_chamado(data['titulo'], data['descricao'], data['data'])
        resultado = inserir(CHAMADO, (chamado.titulo ,chamado.descricao, chamado.status, chamado.user, chamado.data))

        if resultado:
            return jsonify({'success': True}), 200
        else:
            return jsonify({'error': 'Falha ao Criar o chamado'}), 500

    except Exception as e:
        print(f'erro ao acessar os dados: {e}')
        return jsonify({'error': str(e)}), 500
    
@chamados_route.route('id/<int:id>')
def get_chamado(id):
    try:
        dados_chamado = get_chamado_by_id(id)

        if 'error' in dados_chamado:
            return jsonify(dados_chamado), 404
        else:
            return jsonify(dados_chamado)
        
    except Exception as e:
        print(f'erro ao acessar os dados: {e}')
        return jsonify({'error': str(e)}), 500
    
@chamados_route.route('user/<string:n_matricula>')
def get_all_chamados_from_user(n_matricula):
    try:
        dados_chamado = get_chamados_by_matricula(n_matricula)

        if 'error' in dados_chamado:
            return jsonify(dados_chamado), 404
        else:
            return jsonify(dados_chamado)
        
    except Exception as e:
        print(f'erro ao acessar os dados: {e}')
        return jsonify({'error': str(e)}), 500
    
# @chamados_route.route