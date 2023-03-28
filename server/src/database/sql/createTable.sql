drop table if exists mensagens;

drop table if exists historicoConversa;

drop table if exists mensagensAutomaticas;


CREATE TABLE mensagens (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
mensagem VARCHAR(255) NOT NULL,
created_at DATETIME DEFAULT NOW() 
);

CREATE TABLE historicoConversa (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
mensagemCliente VARCHAR(255) NOT NULL,
mensagemAutomatica VARCHAR(5000) NOT NULL,
created_at DATETIME DEFAULT NOW() 
);

CREATE TABLE mensagensAutomaticas (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
mensagemAutomatica VARCHAR(5000) NOT NULL 
);

