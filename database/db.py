import pymysql # type: ignore

import ddl
import insert
import select
from config_db import config # Dicionario com as Configuações do MySQL {host, user password, port}

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
        cursor.execute(ddl.VIEW_SALDO)

        print("Banco de dados e tabelas criados com sucesso!")

    except pymysql.MySQLError as err:
        print(f"Erro ao conectar ou executar SQL: {err}")

    finally:
        # Fechando conexão
        if connection:
            cursor.close()
            connection.close()
            print("Conexão com o MySQL encerrada.")