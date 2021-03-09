-- Drop and recreate pins table

DROP TABLE IF EXISTS pins CASCADE;

CREATE TABLE pins(
id SERIAL PRIMARY KEY NOT NULL,
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
picture_url TEXT,
-- lon decimal (18,8),
-- lat decimal (18, 8),
lon FLOAT,
lat FLOAT,
map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
