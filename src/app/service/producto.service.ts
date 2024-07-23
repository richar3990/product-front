import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8083/products';
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl
    });
  }

  // Método para obtener la lista de productos
  obtenerProductos() {
    return this.axiosInstance.get<any[]>('');
  }

  // Método para agregar un nuevo producto
  agregarProducto(producto: any) {
    return this.axiosInstance.post<any>('', producto);
  }

  // Método para actualizar un producto existente
  actualizarProducto(producto: any) {
    return this.axiosInstance.put<any>(`/${producto.id}`, producto);
  }

  // Método para eliminar un producto
  eliminarProducto(id: number) {
    return this.axiosInstance.delete<void>(`/${id}`);
  }
}
