# Kumanomi

# requete sql insert hasché

INSERT INTO agents (name) values
(pgp_sym_encrypt('Johny Smith', 'longsecretencryptionkey')),
(pgp_sym_encrypt('Bob Marley', 'longsecretencryptionkey'));

# requete sql get password hasché

SELECT
    CASE
        WHEN EXISTS (
            SELECT pgp_sym_decrypt(name::bytea, 'longsecretencryptionkey')
            FROM agents
            WHERE pgp_sym_decrypt(name::bytea, 'longsecretencryptionkey') = 'Johny Smizth' AND email  = email        )
        THEN 'TRUE'
        ELSE 'FALSE'
    END;



# front todo https://dribbble.com/shots/21594661-Neo-Brutalism-Landing-Page

## TODO

- getTaskFromUserId => middleware isOwner && isClearanceLvl>number

- SECRET_KEY_JWT should be in env variable 

- the role "manager" "reader" should be checked only in the backend

- full read tuto how we extended the REQUEST https://blog.logrocket.com/extend-express-request-object-typescript/

- add buton delete task

- clean code

# later
- manager can assign task

- projects
- comments
- chat