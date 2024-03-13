INSERT INTO users (first_name, last_name, date_of_birth, email, password, clearance_level, profil_img)
VALUES
  ('Frodo', 'Baggins', '1995-09-22', 'frodo@lotr.com', (pgp_sym_encrypt('password', 'kumanomi_secret_key')), 1, 'frodo.jpg'),
  ('Aragorn', 'Elessar', '1870-03-15', 'aragorn@lotr.com', (pgp_sym_encrypt('password', 'kumanomi_secret_key')), 2,null),
  ('Legolas', 'Greenleaf', '1685-07-12', 'legolas@lotr.com', (pgp_sym_encrypt('password', 'kumanomi_secret_key')), 3, null),
  ('Gandalf', 'The Grey', '0001-01-01', 'gandalf@lotr.com', (pgp_sym_encrypt('password', 'kumanomi_secret_key')), 4,'gandalf.jpg'),
  ('Radagast', 'The Brown', '0001-01-01', 'radagastf@lotr.com', (pgp_sym_encrypt('password', 'kumanomi_secret_key')), 4,'radagast.jpg'),
  ('Gimli', 'Son of Gloin', '1980-11-05', 'gimli@lotr.com', (pgp_sym_encrypt('password', 'kumanomi_secret_key')), 2,'not_found_img.jpg'),
  ('Smaug', 'The Dragon', '1000-10-10', 'smaug@lotr.com', (pgp_sym_encrypt('password', 'kumanomi_secret_key')), 2, 'smaug.jpg');

INSERT INTO projects (name, description, deadline, user_admin_id)
VALUES
  ('Ring Quest', 'Destroy the One Ring and save Middle-earth', '2024-12-31', 1),
  ('Gondor Restoration', 'Rebuilding after the War of the Ring', '2025-06-30', 2),
  ('Elven Fellowship', 'Maintaining peace and unity among elves', '2024-10-15', 3),
  ('Wizardry Studies', 'Exploring the mysteries of magic', '2025-03-01', 4),
  ('Dwarven Expeditions', 'Venturing into the depths of Khazad-dûm', '2024-11-20', 5);

INSERT INTO roles (role) VALUES
  ('viewer'),
  ('contributor'),
  ('admin');

INSERT INTO project_members (project_id, user_id, role_id) VALUES
  -- project ring quest
  (1, 1, 2), (1, 4, 3),

  -- project Dwarven Expeditions
  (5, 3, 1), (5, 6, 2);


INSERT INTO task_status (status) VALUES
  ('pending'),
  ('in-progress'),
  ('blocked'),
  ('done');

-- Insert tasks for the 'Ring Quest' project
INSERT INTO tasks (description, deadline, project_id, status_id, priority, project_member_id) VALUES
  ('Destroy the One Ring', '2024-12-20', 1, 1, 1, 1),
  ('Reach Mount Doom', '2024-12-25', 1, 2, 2, null),
  ('Return to the Shire', '2025-01-10', 1, 3, 3, 2);


INSERT INTO task_comments (task_id, user_id, content) VALUES
  (1, 1, 'frere jai mal aux pieds'),
  (1,4, 'in Miami, living the best time of my life '),
  (3,1, 'will probably be dead at this points.');

  INSERT INTO project_comments (project_id, user_id, content) VALUES
  (1, 4, 'lol i dont know what im doing here'),
  (5,3, 'in Miami, living the best time of my life'),
  (5,3, 'will probably be dead at this points.');