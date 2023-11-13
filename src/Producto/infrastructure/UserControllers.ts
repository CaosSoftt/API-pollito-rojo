import { Request, Response } from "express";
import { CreateUser } from "../application/CreateUser";
import { GetUser } from "../application/GetUser";
import { GetUserid } from "../application/GetUserid";
import { DelUserId } from "../application/DeleteUser";
import { PutUser } from "../application/PutUser";

export class ProductosController {
  constructor(
    readonly createUser: CreateUser,
    readonly getuser: GetUser,
    readonly getuserid: GetUserid,
    readonly deluserid: DelUserId,
    readonly putuser: PutUser
  ) {}

  put = async (req: Request, res: Response) => {
    try {
      const { Nombre, Correo, Password } = req.body;
      const dataproducto = await this.putuser.putUser(Nombre, Correo, Password);
      res.status(200).json(dataproducto);
    } catch (error) {
      res.status(500).json({ error: "servidor error" });
    }
  };

  deleteById = async (req: Request, res: Response) => {
    try {
      console.log("Este es el producto");
      const { Password } = req.params;
      const consul = await this.deluserid.Userid(String(Password));
      console.log("Esto contiene nuestra base de datos", consul);
      res.status(200).json(consul);
    } catch {
      res.status(500).json({ error: "intenta de nuevo" });
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const consul = await this.getuser.AllProducto();
      console.log("Esto contiene nuestra base de datos");
      res.status(200).json(consul);
    } catch {
      res.status(500).json({ error: "intenta de nuevo" });
    }
  };

  getProductoid = async (req: Request, res: Response) => {
    try {
      console.log("Este es el producto");
      const { Password } = req.params;
      const consul = await this.getuserid.Productoid(String(Password));
      console.log("Esto contiene nuestra base de datos", consul);
      res.status(200).json(consul);
    } catch {
      res.status(500).json({ error: "intenta de nuevo" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { Nombre, Correo, Password } = req.body;

      const onlyLetters = /^[A-Za-z]+$/.test(Nombre);
      if (!onlyLetters) {
        return res
          .status(400)
          .json({ error: "Nombre solo debe llevar Letras" });
      }
      const onlyNumbers = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(Correo);
      if (!onlyNumbers) {
        return res
          .status(400)
          .json({ error: "Correo solo debe tener letras" });
      }
      const onlyPassword = /^[A-Za-z]+$/.test(
        Password
      );
      if (!onlyPassword) {
        return res.status(400).json({
          error:
            "Password solo debe tener estos simbolos ^w+([.-_+]?w+)*@w+([.-]?w+)*(.w{2,10})+$",
        });
      }

      const dataproducto = await this.createUser.createProducto(
        Nombre,
        Correo,
        Password
      );
      res.status(200).json({ message: "Correo registrado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  };
}