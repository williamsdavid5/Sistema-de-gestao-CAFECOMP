# 🛠️ Sistema-de-gestao-CAFECOMP
Um sistema simples de gestão do CAFECOMP (Centro acadêmico de engenharia de computação) da UFPA-CAMTUC

## 🔍 Resumo dos componentes
<table>
  <tr>
    <th>Componente</th>
    <th>Tecnologia</th>
    <th>Propósito</th>
  </tr>
  <tr>
    <td>backend</td>
    <td>Python + Flask</td>
    <td>API REST, gerenciamento de rotas e lógica</td>
  </tr>
  <tr>
    <td>ORM</td>
    <td>SQLAlchemy + SQLite</td>
    <td>Mapeamento objeto-relacional, banco leve</td>
  </tr>
  <tr>
    <td>Interface Web</td>
    <td>Jinja2 + JS/CSS</td>
    <td>Frontend dinâmico e responsivo</td>
  </tr>
  <tr>
    <td>Testes</td>
    <td>Python puro</td>
    <td>Verificação básica de funcionalidades</td>
  </tr>
</table>

## 🧩 Detalhe das camadas
<ul>
  <li><strong> Rotas (routes/):</strong> Responsáveis por receber requisições HTTP e devolver respostas ou renderizar páginas.</li>
  <li><strong> Modelos & ORM (src/):</strong> Mapeamento de tabelas via SQLAlchemy, abstração do acesso ao banco.</li>
  <li><strong> Templates (templates/):</strong> Páginas HTML dinâmicas com Jinja2 para interação com o usuário.</li>
  <li><strong> Estático (static/):</strong> Arquivos para interface, scripts e estilos.</li>
</ul>

## 🚀 Instalação & Execução
1. Clone o repositório e acesse a pasta:
```
git clone https://github.com/williamsdavid5/Sistema-de-gestao-CAFECOMP.git
cd Sistema-de-gestao-CAFECOMP
```

2. Instale as dependências:
```
pip install -r requirements.txt
```

3. Crie o arquivo (database\config_db.py) para carregar as variáveis de ambiente:
```
config = {
    "host": "",
    "user": "",
    "password": "",
    "port": 3306,  # Porta padrão do MySQL
}
```

4. Execute o arquivo main:
```
python main.py
```
