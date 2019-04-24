CREATE TABLE usuarios(
	id BIGINT NOT NULL PRIMARY KEY auto_increment,
	nome VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP
);

DESC usuarios;

DROP TABLE usuarios;