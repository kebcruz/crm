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
  {
    path: 'archivo',
    loadChildren: () => import('./archivo/archivo.module').then( m => m.ArchivoPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'archivo-crear',
    loadChildren: () => import('./archivo-crear/archivo-crear.module').then( m => m.ArchivoCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'archivo-detalle/:archivo_id',
    loadChildren: () => import('./archivo-detalle/archivo-detalle.module').then( m => m.ArchivoDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'categoria',
    loadChildren: () => import('./categoria/categoria.module').then( m => m.CategoriaPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'categoria-crear',
    loadChildren: () => import('./categoria-crear/categoria-crear.module').then( m => m.CategoriaCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'categoria-detalle/:categoria_id',
    loadChildren: () => import('./categoria-detalle/categoria-detalle.module').then( m => m.CategoriaDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'cliente-crear',
    loadChildren: () => import('./cliente-crear/cliente-crear.module').then( m => m.ClienteCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'cliente-etiqueta-crear',
    loadChildren: () => import('./cliente-etiqueta-crear/cliente-etiqueta-crear.module').then( m => m.ClienteEtiquetaCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'cliente-etiqueta-detalle/:cliente_detalle_id',
    loadChildren: () => import('./cliente-etiqueta-detalle/cliente-etiqueta-detalle.module').then( m => m.ClienteEtiquetaDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'color-crear',
    loadChildren: () => import('./color-crear/color-crear.module').then( m => m.ColorCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'color-detalle/:color_id',
    loadChildren: () => import('./color-detalle/color-detalle.module').then( m => m.ColorDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'devolucion',
    loadChildren: () => import('./devolucion/devolucion.module').then( m => m.DevolucionPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'devolucion-crear',
    loadChildren: () => import('./devolucion-crear/devolucion-crear.module').then( m => m.DevolucionCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'devolucion-detalle/:devolucion_id',
    loadChildren: () => import('./devolucion-detalle/devolucion-detalle.module').then( m => m.DevolucionDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'domicilio-crear',
    loadChildren: () => import('./domicilio-crear/domicilio-crear.module').then( m => m.DomicilioCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'domicilio-detalle/:domicilio_id',
    loadChildren: () => import('./domicilio-detalle/domicilio-detalle.module').then( m => m.DomicilioDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'estado-detalle/:estado_id',
    loadChildren: () => import('./estado-detalle/estado-detalle.module').then( m => m.EstadoDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'proveedor-crear',
    loadChildren: () => import('./proveedor-crear/proveedor-crear.module').then( m => m.ProveedorCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'etiqueta',
    loadChildren: () => import('./etiqueta/etiqueta.module').then( m => m.EtiquetaPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'etiqueta-crear',
    loadChildren: () => import('./etiqueta-crear/etiqueta-crear.module').then( m => m.EtiquetaCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'etiqueta-detalle/:etiqueta_id',
    loadChildren: () => import('./etiqueta-detalle/etiqueta-detalle.module').then( m => m.EtiquetaDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'puesto',
    loadChildren: () => import('./puesto/puesto.module').then( m => m.PuestoPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'puesto-crear',
    loadChildren: () => import('./puesto-crear/puesto-crear.module').then( m => m.PuestoCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'puesto-detalle/:puesto_id',
    loadChildren: () => import('./puesto-detalle/puesto-detalle.module').then( m => m.PuestoDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'metodo',
    loadChildren: () => import('./metodo/metodo.module').then( m => m.MetodoPageModule)
  },
  {
    path: 'metodo-crear',
    loadChildren: () => import('./metodo-crear/metodo-crear.module').then( m => m.MetodoCrearPageModule)
  },
  {
    path: 'metodo-detalle/:met_id',
    loadChildren: () => import('./metodo-detalle/metodo-detalle.module').then( m => m.MetodoDetallePageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
