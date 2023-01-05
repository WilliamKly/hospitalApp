# HMAPP

```API USAGE EXAMPLES```

### Preciso de um endpoint para pegar os GRUPOS
#### GET - /api/groups
#### Response

```
[
  "Escala",
  "Atendimento",
  "Sobre",
  "Contato"
]
```


### Preciso de um endpoint para pegar os MÉDICOS
#### GET - /api/medicos
#### Response

```
[
  {
    "id": 1,
    "name": "Wiliam klywerston",
    "crm": "12312345651",
    "initialAttendence": "2022-08-23 07:00:00",
    "finalAttendence": "2022-09-23 07:00:00",
    "group": "Escala",
    "created_at": "2022-08-23 11:12:32",
    "updated_at": "2022-08-23 11:12:32"
  },
  {
    "id": 2,
    "name": "Isael Silva",
    "crm": "45687984121",
    "initialAttendence": "2022-10-23 07:00:00",
    "finalAttendence": "2022-11-23 07:00:00",
    "group": "Escala",
    "created_at": "2022-08-23 11:12:32",
    "updated_at": "2022-08-23 11:12:32"
  },
]
```