-- example seeds

INSERT INTO pins (title, description, picture_url, lon, lat, map_id, user_id)
VALUES ()


CREATE TABLE pins(
id SERIAL PRIMARY KEY NOT NULL,
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
picture_url TEXT,
lon INTEGER NOT NULL,
lat INTEGER NOT NULL,
map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
