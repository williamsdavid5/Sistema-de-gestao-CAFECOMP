import pymysql  # type: ignore

from database import ddl
from database import select
from database import update
from database.config_db import config # Dicionario com as Configuações do MySQL {host, user password, port}


def init_db():
    connection = None
    try:
        # Conectando ao servidor MySQL
        connection = pymysql.connect(**config)
        cursor = connection.cursor()

        print("Conexão com o servidor MySQL estabelecida.")

        cursor.execute(ddl.CREATE_DATABASE)
        cursor.execute(ddl.USE_DATABASE)
        cursor.execute(ddl.TABELA_USUARIO)
        cursor.execute(ddl.TABELA_PRIVILEGIO)
        cursor.execute(ddl.TABELA_TRANSACAO)
        cursor.execute(ddl.TABELA_MURAL)
        cursor.execute(ddl.TABELA_CHAMADO)
        connection.commit()

        print("Banco de dados e tabelas criados com sucesso!")

    except pymysql.MySQLError as err:
        print(f"Erro ao conectar ou executar SQL: {err}")

    finally:
        # Fechando conexão
        if connection:
            cursor.close()
            connection.close()
            print("Conexão com o MySQL encerrada.")

def get_user_by_email(email:str):
    connection = None
    try:
        # Conectando ao servidor MySQL
        connection = pymysql.connect(**config)
        cursor = connection.cursor()

        print("Conexão com o servidor MySQL estabelecida.")

        cursor.execute(ddl.USE_DATABASE)
        connection.commit()
        cursor.execute(select.USUARIO_EMAIL, (email,))
        result = cursor.fetchone()

        if result:
            privilegio = False
            cursor.execute(select.PRIVILEGIO, (result[0],))
            validar = cursor.fetchone()
            if validar:
                privilegio = True

            return {
                'nMatricula': result[0],
                'nome': result[1],
                'email': result[2],
                'privilegio': privilegio
            }
        else:
            return {'error': 'Usuário não encontrado'}

    except pymysql.MySQLError as err:
        print(f"Erro ao conectar ou executar SQL: {err}")

    finally:
        # Fechando conexão
        if connection:
            cursor.close()
            connection.close()
            print("Conexão com o MySQL encerrada.")

def get_user_by_matricula(n_matricula: str):
    connection = None
    try:
        # Conectando ao servidor MySQL
        connection = pymysql.connect(**config)
        cursor = connection.cursor()

        print("Conexão com o servidor MySQL estabelecida.")
        cursor.execute(ddl.USE_DATABASE)
        cursor.execute(select.USUARIO, (n_matricula,))
        result = cursor.fetchone()

        if result:
            privilegio = False
            cursor.execute(select.PRIVILEGIO, (n_matricula,))
            validar = cursor.fetchone()
            if validar:
                privilegio = True

            return {
                'n_matricula': result[0],
                'nome': result[1],
                'email': result[2],
                'privilegio': privilegio
            }
        else:
            return {'error': 'Usuário não encontrado'}

    except pymysql.MySQLError as err:
        print(f"Erro ao conectar ou executar SQL: {err}")

    finally:
        # Fechando conexão
        if connection:
            cursor.close()
            connection.close()
            print("Conexão com o MySQL encerrada.")

def inserir(sql: str, dados: tuple):
    resultado = True
    try:
        # Conectar ao banco de dados
        connection = pymysql.connect(**config)
        cursor = connection.cursor()

        # Executar o comando SQL com placeholders
        cursor.execute(ddl.USE_DATABASE)
        cursor.execute(sql, dados)

        # Confirmar as mudanças no banco de dados
        connection.commit()

        print("dados inseridos com sucesso!")
    except pymysql.MySQLError as e:
        print(f"Erro ao inserir dados: {e}")
        resultado = False
    finally:
        # Fechar conexão
        if connection:
            cursor.close()
            connection.close()

    return resultado

def get_chamado_by_id(dados):
    connection = None
    try:
        # Conectando ao servidor MySQL
        connection = pymysql.connect(**config)
        cursor = connection.cursor()

        print("Conexão com o servidor MySQL estabelecida.")

        cursor.execute(ddl.USE_DATABASE)
        connection.commit()
        cursor.execute(select.CHAMADO_BY_ID, (dados,))
        result = cursor.fetchone()

        if result:

            return {
                'id': result[0],
                'titulo': result[1],
                'descricao': result[2],
                'status':bool(result[3]),
                'user':result[4],
                'data_criacao':result[5],
                'data_conclusao':result[6],
            }
        else:
            return {'error': 'chamado não encontrado'}

    except pymysql.MySQLError as err:
        print(f"Erro ao conectar ou executar SQL: {err}")

    finally:
        # Fechando conexão
        if connection:
            cursor.close()
            connection.close()
            print("Conexão com o MySQL encerrada.")

def get_chamados_by_matricula(dados):
    connection = None
    try:
        # Conectando ao servidor MySQL
        connection = pymysql.connect(**config)
        cursor = connection.cursor()

        print("Conexão com o servidor MySQL estabelecida.")

        # Seleciona o banco de dados
        cursor.execute(ddl.USE_DATABASE)
        connection.commit()

        privilegio = False
        cursor.execute(select.PRIVILEGIO, (dados,))
        validar = cursor.fetchone()
        if validar:
            privilegio = True
        
        if privilegio:
            cursor.execute(select.CHAMADOS_FROM_ADM)
        else:
            cursor.execute(select.CHAMADO_BY_MATRICULA, (dados,))

        # Executa a consulta
        results = cursor.fetchall()  # Recupera todas as linhas da consulta

        if results:
            # Transforma os resultados em uma lista de dicionários
            chamados = [
                {
                    'id': row[0],
                    'titulo': row[1],
                    'descricao': row[2],
                    'status': bool(row[3]),
                    'user': row[4],
                    'data_criacao': row[5],
                    'data_conclusao': row[6],
                }
                for row in results
            ]
            return chamados
        else:
            return {'error': 'Nenhum chamado encontrado para a matrícula informada'}

    except pymysql.MySQLError as err:
        print(f"Erro ao conectar ou executar SQL: {err}")
        return {'error': str(err)}

    finally:
        # Fechando conexão
        if connection:
            cursor.close()
            connection.close()
            print("Conexão com o MySQL encerrada.")

def update_status_chamado(n_matricula:str, id:int):
    resultado = True
    try:
        # Conectar ao banco de dados
        connection = pymysql.connect(**config)
        cursor = connection.cursor()

        privilegio = False
        cursor.execute(select.PRIVILEGIO, (n_matricula,))
        validar = cursor.fetchone()
        if validar:
            privilegio = True
        
        
        if privilegio:
            cursor.execute(ddl.USE_DATABASE)
            cursor.execute(update.CHAMADO_STATUS, (id,))
        else:
            resultado = False

        # Confirmar as mudanças no banco de dados
        connection.commit()

        print("dados inseridos com sucesso!")
    except pymysql.MySQLError as e:
        print(f"Erro ao inserir dados: {e}")
        resultado = False
    finally:
        # Fechar conexão
        if connection:
            cursor.close()
            connection.close()

    return resultado