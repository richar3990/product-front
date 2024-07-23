import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEditModalComponent } from './producto-edit-modal.component';

describe('ProductoEditModalComponent', () => {
  let component: ProductoEditModalComponent;
  let fixture: ComponentFixture<ProductoEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
