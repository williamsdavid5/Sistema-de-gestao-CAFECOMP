from database import insert
from database.db import executar_sql, get_user_by_email, get_user_by_matricula


user = ('202133840007', 'José Maciel', 'mp6632333@gmail.com')
result_by_matricula = get_user_by_matricula('202133840007')
result_by_email = get_user_by_email('mp6632333@gmail.com')

assert 'error' not in result_by_matricula, 'Falha no get_user_by_matricula'
assert 'error' not in result_by_email, 'Falha no get_user_by_email'
