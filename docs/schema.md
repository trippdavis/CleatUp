# Schema Information

## events
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
group_id     | integer   | not null, foreign key (references groups)
title        | string    | not null
description  | text      | not null
time         | time      | not null
location     | string    | not null
image_url    | string    | not null

## groups
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
organizer_id | integer   | not null, foreign key (references users)
title        | string    | not null
description  | text      | not null
image_url    | string    | not null

## joins
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
user_id       | integer   | not null, foreign key (references users)
joinable_id   | integer   | not null, foreign key (references groups or events)
joinable_type | integer   | not null ("group" or "event")

<!--
## interests
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## interestings
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
interest_id       | integer   | not null, foreign key (references interests)
interestable_id   | integer   | not null, foreign key (references users or groups)
interestable_type | string    | not null ("group" or "user") -->

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
