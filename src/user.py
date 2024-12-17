import re

from src.chamado import Chamado

class User():
    def __init__(self, n_matricula:str, nome:str, email:str, privilegio:bool = False):
        self._n_matricula = n_matricula
        self.nome = nome
        self._email = email
        self._privilegio = privilegio

    # Property e setter para n_matricula
    @property
    def n_matricula(self):
        return self._n_matricula

    @n_matricula.setter
    def n_matricula(self, value: str):
        if not isinstance(value, str):
            raise ValueError("O número de matrícula deve ser uma string.")
        self._n_matricula = value

    # Property e setter para email
    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value: str):
        if "@" not in value or "." not in value:
            raise ValueError("O email fornecido não é válido.")
        self._email = value

    # Property e setter para privilegio
    @property
    def privilegio(self):
        return self._privilegio
    
    @privilegio.setter
    def privilegio(self, value:bool):
        if not isinstance(value, bool):
            raise ValueError("O privilégio deve ser booleano")
        self._privilegio = value

    def to_dict(self) -> dict:
        return {
                'n_matricula':self.n_matricula,
                'nome':self.nome,
                'email':self.email,
                'privilegio':self.privilegio
        }

    # Função que cria o chamado de um aluno e retorna
    def criar_chamado(self, titulo:str, descricao:str, datetime:str) -> Chamado:
        pattern = r'^(20|21)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$'
        if not re.match(pattern, datetime):
            raise ValueError('A data deve seguir o formato yyyy-mm-aa')

        chamado = Chamado(titulo, descricao, self.n_matricula, datetime)

        return chamado