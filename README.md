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