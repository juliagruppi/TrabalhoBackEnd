import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";
import { requireSQL } from "../requireSQL";
import { connectionConfig } from "../connectionConfig";

async function insertMensagensAutomaticas() {
  const insertMensagensAutomaticasSql = await requireSQL("insertMensagensAutomaticas.sql");
  const connection = await mysql.createConnection(connectionConfig);

  await connection.query(insertMensagensAutomaticasSql);
  console.log("O conteúdo Inicial foi inserido!");
  connection.destroy();
}

insertMensagensAutomaticas();
