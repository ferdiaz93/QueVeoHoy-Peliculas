CREATE DATABASE queveohoy;
USE queveohoy;

CREATE TABLE pelicula (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    duracion INT(5),
    director VARCHAR(400),
    anio INT(5),
    fecha_lanzamiento DATE,
    puntuacion INT(2),
    poster VARCHAR(300),
    trama VARCHAR(700),
    genero_id INT,
    
    PRIMARY KEY (id),

    FOREIGN KEY (genero_id)
        REFERENCES genero (id)
        ON DELETE CASCADE
);

CREATE TABLE genero (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE actor (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(70) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE actor_pelicula (
    id INT NOT NULL AUTO_INCREMENT,
    actor_id INT NOT NULL,
    pelicula_id INT NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (actor_id)
        REFERENCES actor (id),

    FOREIGN KEY (pelicula_id)
        REFERENCES pelicula (id)
);