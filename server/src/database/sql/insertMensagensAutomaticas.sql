TRUNCATE TABLE mensagensAutomaticas;
TRUNCATE TABLE iniciarBot;

INSERT INTO iniciarBot (mensagem)
VALUES ("Olá mana! Tudo bem? Me chamo Lívia e sou sua assistente virtual do Ajeita Menina.");
INSERT INTO iniciarBot (mensagem)
VALUES ("Vou te apresentar um poquinho do nosso projeto. Acreditamos que não existe “trabalho de homem” ou “trabalho de mulher”, mas sim que todos podemos aprender tudo aquilo que queremos. Frequentemente as mulheres são desencorajadas  a aprender reparos domésticos, visto como atividades masculinas. Entretanto, muitas mulheres que moram sozinhas se sentem inseguras de contratar homens para fazer reparos em casa.E porque não sermos cada vez mais antonomas, hein? ");
INSERT INTO iniciarBot (mensagem)
VALUES ("Por isso, quero te auxiliar a fazer pequenos reparos domésticos, com simplicidade e confiança. Vamos lá?!!");
INSERT INTO iniciarBot (mensagem)
VALUES ("Como posso te ajudar? (Digite o número da opção desejada)
    1 - Reparos elétricos 2 - Reparos Hidraúlicos 3 - Jardinagem 4 - Marcenaria");

INSERT INTO mensagensAutomaticas (mensagemAutomatica)
VALUES ('Muito bem! Temos vários cursos e vídeos rápidos para te auxiliar em pequenos reparos elétricos, para isso basta acessar nosso site: www.ajeita-mulher/reparos-eletricos.');

INSERT INTO mensagensAutomaticas (mensagemAutomatica)
VALUES ('Muito bem! Temos vários cursos e vídeos rápidos para te auxiliar em pequenos hidraúlicos, para isso basta acessar nosso site: www.ajeita-mulher/reparos-hidraulicos.');

INSERT INTO mensagensAutomaticas (mensagemAutomatica)
VALUES ('Muito bem! Temos vários cursos e vídeos rápidos para te auxiliar cuidar das suas plantas e deixar sua casa ainda mais linda, para isso basta acessar nosso site: www.ajeita-mulher/jardinagem.');

INSERT INTO mensagensAutomaticas (mensagemAutomatica)
VALUES ('Muito bem! Temos vários cursos e vídeos rápidos para te auxiliar com marcenaria, para isso basta acessar nosso site: www.ajeita-mulher/marcenaria.');