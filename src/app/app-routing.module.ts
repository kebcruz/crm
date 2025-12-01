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
    path: 'cliente-detalle/:cliente_id',
    loadChildren: () => import('./cliente-detalle/cliente-detalle.module').then( m => m.ClienteDetallePageModule),
    /* canActivate: [permisoGuard] */
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
  {
    path: 'archivo',
    loadChildren: () => import('./archivo/archivo.module').then( m => m.ArchivoPageModule)
  },
  {
    path: 'archivo-crear',
    loadChildren: () => import('./archivo-crear/archivo-crear.module').then( m => m.ArchivoCrearPageModule)
  },
  {
    path: 'archivo-detalle/:archivo_id',
    loadChildren: () => import('./archivo-detalle/archivo-detalle.module').then( m => m.ArchivoDetallePageModule)
  },
  {
    path: 'categoria',
    loadChildren: () => import('./categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'categoria-crear',
    loadChildren: () => import('./categoria-crear/categoria-crear.module').then( m => m.CategoriaCrearPageModule)
  },
  {
    path: 'categoria-detalle/:categoria_id',
    loadChildren: () => import('./categoria-detalle/categoria-detalle.module').then( m => m.CategoriaDetallePageModule)
  },
  {
    path: 'cliente-crear',
    loadChildren: () => import('./cliente-crear/cliente-crear.module').then( m => m.ClienteCrearPageModule)
  },
  {
    path: 'cliente-etiqueta-crear',
    loadChildren: () => import('./cliente-etiqueta-crear/cliente-etiqueta-crear.module').then( m => m.ClienteEtiquetaCrearPageModule)
  },
  {
    path: 'cliente-etiqueta-detalle/:cliente_detalle_id',
    loadChildren: () => import('./cliente-etiqueta-detalle/cliente-etiqueta-detalle.module').then( m => m.ClienteEtiquetaDetallePageModule)
  },
  {
    path: 'color-crear',
    loadChildren: () => import('./color-crear/color-crear.module').then( m => m.ColorCrearPageModule)
  },
  {
    path: 'color-detalle/:color_id',
    loadChildren: () => import('./color-detalle/color-detalle.module').then( m => m.ColorDetallePageModule)
  },
  {
    path: 'devolucion',
    loadChildren: () => import('./devolucion/devolucion.module').then( m => m.DevolucionPageModule)
  },
  {
    path: 'devolucion-crear',
    loadChildren: () => import('./devolucion-crear/devolucion-crear.module').then( m => m.DevolucionCrearPageModule)
  },
  {
    path: 'devolucion-detalle/:devolucion_id',
    loadChildren: () => import('./devolucion-detalle/devolucion-detalle.module').then( m => m.DevolucionDetallePageModule)
  },
  {
    path: 'domicilio-crear',
    loadChildren: () => import('./domicilio-crear/domicilio-crear.module').then( m => m.DomicilioCrearPageModule)
  },
  {
    path: 'domicilio-detalle/:domicilio_id',
    loadChildren: () => import('./domicilio-detalle/domicilio-detalle.module').then( m => m.DomicilioDetallePageModule)
  },
  {
    path: 'estado-detalle/:estado_id',
    loadChildren: () => import('./estado-detalle/estado-detalle.module').then( m => m.EstadoDetallePageModule)
  },  {
    path: 'proveedor-crear',
    loadChildren: () => import('./proveedor-crear/proveedor-crear.module').then( m => m.ProveedorCrearPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
