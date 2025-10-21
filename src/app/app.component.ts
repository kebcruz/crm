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
    { ruta: '/empleado', texto: 'Empleados' },
    { ruta: '/tabs/tab2', texto: 'Tab 2' },
    { ruta: '/tabs/tab3', texto: 'Tab 3' },
    { ruta: '/tabs/nueva', texto: 'Nueva' },
    { ruta: '/tabs/tab1/siguiente', texto: 'Siguiente' }
  ];
}
