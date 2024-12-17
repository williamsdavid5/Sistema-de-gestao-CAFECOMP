import  re

class Transacao:
    def __init__(self,
                 valor:float,
                 data:str,
                 categoria:str,
                 comprovante:str, 
                 descricao:str=None):
        self.__id = 0
        self.valor = valor
        self.date_time = data
        self.categoria = categoria
        self.comprovante = comprovante
        self.descricao = descricao

    @property
    def id(self) -> int:
        return self.__id
    
    @id.setter
    def id(self, id):
        if not isinstance(id, int):
            raise TypeError('O id deve ser inteiro')
        self.__id = id

    @property
    def date_time(self) -> str:
        return self.__date_time
    
    @date_time.setter
    def date_time(self, data:str):
        pattern = r'^(20|21)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$'
        if not re.match(pattern, data):
            raise ValueError('A data deve seguir o formato yyyy-mm-aa')
        
        self.__date_time = data
    
    def to_dict(self) -> dict: 
        return {
            'id':self.__id,
            'valor':self.valor,
            'date-time':self.__date_time,
            'categoria':self.categoria,
            'comprovante':self.comprovante,
            'descricao':self.descricao
        }