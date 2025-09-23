import { DataSource } from "typeorm";
import { Fornecedor } from "../models/fornecedor";

export const DevDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "unifan",
    password: "Unifan25!@#",
    database: "grupo_01",
    entities: [Fornecedor]
})