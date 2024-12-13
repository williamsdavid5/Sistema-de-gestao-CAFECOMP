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