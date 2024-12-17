import pymysql  # type: ignore

from database import ddl
from database import select
# Dicionario com as Configuações do MySQL {host, user password, port}
from database.config_db import config


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

        cursor.execute(select.USUARIO, (n_matricula,))
        result = cursor.fetchone()

        if result:
            privilegio = False
            cursor.execute(select.PRIVILEGIO, (n_matricula,))
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


def inserir(sql: str, dados: tuple):
    resultado = True
    try:
        # Conectar ao banco de dados
        connection = pymysql.connect(**config)
        cursor = connection.cursor()

        # Executar o comando SQL com placeholders
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
