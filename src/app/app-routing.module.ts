import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'color',
    loadChildren: () => import('./color/color.module').then( m => m.ColorPageModule)
  },
  {
    path: 'pais',
    loadChildren: () => import('./pais/pais.module').then( m => m.PaisPageModule)
  },
  {
    path: 'estado',
    loadChildren: () => import('./estado/estado.module').then( m => m.EstadoPageModule)
  },
  {
    path: 'municipio',
    loadChildren: () => import('./municipio/municipio.module').then( m => m.MunicipioPageModule)
  },
  {
    path: 'cliente-etiqueta',
    loadChildren: () => import('./cliente-etiqueta/cliente-etiqueta.module').then( m => m.ClienteEtiquetaPageModule)
  },
  {
    path: 'domicilio',
    loadChildren: () => import('./domicilio/domicilio.module').then( m => m.DomicilioPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'cliente-detalle/:cli_id',
    loadChildren: () => import('./cliente-detalle/cliente-detalle.module').then( m => m.ClienteDetallePageModule)
  },
  {
    path: 'empleado',
    loadChildren: () => import('./empleado/empleado.module').then( m => m.EmpleadoPageModule)
  },
  {
    path: 'empleado-detalle/:emp_id',
    loadChildren: () => import('./empleado-detalle/empleado-detalle.module').then( m => m.EmpleadoDetallePageModule)
  },
  {
    path: 'proveedor',
    loadChildren: () => import('./proveedor/proveedor.module').then( m => m.ProveedorPageModule)
  },
  {
    path: 'proveedor-detalle/:prov_id',
    loadChildren: () => import('./proveedor-detalle/proveedor-detalle.module').then( m => m.ProveedorDetallePageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'producto-detalle/:pro_id',
    loadChildren: () => import('./producto-detalle/producto-detalle.module').then( m => m.ProductoDetallePageModule)
  },
  {
    path: 'estado-crear',
    loadChildren: () => import('./estado-crear/estado-crear.module').then( m => m.EstadoCrearPageModule)
  },
  {
    path: 'pais-crear',
    loadChildren: () => import('./pais-crear/pais-crear.module').then( m => m.PaisCrearPageModule)
  },
  {
    path: 'empleado-crear',
    loadChildren: () => import('./empleado-crear/empleado-crear.module').then( m => m.EmpleadoCrearPageModule)
  },
  {
    path: 'venta',
    loadChildren: () => import('./venta/venta.module').then( m => m.VentaPageModule)
  },
  {
    path: 'venta-detalle/:ven_id',
    loadChildren: () => import('./venta-detalle/venta-detalle.module').then( m => m.VentaDetallePageModule)
  },
  {
    path: 'venta-crear',
    loadChildren: () => import('./venta-crear/venta-crear.module').then( m => m.VentaCrearPageModule)
  },
  {
    path: 'producto-crear',
    loadChildren: () => import('./producto-crear/producto-crear.module').then( m => m.ProductoCrearPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
