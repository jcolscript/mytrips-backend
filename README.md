# MYTRIPS API

> Endpoints REST para as operações da aplicação MyTrips

<div align="center"><img src="logo.png"/></div>

Para atingir os objetivos, essa API deve ter:

- Documentação simples e clara
- Exemplos de Uso
- Alta disponibilidade
- Flexibilidade

### Utilização

#### Instalação

```bash
git clone https://github.com/jcolscript/mytrips-backend.git
cd mytrips-backend
yarn
```

##### Dependencias

###### Banco de dados

Usamos postgres como banco de dados.

```bash
docker run --name mytrips -p 5432:5432 -d -t kartoza/postgis
```

#### Servidor local

Sobe o serverless em modo offline http://localhost:3000
Sobe a api em http://localhost:3333

```bash
adonis serve --dev
```

#### Testes

Validará o código com o ESLint e executará os testes funcionais e unitario

```bash
adonis test
```

#### Artefatos dos testes unitários

[test/unit/](test/unit)

#### Artefatos dos testes de funcionais

[test/functional/](test/functional)

### Outros comandos

##### Validar código com o ESLint

```bash
yarn eslint
```

##### Gerar relatorio coverage

```bash
yarn coverage
```

# v0.1.0 - draft
