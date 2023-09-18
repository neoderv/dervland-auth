CREATE TABLE IF NOT EXISTS auth (username TEXT, password TEXT, ip TEXT, valid TEXT);
CREATE TABLE IF NOT EXISTS token (username TEXT, token TEXT, scope TEXT);