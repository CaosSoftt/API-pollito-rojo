import { database } from "./Database";
import { Producto } from "../domain/ProducUser";
import { ProductoRepository } from "../domain/User-repository";
import { QueryError } from "mysql2";

export class productoRepositori implements ProductoRepository {
  async putUser(
    Nombre: string,
    Correo: string,
    Password: string
  ): Promise<Producto> {
    const mysql = new database();
    return await new Promise((resolve, reject) => {
      const sql = `UPDATE caosdb.users SET Nombre='${Nombre}', Correo='${Correo}' WHERE Password='${Password}'`;
      mysql.connection.query(sql, (error: QueryError, results: Producto) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  async deleteById(Password: string): Promise<Producto | null> {
    const mysql = new database();
    return await new Promise((resolve, reject) => {
      mysql.connection.query(
        `DELETE FROM caosdb.users WHERE Password = '${Password}'`,
        (error: QueryError, rows: Producto) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }
  async getById(Password: string): Promise<Producto | null> {
    const mysql = new database();
    return await new Promise((resolve, reject) => {
      mysql.connection.query(
        `SELECT * FROM caosdb.users WHERE Password = '${Password}';`,
        (error: QueryError, rows: Producto) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }
  async getUser(): Promise<Producto[] | null> {
    const mysql = new database();
    return await new Promise((resolve, reject) => {
      mysql.connection.query(
        "SELECT * FROM caosdb.users",
        (error: QueryError, rows: Producto[]) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }
  async create(
    Nombre: string,
    Correo: string,
    Password: string
  ): Promise<Producto> {
    const mysql = new database();
    return await new Promise((resolve, reject) => {
      const sql = `INSERT INTO caosdb.users(Nombre,Correo,Password) VALUES ('${Nombre}','${Correo}','${Password}')`;
      mysql.connection.query(sql, (error: QueryError, results: Producto) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}
