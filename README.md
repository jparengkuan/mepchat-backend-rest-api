# Endpoints

Title           | method | link              | body
--------------- | ------ | ----------------- | -----------------------------------------------------------------------------------------
### Recipes     |        |                   |
Get recipe      | GET    | /api/recipes/{id} |
Get all recipes | GET    | /api/recipes/     |
Create recipe   | POST   | /api/recipes/     | required: { "title": string, "volume": string, "preparation": string, "unit": string}<br>

Optional: {feature: string, archived_at: Date, deleted_at: Date} Delete recipe | DELETE | /api/recipes/{id} | Patch recipe | PATCH | /api/recipes/{id} | everything is optional (check create request) | | |

## RecipeCategory | | |

Get recipeCategory | GET | /api/recipeCategory/{id} | Get all recipeCategories | GET | /api/recipeCategory/ | Create recipeCategory | POST | /api/recipeCategory/ | required: { "title": string }, optional: {"recipes": string[], deleted_at: Date, archived_at: Date } Delete recipeCategory | DELETE | /api/recipeCategory/{id} | Patch recipeCategory | PATCH | /api/recipeCategory/{id} | everything is optional (check create request) | | |

## Meplists | | |

Get meplist | GET | /api/meplist/{id} | Get all meplists | GET | /api/meplist/ | Create meplist | POST | /api/meplist/ | required: { "title": string, "active": boolean, "owner_id": string (user id) Delete meplist | DELETE | /api/meplist/{id} | Patch meplist | PATCH | /api/meplist/{id} | everything is optional (check create request) | | | | | |

## MepTasks | | |

Get mepTask | GET | /api/meptask/{id} | Get all mepTasks | GET | /api/meptask/ | Create mepTask | POST | /api/meptask/ | required: { "title": string, "due_datetime": Date, "duration": number (in minutes), mepList_id: ObjectId ({"_id": "63a74e38c19d3604d7145baa"})} Optional: {description: string, status: string, recipe_id: ({"_id": "63a74e38c19d3604d7145baa"})} Delete mepTask | DELETE | /api/meptask/{id} | Patch mepTask | PATCH | /api/meptask/{id} | everything is optional (check create request) | | |

## Ingredients | | |

Get ingredient | GET | /api/ingredient/{id} | Get all ingredients | GET | /api/ingredient/ | Create ingredient | POST | /api/ingredient/ | required: { "title": string, "unit": string }, optional: {"allergy": string, "ingredients": string[]} Delete ingredient | DELETE | /api/ingredient/{id} | Patch ingredient | PATCH | /api/ingredient/{id} | everything is optional (check create request) | | |

## Dishes | | |

Get dish | GET | /api/dish/{id} | Get all dishes | GET | /api/dish/ | Create dish | POST | /api/dish/ | required: { "title": string }, optional: {"description": string, "image": string, "feature": string} Delete dish | DELETE | /api/dish/{id} | Patch dish | PATCH | /api/dish/{id} | everything is optional (check create request) | | |

## DishCategory | | |

Get dishCategory | GET | /api/dishCategory/{id} | Get all dishCategories | GET | /api/dishCategory/ | Create dishCategory | POST | /api/dishCategory/ | required: { "title": string }, optional: {"dishes": string[], deleted_at: Date, archived_at: Date } Delete dishCategory | DELETE | /api/dishCategory/{id} | Patch dishCategory | PATCH | /api/dishCategory/{id} | everything is optional (check create request) | | |

## Teams | | |

Create team | POST | /api/teams/ | required { "name": string } Delete user from team | DELETE | /api/teams/deleteUser | required { "teamName": string, "email": string } Add user to team | POST | /api/teams/addUser | required { "teamName": string, "email": string } Get all teams | GET | /api/teams/ | Get team | GET | /api/teams/{id} | Delete team | DELETE | /api/teams/{id}/ | | | | |

## User | | |

Register | POST | /api/auth/register | required: { "firstname": string, "lastname": "string", "email": string, "password" string,"passwordConfirm": string, "company": string } Login | POST | /api/auth/login | required: { "email": string, "password": string } | | |

## User roles | | |

Create role | GET | /api/user/roles/ | required: { "name": string } optional: {"description": string } Delete role | GET | /api/user/roles/{id} | required: { "id": string }
