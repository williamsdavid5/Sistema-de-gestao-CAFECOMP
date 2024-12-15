import  re

class Transacao:
    def __init__(self,
                 valor:float,
                 data:str,
                 categoria:str,
                 comprovante:str, 
                 descricao:str=None):
        self._id = 0
        self.valor = valor
        self.data = data
        self.categoria = categoria
        self.comprovante = comprovante
        self.descricao = descricao

    @property
    def id(self) -> int:
        return self._id
    
    @id.setter
    def id(self, id):
        if not isinstance(id, int):
            raise TypeError('O id deve ser inteiro')
        self._id = id

    @property
    def data(self) -> str:
        return self._data
    
    @data.setter
    def data(self, data:str):
        pattern = r'^(20|21)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$'
        if not re.match(pattern, data):
            raise ValueError('A data deve seguir o formato yyyy-mm-aa')
        
        self._data = data