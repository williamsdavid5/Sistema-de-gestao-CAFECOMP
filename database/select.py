USUARIO = 'SELECT * FROM USUARIO WHERE nMatricula = %s;'

USUARIO_EMAIL = 'SELECT * FROM USUARIO WHERE email = %s;'

PRIVILEGIO = 'SELECT * FROM PRIVILEGIO WHERE matricula = %s;'

TRANSACAO = 'SELECT * FROM TRANSACAO;'

MURAL = 'SELECT * FROM MURAL;'

CHAMADO = 'SELECT * FROM CHAMADO'

SALDO_TOTAL = 'SELECT SUM(SALDO) FROM TRANSACAO AS SALDO_TOTAL'