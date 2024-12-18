import re

class Aviso:
    def __init__(self, 
                 titulo:str,
                 subtitulo:str,
                 texto:str, 
                 data:str, 
                 imagens:str = None):
        self._id = 0
        self.titulo = titulo
        self.subtitulo = subtitulo
        self.texto = texto
        self.data = data
        self.imagens = imagens

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
        return self.__date_time
    
    @data.setter
    def data(self, value):
        pattern = r'^(20|21)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$'
        if not re.match(pattern, value):
            raise ValueError('A data deve seguir o formato yyyy-mm-dd')
        
        self.__date_time = value

    def to_dict(self) -> dict: 
        return {
            'id':self.id,
            'titulo':self.titulo,
            'subtitulo':self.subtitulo,
            'texto':self.texto,
            'data':self.data,
            'imgens':self.imagens,
        }