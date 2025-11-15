import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { permisoGuard } from './guard/permiso-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'color',
    loadChildren: () => import('./color/color.module').then( m => m.ColorPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'pais',
    loadChildren: () => import('./pais/pais.module').then( m => m.PaisPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'estado',
    loadChildren: () => import('./estado/estado.module').then( m => m.EstadoPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'municipio',
    loadChildren: () => import('./municipio/municipio.module').then( m => m.MunicipioPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'cliente-etiqueta',
    loadChildren: () => import('./cliente-etiqueta/cliente-etiqueta.module').then( m => m.ClienteEtiquetaPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'domicilio',
    loadChildren: () => import('./domicilio/domicilio.module').then( m => m.DomicilioPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'cliente-detalle/:cli_id',
    loadChildren: () => import('./cliente-detalle/cliente-detalle.module').then( m => m.ClienteDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'empleado',
    loadChildren: () => import('./empleado/empleado.module').then( m => m.EmpleadoPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'empleado-detalle/:emp_id',
    loadChildren: () => import('./empleado-detalle/empleado-detalle.module').then( m => m.EmpleadoDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'proveedor',
    loadChildren: () => import('./proveedor/proveedor.module').then( m => m.ProveedorPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'proveedor-detalle/:prov_id',
    loadChildren: () => import('./proveedor-detalle/proveedor-detalle.module').then( m => m.ProveedorDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'producto',
    loadChildren: () => import('./producto/producto.module').then( m => m.ProductoPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'producto-detalle/:pro_id',
    loadChildren: () => import('./producto-detalle/producto-detalle.module').then( m => m.ProductoDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'estado-crear',
    loadChildren: () => import('./estado-crear/estado-crear.module').then( m => m.EstadoCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'pais-crear',
    loadChildren: () => import('./pais-crear/pais-crear.module').then( m => m.PaisCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'empleado-crear',
    loadChildren: () => import('./empleado-crear/empleado-crear.module').then( m => m.EmpleadoCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'venta',
    loadChildren: () => import('./venta/venta.module').then( m => m.VentaPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'venta-detalle/:ven_id',
    loadChildren: () => import('./venta-detalle/venta-detalle.module').then( m => m.VentaDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'venta-crear',
    loadChildren: () => import('./venta-crear/venta-crear.module').then( m => m.VentaCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'producto-crear',
    loadChildren: () => import('./producto-crear/producto-crear.module').then( m => m.ProductoCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
