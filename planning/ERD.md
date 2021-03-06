
create table USERS (
id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR(255) NOT NULL,
favourite_id INTEGER REFERENCES favourites(id) ON DELETE CASCADE
)


create table MAPS (
id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR(255) NOT NULL,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
)


create table PINS(
id SERIAL PRIMARY KEY NOT NULL,
title VARCHAR(255)
description TEXT
picture VARCHAR(255)
lon INTEGER
lat INTEGER
map_id FK
user_id  FK 
)


create table FAVOURITES (
  id serial primary key
  user_id FK user
  map_id FK maps 
)
