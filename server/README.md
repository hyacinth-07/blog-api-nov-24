# SCHEMAS

## User

- id
- name
- email
- password
- author (bool)
- posts? []
- comments? []

## Post

- id
- title
- body
- author (user)
- isPublished (bool)
- createdAt
- updatedAt
- comments []

## Comment

- id
- body
- author (user)
- likes
- dislikes
- createdAt
- updatedAt
