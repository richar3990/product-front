import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-producto-modal',
  standalone: true,
  templateUrl: './producto-modal.component.html',
  styleUrls: ['./producto-modal.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ]
})
export class ProductoModalComponent {
  producto = { nombre: '', descripcion: '', precio: 0 };

  constructor(public dialogRef: MatDialogRef<ProductoModalComponent>) {}

  guardar() {
    console.log('Producto guardado:', this.producto);
    this.dialogRef.close(this.producto);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
