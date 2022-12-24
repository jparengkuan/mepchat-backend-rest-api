# Endpoints

| Title            | method | link               | body                                                                                                                                                        |
|------------------|--------|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Get recipe       | GET    | /api/recipes/{id}  |                                                                                                                                                             |
| Get all recipes  | GET    | /api/recipes/      |                                                                                                                                                             |
| Create recipe    | POST   | /api/recipes/      | required: { "title": string, "volume": string, "preparation": string, "unit": string}<br/> Optional: {feature: string, archived_at: Date, deleted_at: Date} |
| Delete recipe    | DELETE | /api/recipes/{id}  |                                                                                                                                                             |
| Patch  recipe    | PATCH  | /api/recipes/{id}  | everything is optional (check create request)                                                                                                               |
| 
| Get meplist      | GET    | /api/meplist/{id}  |                                                                                                                                                             |
| Get all meplists | GET    | /api/meplist/      |                                                                                                                                                             |
| Create meplist   | POST   | /api/meplist/      | required: { "title": string, "active": boolean, "owner_id": string (user id)                                                                                |
| Delete meplist   | DELETE | /api/meplist/{id}  |                                                                                                                                                             |
| Patch  meplist   | PATCH  | /api/meplist/{id}  | everything is optional (check create request)                                                                                                               | 
|                  |        |                    |                                                                                                                                                             |
| Create team      | POST   | /api/teams/new     | required ( "name": string }                                                                                                                                 |
| Add user to team | POST   | /api/teams/addUser | required ( "teamName": string, "userId": string }                                                                                                           |
|
