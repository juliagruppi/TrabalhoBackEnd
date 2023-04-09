drop table if exists mensagens;

drop table if exists historicoAtendimentos;

drop table if exists mensagensAutomaticas;

drop table if exists iniciarBot;

drop table if exists protocolos;


CREATE TABLE iniciarBot (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
mensagem VARCHAR(5000) NOT NULL);

CREATE TABLE protocolos (
    protocolo int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nomeProtocolo VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT NOW()
);

CREATE TABLE mensagens (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
mensagemCliente VARCHAR(255) NOT NULL,
mensagemAutomatica VARCHAR(5000) NOT NULL
);

CREATE TABLE historicoAtendimentos (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
mensagemCliente VARCHAR(255) NOT NULL,
mensagemAutomatica VARCHAR(5000) NOT NULL,
numeroProtocolo INT NOT NULL,
FOREIGN KEY (numeroProtocolo) REFERENCES protocolos (protocolo) on delete cascade 
);

CREATE TABLE mensagensAutomaticas (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
mensagemAutomatica VARCHAR(5000) NOT NULL 
);

