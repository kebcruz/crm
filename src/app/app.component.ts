import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {}

  enlaces:any = [
    { ruta: '/archivo', texto: 'Archivos' },
    { ruta: '/categoria', texto: 'Categorias' },
    { ruta: '/cliente', texto: 'Clientes' },
    { ruta: '/cliente-etiqueta', texto: 'Cliente Etiqueta' },
    { ruta: '/color', texto: 'Colores' },
    { ruta: '/devolucion', texto: 'Devoluciones' },
    { ruta: '/domicilio', texto: 'Domicilios' },
    { ruta: '/estado', texto: 'Estados' },
    { ruta: '/etiqueta', texto: 'Etiquetas' },
    { ruta: '/producto', texto: 'Productos' },
    { ruta: '/puesto', texto: 'Puestos' },
    { ruta: '/empleado', texto: 'Empleados' },
  ];
}
