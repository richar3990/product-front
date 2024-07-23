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
  productos = [
    { id: 1, orden: 1, nombre: 'Producto 1', descripcion: 'Descripción Producto 1', precio: 100 },
    { id: 2, orden: 2, nombre: 'Producto 2', descripcion: 'Descripción Producto 2', precio: 500 }
  ];

  constructor(public dialog: MatDialog) {}

  crearNuevoProducto() {
    const dialogRef = this.dialog.open(ProductoModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productos.push(result);
      }
    });
  }
  editarRegistro(id: number) {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      const dialogRef = this.dialog.open(ProductoEditModalComponent, {
        data: producto
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const index = this.productos.findIndex(p => p.id === result.id);
          if (index !== -1) {
            this.productos[index] = result;
          }
        }
      });
    }
  }
  eliminarRegistro(id: number) {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar el registro con ID: ' + id + '?');
    if (confirmar) {
      this.productos = this.productos.filter(producto => producto.id !== id);
      alert('Registro con ID ' + id + ' eliminado.');
    }
  }

  verDetalles(id: number) {
    alert('Ver detalles del registro con ID: ' + id);
    // Aquí puedes agregar la lógica para ver los detalles del registro
  }
}
