
create table USERS (
id serial primary key
username
favourites - FK favourites id
)




create table MAPS (
id serial primary key
name
user_id FK

)




create table PINS(
id serial primary key
map_id FK
user_id  FK 
)

create table FAVOURITES (
  id serial primary key
  user_id FK user
  map_id FK maps 
)
