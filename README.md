# API DOCUMENTATION

## /registro

### POST: /registro (criação do registro)

para criar um registro, o frontend deve enviar uma requisição com o seguinte body:

```json
  {
    "curso": "NOME_DO_CURSO", # o nome deve seguir um snake case com todas as letras maiúsculas
    "registros": [{
      "tipo": "TIPO_REGISTRO", # mesma convenção do nome do curso.
      "quantidade": quantidade, # um double
      "unidade": "G ou U" # G = gramas, U = unidade
    },
    {
      ...
    },
    ...]
  }
```
