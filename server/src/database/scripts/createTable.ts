import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";
import { requireSQL } from "../requireSQL";
import { connectionConfig } from "../connectionConfig";

async function createTables() {
  const createTablesSql = await requireSQL("createTable.sql");
  const connection = await mysql.createConnection(connectionConfig);

  await connection.query(createTablesSql);
  console.log("As tabelas foram criadas com sucesso!");
  connection.destroy();
}

createTables();
