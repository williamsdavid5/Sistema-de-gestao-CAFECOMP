import re
from turtle import title

class Chamado:
    def __init__(self, titulo:str, descricao:str, user:str, data:str):
        self._id = 0
        self.titulo = titulo
        self.descricao = descricao
        self.user = user
        self.data = data
        self._status = False
    
    @property
    def id(self) -> int:
        return self._id
    
    @id.setter
    def id(self, id):
        if not isinstance(id, int):
            raise TypeError('O id deve ser inteiro')
        self._id = id
        
    @property
    def status(self) -> bool:
        return self._status
    
    @status.setter
    def status(self, status:bool):
        if not isinstance(status, bool):
            raise TypeError('O status deve ser um valor booleano.')
        
        self._status = status

    @property
    def data(self) -> str:
        return self._data
    
    @data.setter
    def data(self, value):
        pattern = r'^(20|21)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$'
        if not re.match(pattern, value):
            raise ValueError('A data deve seguir o formato yyyy-mm-aa')
        
        self._data = value

    def to_dict(self) -> dict: 

        return {
            'id':self.id,
            'titulo':self.titulo,
            'descricao':self.descricao,
            'user':self.user,
            'data':self._data,
            'status':self._status,
        }