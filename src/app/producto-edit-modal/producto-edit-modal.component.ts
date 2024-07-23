import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-producto-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './producto-edit-modal.component.html',
  styleUrl: './producto-edit-modal.component.css'
})
export class ProductoEditModalComponent {
  producto: any;
  constructor(
    public dialogRef: MatDialogRef<ProductoEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.producto = { ...data }; // Clona los datos del producto
  }
  guardar() {
    this.dialogRef.close(this.producto);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
