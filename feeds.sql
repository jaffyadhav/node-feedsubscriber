DROP DATABASE IF EXISTS feed_db;
CREATE DATABASE feed_db;

\c feed_db;

CREATE TABLE feed_data (
  ID BIGSERIAL PRIMARY KEY,
  feed_id VARCHAR NOT NULL,
  title TEXT,
  content TEXT,
  link VARCHAR,
  published BIGINT,
  updated BIGINT
);
