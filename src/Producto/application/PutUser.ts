import { ProductoRepository } from "../domain/User-repository";

export class PutUser {
  constructor(readonly productoRepository: ProductoRepository) {}
  async putUser(Nombre: string, Correo: string, Password: string) {
    return this.productoRepository
      .putUser(Nombre, Correo, Password)
      .then((createProductos) => {
        console.log(createProductos);
        return createProductos;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
