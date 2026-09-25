# SIGOE UI Mobile — contrato da API

> Fonte: backend `luizpicolo/sigoe-3.0`, branch `main`.
> Este documento descreve o contrato observado no código do backend e serve como referência para o frontend mobile.
>
> **Regra de desenvolvimento:** alterações deste trabalho devem ocorrer em branch própria; não fazer commits diretamente em `main`.

## 1. Convenções

### Base URL

O frontend deve usar:

`VITE_API_URL`

com fallback para `http://localhost:3000` em desenvolvimento.

### Autenticação

Após o login, o backend devolve o JWT no header HTTP:

`Authorization: Bearer <token>`

As chamadas autenticadas devem enviar o token no header:

`Authorization: <token>`

O backend também aceita o token JWT para `GET /api/users/validation`.

### Expiração do token

O JWT emitido pelo login possui expiração de **30 minutos**. O mobile deve tratar `401 Unauthorized` de forma centralizada, limpando a sessão e redirecionando para o login.

### Paginação

As listagens usam os parâmetros:

- `page`
- `amount`
- `order`
- `search` quando aplicável

As respostas de listagem normalmente possuem:

```json
{
  "items": [],
  "total": 0
}
```

O nome de `items` varia por recurso: `students`, `incidents`, `users`, `courses` e `school_groups`.

---

## 2. Autenticação

### Login

**POST** `/api/auth/login`

Payload:

```json
{
  "user": {
    "username": "usuario",
    "password": "senha"
  }
}
```

Sucesso: `200`

Resposta:

```json
{
  "user": {},
  "message": "Login realizado com sucesso"
}
```

O JWT vem no header `Authorization` da resposta.

Erros:

- `400` — usuário/senha ausentes ou JSON inválido
- `401` — credenciais inválidas

### Validação

**GET** `/api/users/validation`

Sucesso:

```json
{
  "message": "If you see this, you're in!",
  "user": {}
}
```

Token inválido/ausente: `401`.

### Logout

**DELETE** `/api/auth/logout`

O mobile deve limpar a sessão local mesmo quando a chamada de logout falhar, para evitar manter uma sessão visualmente autenticada.

---

## 3. Dashboard

### Dados

**GET** `/api/dashboard`

Autorização: permissão de leitura de ocorrências.

Resposta:

```json
{
  "by_years": [],
  "by_courses": [],
  "by_type_incident": [],
  "by_sanction": [],
  "by_is_resolved": []
}
```

**Importante:** o backend não fornece, neste endpoint, métricas como “ocorrências de hoje”, “pendências de hoje” ou outros cards arbitrários. O mobile deve renderizar somente dados realmente fornecidos pela API.

---

## 4. Estudantes

### Listagem

**GET** `/api/students`

Parâmetros:

- `page`
- `amount`
- `order`
- `search`

Resposta:

```json
{
  "students": [
    {
      "id": 1,
      "name": "Nome",
      "ra": "RA",
      "enrollment": "Matrícula",
      "course_situation": "..."
    }
  ],
  "total": 1
}
```

A listagem retorna estudantes com situação de curso `5` e respeita o polo do usuário quando aplicável.

### Detalhe

**GET** `/api/students/:id`

Resposta:

```json
{
  "student": {
    "id": 1,
    "name": "Nome",
    "cpf": "...",
    "birth_date": "...",
    "responsible": "...",
    "responsible_contact": "...",
    "contact": "...",
    "ra": "...",
    "enrollment": "...",
    "course_situation": "...",
    "created_at": "...",
    "updated_at": "...",
    "course": {
      "id": 1,
      "name": "...",
      "initial": "...",
      "polo_id": 1,
      "polo": {
        "id": 1,
        "name": "..."
      }
    },
    "school_group": {
      "id": 1,
      "name": "...",
      "identifier": "...",
      "polo_id": 1,
      "polo": {
        "id": 1,
        "name": "..."
      }
    },
    "photo": "..."
  }
}
```

**Não assumir** que este endpoint fornece frequência, notas ou histórico de ocorrências do estudante. Esses dados não fazem parte do JSON produzido pelo controller atual.

### Opções

**GET** `/api/students/options`

Resposta:

```json
{
  "courses": [],
  "school_groups": [],
  "course_situations": []
}
```

### Criar

**POST** `/api/students`

Payload:

```json
{
  "student": {
    "name": "...",
    "cpf": "...",
    "birth_date": "...",
    "responsible": "...",
    "responsible_contact": "...",
    "contact": "...",
    "password": "...",
    "password_confirmation": "...",
    "ra": "...",
    "enrollment": "...",
    "course_situation": "...",
    "course_id": 1,
    "school_group_id": 1
  }
}
```

Sucesso: `201`.

### Atualizar

**PATCH ou PUT** `/api/students/:id`

Payload: `{ "student": { ... } }`.

Se senha não for informada, o backend remove os campos de senha antes de atualizar.

### Excluir

**DELETE** `/api/students/:id`

Sucesso: `204`.

---

## 5. Ocorrências

Este é o módulo prioritário do MVP mobile.

### Listagem

**GET** `/api/incidents`

Parâmetros:

- `page`
- `amount`
- `order`
- `search`

Resposta:

```json
{
  "incidents": [],
  "total": 0
}
```

Usuários com permissão de leitura restrita podem receber somente ocorrências criadas por eles.

### Opções do formulário

**GET** `/api/incidents/options`

Resposta:

```json
{
  "assistants": [],
  "sectors": [],
  "type_incidents": [],
  "student_duties": [],
  "prohibition_and_responsibilities": [],
  "sanctions": []
}
```

`sanctions` pode vir vazio quando o usuário não possui permissão de sanção.

### Detalhe

**GET** `/api/incidents/:id`

Resposta:

```json
{
  "incident": {
    "student": {},
    "course": {},
    "type_incident": {},
    "sector": {},
    "user": {},
    "assistant": {},
    "student_duties": [],
    "prohibition_and_responsibilities": []
  }
}
```

O objeto também contém os atributos próprios da ocorrência.

### Criar

**POST** `/api/incidents`

Payload relevante:

```json
{
  "incident": {
    "type_incident_id": 1,
    "student_id": 1,
    "student_ids": [1],
    "date_incident": "2026-09-25",
    "sector_id": 1,
    "assistant_id": 1,
    "time_incident": "10:30",
    "institution": "...",
    "description": "...",
    "soluction": "...",
    "is_resolved": false,
    "visibility": "public",
    "type_student": "...",
    "sanction": "...",
    "student_duty_ids": [1],
    "prohibition_and_responsibility_ids": [1]
  }
}
```

O backend cria uma ocorrência para cada item de `student_ids`.

Usuários sem permissão de sanção não podem enviar/alterar:

- `soluction`
- `is_resolved`
- `sanction`
- `student_duty_ids`
- `prohibition_and_responsibility_ids`

Sucesso: `201`, com `incidents` no retorno.

### Atualizar

**PATCH ou PUT** `/api/incidents/:id`

Payload: `{ "incident": { ... } }`.

Sucesso:

```json
{
  "incident": {}
}
```

### Excluir

**DELETE** `/api/incidents/:id`

Sucesso: `204`.

---

## 6. Usuários

Módulo previsto para a fase administrativa.

### Listagem

**GET** `/api/users`

Parâmetros:

- `page`
- `order`
- `search`

Resposta:

```json
{
  "users": [],
  "total": 0
}
```

### Detalhe

**GET** `/api/users/:id`

Resposta:

```json
{
  "user": {}
}
```

### Opções

**GET** `/api/users/options`

Resposta atual:

```json
{
  "polos": [
    {
      "id": 1,
      "name": "..."
    }
  ]
}
```

### Criar

**POST** `/api/users`

Payload: `{ "user": { ... } }`.

Campos permitidos incluem:

- `name`
- `siape`
- `username`
- `email`
- `password`
- `password_confirmation`
- `status`
- `avatar`
- `course_id`
- `admin`
- `polo_id`

### Atualizar

**PATCH ou PUT** `/api/users/:id`

Payload: `{ "user": { ... } }`.

### Alterar senha

**PUT** `/api/users/change_password`

Payload:

```json
{
  "current_password": "...",
  "new_password": "...",
  "password_confirmation": "..."
}
```

### Excluir

**DELETE** `/api/users/:id`

O usuário não pode excluir a própria conta.

---

## 7. Permissões

### Permissões atuais

**GET** `/api/permissions/current`

Resposta:

```json
{
  "user": {},
  "admin": false,
  "super_admin": false,
  "entities": [],
  "permissions": {}
}
```

Entidades conhecidas pelo backend:

- `users`
- `students`
- `courses`
- `classes`
- `occurrences`

Ações:

- `can_create`
- `can_read`
- `can_read_restricted`
- `can_update`
- `can_sanction`
- `can_destroy`
- `can_extras`
- `can_export_to_academic_system`

### Permissões de usuário

**GET** `/api/users/:id/permissions`

**PUT** `/api/users/:id/permissions`

Payload:

```json
{
  "permissions": [
    {
      "entity": "students",
      "can_create": true,
      "can_read": true,
      "can_read_restricted": false,
      "can_update": true,
      "can_sanction": false,
      "can_destroy": false,
      "can_extras": false,
      "can_export_to_academic_system": false
    }
  ]
}
```

Somente administradores podem gerenciar permissões.

---

## 8. Cursos

### Listagem

**GET** `/api/courses`

Parâmetros:

- `page`
- `amount`
- `order`
- `search`

Resposta:

```json
{
  "courses": [],
  "total": 0
}
```

### Detalhe

**GET** `/api/courses/:id`

### Criar

**POST** `/api/courses`

Payload:

```json
{
  "course": {
    "name": "...",
    "initial": "...",
    "polo_id": 1
  }
}
```

### Atualizar

**PATCH ou PUT** `/api/courses/:id`

### Excluir

**DELETE** `/api/courses/:id`

---

## 9. Turmas

Recurso chamado `school_groups` na API.

### Listagem

**GET** `/api/school_groups`

Resposta:

```json
{
  "school_groups": [],
  "total": 0
}
```

### Detalhe

**GET** `/api/school_groups/:id`

### Criar

**POST** `/api/school_groups`

Payload:

```json
{
  "school_group": {
    "name": "...",
    "identifier": "...",
    "polo_id": 1
  }
}
```

### Atualizar

**PATCH ou PUT** `/api/school_groups/:id`

### Excluir

**DELETE** `/api/school_groups/:id`

---

## 10. Relatórios de ocorrências

### Opções

**GET** `/api/report_incidents/options`

Resposta:

```json
{
  "students": [],
  "courses": [],
  "school_groups": [],
  "type_incidents": []
}
```

### Dados

**GET** `/api/report_incidents/data`

Obrigatórios:

- `date_start`
- `date_final`

Filtros opcionais:

- `student`
- `course`
- `school_group`
- `type_incident_id`
- `type_student`
- `is_resolved`

Resposta:

```json
[
  {
    "student": "...",
    "course": "...",
    "date_incident": "...",
    "time_incident": "...",
    "type_incident": "...",
    "description": "..."
  }
]
```

Sem resultados: `404`.

### PDF

**POST** `/api/report_incidents`

Usa os mesmos filtros e retorna PDF.

Para o MVP mobile, o endpoint de dados é suficiente para consulta; geração/compartilhamento de PDF pode ficar para a fase administrativa.

---

## 11. Tratamento de erros

O mobile deve normalizar pelo menos:

- `400` — requisição inválida
- `401` — sessão inválida/expirada
- `403` — sem permissão
- `404` — recurso não encontrado
- `422` — validação/regra de negócio
- `500` — erro inesperado

Formato comum de validação:

```json
{
  "errors": [
    "Mensagem de erro"
  ]
}
```

Alguns endpoints usam:

```json
{
  "error": "Mensagem de erro"
}
```

O service layer deve converter ambos para uma estrutura consistente para as views.

---

## 12. Decisões de implementação do mobile

### Cliente HTTP

Criar um único cliente Axios em `src/services/api.js`:

- `baseURL` via `VITE_API_URL`
- interceptor para adicionar JWT
- interceptor de `401`
- normalização de erros
- timeout configurável

As views não devem conhecer URLs da API.

### Organização

```text
src/services/
├── api.js
├── authentication/
│   └── index.js
├── dashboard/
│   └── index.js
├── students/
│   └── index.js
├── incidents/
│   └── index.js
├── users/
│   └── index.js
├── permissions/
│   └── index.js
├── courses/
│   └── index.js
├── school-groups/
│   └── index.js
└── reports/
    └── incidents.js
```

### MVP

Implementar primeiro:

1. Login
2. Validação de sessão
3. Dashboard
4. Ocorrências — listar
5. Ocorrências — criar
6. Ocorrências — visualizar
7. Ocorrências — editar
8. Estudantes — buscar/listar
9. Estudantes — visualizar
10. Perfil — alterar senha/sair

Administração, permissões, cursos, turmas e relatórios ficam para a segunda etapa.

### Regra arquitetural

Não criar endpoint “mobile”.

O mobile e o desktop devem consumir os mesmos recursos `/api/*`. Diferenças de experiência devem ficar na camada de apresentação.

