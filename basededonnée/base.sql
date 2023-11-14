CREATE TABLE
    roles (
        id SERIAL NOT NULL,
        label varchar(255) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    utilisateurs (
        id varchar(255) NOT NULL,
        nom varchar(255) NOT NULL,
        prenom varchar(255),
        username VARCHAR(255),
        fonction varchar(255) NOT NULL,
        email varchar(255),
        motdepasse varchar(500) NOT NULL,
        autorisation int4 NOT NULL,
        PRIMARY KEY (id)
    );
CREATE TABLE substances (
    id serial not null PRIMARY key,
    nom VARCHAR(500)
);
CREATE TABLE lessubstances (
    id serial not null PRIMARY key,
    nom VARCHAR(500)
);