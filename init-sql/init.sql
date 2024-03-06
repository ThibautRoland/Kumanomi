create extension if not exists pgcrypto;

-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    clearance_level INT NOT NULL
);

-- PROJECTS
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    deadline DATE NOT NULL,
    user_admin_id INT NOT NULL REFERENCES users(id)
);

-- ROLES
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE project_members (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES projects(id),
    user_id INT NOT NULL REFERENCES users(id),
    role_id INT NOT NULL REFERENCES roles(id)
);

-- TASKS
CREATE TABLE task_status (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    deadline DATE,
    project_id INT NOT NULL REFERENCES projects(id),
    status_id SMALLINT NOT NULL REFERENCES task_status(id),
    priority SMALLINT,
    project_member_id INT REFERENCES project_members(id)
);


-- COMMENTS
CREATE TABLE task_comments (
    id SERIAL PRIMARY KEY,
    task_id INT NOT NULL REFERENCES tasks(id),
    user_id INT NOT NULL REFERENCES users(id),
    content VARCHAR(255) NOT NULL
);

CREATE TABLE project_comments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    project_id INT NOT NULL REFERENCES projects(id),
    content VARCHAR(255) NOT NULL
);