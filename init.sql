CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    clearance_level INT NOT NULL
);

INSERT INTO users (first_name, last_name, date_of_birth, email, password, clearance_level)
SELECT
    first_names.first_name,
    last_names.last_name,
    DATE '2000-01-01' + INTERVAL '1' YEAR * FLOOR(RANDOM() * 50) +
    INTERVAL '1' MONTH * FLOOR(RANDOM() * 12) +
    INTERVAL '1' DAY * FLOOR(RANDOM() * 28),
    CONCAT(first_names.first_name, '.', last_names.last_name, '@example.com'),
    'password',
    FLOOR(RANDOM() * 5) + 1
FROM
    (SELECT 'John' AS first_name
     UNION ALL SELECT 'Jane'
     UNION ALL SELECT 'Michael'
     UNION ALL SELECT 'Emily'
     UNION ALL SELECT 'William'
     UNION ALL SELECT 'Olivia'
     UNION ALL SELECT 'James'
     UNION ALL SELECT 'Emma'
     UNION ALL SELECT 'Alexander'
     UNION ALL SELECT 'Sophia') AS first_names,
    (SELECT 'Doe' AS last_name
     UNION ALL SELECT 'Smith'
     UNION ALL SELECT 'Johnson'
     UNION ALL SELECT 'Brown'
     UNION ALL SELECT 'Jones'
     UNION ALL SELECT 'Garcia'
     UNION ALL SELECT 'Martinez'
     UNION ALL SELECT 'Williams'
     UNION ALL SELECT 'Jackson'
     UNION ALL SELECT 'Taylor') AS last_names
LIMIT 20;
