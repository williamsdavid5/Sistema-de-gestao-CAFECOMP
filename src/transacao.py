class Transacao:
    def __init__(self,
                 id:int,
                 valor:float,
                 data:str,
                 categoria:str,
                 comprovante:str, 
                 descricao:str=None):
        self._id = id
        self.valor = valor
        self.data = data
        self.categoria = categoria
        self.comprovante = comprovante
        self.descricao = descricao