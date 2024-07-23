import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoEditModalComponent } from './producto-edit-modal/producto-edit-modal.component';
import { ProductoModalComponent } from './producto-modal/producto-modal.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ProductoService } from './service/producto.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class AppComponent {
  productos: any[] = [];

  constructor(public dialog: MatDialog, private productoService: ProductoService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.obtenerProductos()
      .then(response => {
        this.productos = response.data;
      })
      .catch(err => console.error('Error al cargar productos', err));
  }

  crearNuevoProducto() {
    const dialogRef = this.dialog.open(ProductoEditModalComponent);

    dialogRef.afterClosed().subscribe(producto => {
      if (producto) {
        this.productoService.agregarProducto(producto)
          .then((response: { data: any }) => {
            this.productos.push(response.data);
          })
          .catch((err: any) => console.error('Error al agregar producto', err));
      }
    });
  }

  editarRegistro(id: string) {
    // Busca el producto usando el id como string
    const producto = this.productos.find(p => p.id === id);
    
    if (producto) {
      // Abre el modal con el producto encontrado
      const dialogRef = this.dialog.open(ProductoEditModalComponent, {
        data: producto
      });
  
      // Actualiza el producto en el array después de cerrar el modal
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Envía la solicitud PUT para actualizar el producto en la API
          this.productoService.actualizarProducto(result)
            .then(() => {
              const index = this.productos.findIndex(p => p.id === result.id);
              if (index !== -1) {
                this.productos[index] = result; // Actualiza el producto en la lista
              }
            })
            .catch((err: any) => console.error('Error al actualizar producto', err));
        }
      });
    }
  }
  
  eliminarRegistro(id: number, name: string) {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar el producto: ' + name + '?');
    if (confirmar) {
      this.productoService.eliminarProducto(id)
        .then(() => {
          // Elimina el producto de la lista local solo si la eliminación en la API es exitosa
          this.productos = this.productos.filter(producto => producto.id !== id);
          alert('Registro con ID ' + id + ' eliminado.');
        })
        .catch((err: any) => console.error('Error al eliminar producto', err));
    }
  }

  verDetalles(id: number) {
    alert('Ver detalles del registro con ID: ' + id);
    // Aquí puedes agregar la lógica para ver los detalles del registro
  }
}
