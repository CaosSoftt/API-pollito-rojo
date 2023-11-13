import { ProductoRepository } from "../domain/User-repository";

export class CreateUser {
  constructor(readonly productoRepository: ProductoRepository) {}
  async createProducto(Nombre: string, Correo: string, Password: string) {
    return this.productoRepository
      .create(Nombre, Correo, Password)
      .then((createProductos) => {
        console.log("Usuario creado");
        return createProductos;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
