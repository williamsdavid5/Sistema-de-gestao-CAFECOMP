import re

class Chamado:
    def __init__(self, titulo:str, descricao:str, user:str, data_public:str):
        self._id = 0
        self.titulo = titulo
        self.descricao = descricao
        self.user = user
        self.data_public = data_public
        self._status = 0
    
    @property
    def id(self) -> int:
        return self._id
    
    @id.setter
    def id(self, id):
        if not isinstance(id, int):
            raise TypeError('O id deve ser inteiro')
        self._id = id
        
    @property
    def status(self) -> int:
        return self._status
    
    @status.setter
    def status(self, status:int):
        if not isinstance(status, int):
            raise TypeError('O status deve ser um valor inteiro.')
        
        if status < 0 or 2 < status:
            raise ValueError('O valor do status deve ser 1, 2 o 3.')
        
        self._status = status

    @property
    def data_public(self) -> str:
        return self._data_public
    
    @data_public.setter
    def data_public(self, value):
        pattern = r'^(20|21)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$'
        if not re.match(pattern, value):
            raise ValueError('A data deve seguir o formato yyyy-mm-aa')
        
        self._data_public = value