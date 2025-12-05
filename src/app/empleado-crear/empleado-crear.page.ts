import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Empleados } from '../services/empleados';
import { Puesto } from '../services/puesto';
import { Archivo } from '../services/archivo';
import { Domicilio } from '../services/domicilio';

@Component({
  selector: 'app-empleado-crear',
  templateUrl: './empleado-crear.page.html',
  styleUrls: ['./empleado-crear.page.scss'],
  standalone: false
})
export class EmpleadoCrearPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private empleadosService: Empleados,
    private puestosService: Puesto,
    private archivosService: Archivo,
    private domiciliosService: Domicilio
  ) { }

  private editarDatos: any = {};
  @Input() emp_id: number | undefined;
  public empleado!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  archivos: any = [];
  domicilios: any = [];
  puestos: any = [];
  baseUrl: string = "http://localhost:8080";

  // Nueva propiedad para controlar si se sube archivo nuevo o se selecciona existente
  modoArchivo: 'nuevo' | 'existente' = 'nuevo';

  ngOnInit() {
    this.cargarDomicilios();
    this.cargarPuestos();
    this.cargarArchivos();
    if (this.emp_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'emp_nombre': [
      { type: 'required', message: 'Nombre(s) requeridos.' },
    ],
    'emp_paterno': [
      { type: 'required', message: 'Apellido Paterno requeridos.' },
    ],
    'emp_materno': [
      { type: 'required', message: 'Apellido Materno requeridos.' },
    ],
    'emp_telefono': [
      { type: 'required', message: 'Telefono requerido.' },
    ],
    'emp_comision': [
      { type: 'required', message: 'Comisión requerido.' },
    ],
    'emp_hora_entrada': [
      { type: 'required', message: 'Hora de entrada requerido.' },
    ],
    'emp_hora_salida': [
      { type: 'required', message: 'Hora de salida requerido.' },
    ],
    'emp_fecha_nacimiento': [
      { type: 'required', message: 'Fecha de nacimiento requerido.' },
    ],
    'emp_fecha_alta': [
      { type: 'required', message: 'Fecha de alta requerido.' },
    ],
    'emp_fkdom_id': [
      { type: 'required', message: 'Domicilio requerido.' },
    ],
    'emp_fkpuesto_id': [
      { type: 'required', message: 'Puesto requerido.' },
    ],
    'emp_fkarc_id': [
      { type: 'required', message: 'Archivo requerido.' },
    ],
  }

  async cargarDomicilios() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.domiciliosService.listado().subscribe(
        response => {
          this.domicilios = response;
        },
        error => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
    loading.dismiss();
  }

  async cargarPuestos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.puestosService.listado().subscribe(
        response => {
          this.puestos = response;
        },
        error => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
    loading.dismiss();
  }

  async cargarArchivos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.archivosService.listado().subscribe(
        response => {
          this.archivos = response;
        },
        error => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
    loading.dismiss();
  }

  private formulario() {
    this.empleado = this.formBuilder.group({
      emp_nombre: ['', [Validators.required]],
      emp_paterno: ['', [Validators.required]],
      emp_materno: ['', [Validators.required]],
      emp_telefono: ['', [Validators.required]],
      emp_comision: ['', [Validators.required]],
      emp_hora_entrada: ['', [Validators.required]],
      emp_hora_salida: ['', [Validators.required]],
      emp_fecha_nacimiento: ['', [Validators.required]],
      emp_fecha_alta: ['', [Validators.required]],
      emp_fkdom_id: ['', [Validators.required]],
      emp_fkpuesto_id: ['', [Validators.required]],
      emp_fkarc_id: ['', []], // Ahora no es requerido inicialmente

      // Nuevos campos para el archivo (opcional cuando se sube nuevo)
      archivo_nombre: [''],
      archivo_tipo: [''],
      archivo_ruta: [''],
      archivo_fecha_subida: [''],
      archivo_tamanio: [''],
    });
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.empleado.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  // ============ NUEVOS MÉTODOS PARA ARCHIVO ============

  // Método para manejar la selección de archivos
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.modoArchivo = 'nuevo';

      // Crear preview para imágenes
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewUrl = reader.result;
        };
        reader.readAsDataURL(file);
      }

      // Auto-rellenar datos del archivo
      this.autoFillArchivoForm(file);

      // Limpiar selección de archivo existente
      this.empleado.patchValue({ emp_fkarc_id: '' });
    }
  }

  // Auto-rellenar formulario de archivo
  private autoFillArchivoForm(file: File) {
    const lastDotIndex = file.name.lastIndexOf('.');
    const fileName = lastDotIndex !== -1 ? file.name.substring(0, lastDotIndex) : file.name;
    const fileExtension = lastDotIndex !== -1 ? file.name.substring(lastDotIndex + 1).toLowerCase() : 'unknown';
    const fileSize = file.size;
    const currentDate = new Date().toISOString().split('T')[0];
    const uniquePath = `uploads/archivos/${currentDate}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

    this.empleado.patchValue({
      archivo_nombre: fileName,
      archivo_tipo: fileExtension,
      archivo_ruta: uniquePath,
      archivo_fecha_subida: currentDate,
      archivo_tamanio: fileSize
    });
  }

  // Método para subir el archivo al servidor
  private async uploadFile(): Promise<any> {
    if (!this.selectedFile) {
      throw new Error('No se ha seleccionado ningún archivo');
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    try {
      const response = await axios.post(`${this.baseUrl}/archivo/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        withCredentials: true
      });

      return response.data; // Devuelve {ruta, nombre, tamanio, tipo}
    } catch (error) {
      console.error('Error al subir archivo:', error);
      throw error;
    }
  }

  // Método para crear registro de archivo en BD
  private async crearArchivoEnBD(datosArchivo: any): Promise<number> {
    try {
      const archivoData = {
        arc_nombre: datosArchivo.nombre || this.empleado.value.archivo_nombre,
        arc_tipo: datosArchivo.tipo || this.empleado.value.archivo_tipo,
        arc_ruta: datosArchivo.ruta || this.empleado.value.archivo_ruta,
        arc_fecha_subida: new Date().toISOString().split('T')[0],
        arc_tamanio: datosArchivo.tamanio || this.empleado.value.archivo_tamanio
      };

      const response = await axios.post(`${this.baseUrl}/archivos`, archivoData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        withCredentials: true
      });

      return response.data.arc_id; // Retorna el ID del archivo creado
    } catch (error) {
      console.error('Error al crear archivo en BD:', error);
      throw error;
    }
  }

  // Método para abrir el selector de archivos
  openFileSelector() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.jpg,.jpeg,.png,.pdf';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', (event) => {
      this.onFileSelected(event);
      document.body.removeChild(fileInput);
    });

    document.body.appendChild(fileInput);
    fileInput.click();
  }

  // Cambiar modo entre archivo nuevo y existente
  cambiarModoArchivo(modo: any) {
    if (modo === 'nuevo' || modo === 'existente') {
      this.modoArchivo = modo;

      if (modo === 'existente') {
        this.selectedFile = null;
        this.previewUrl = null;
        this.empleado.patchValue({
          archivo_nombre: '',
          archivo_tipo: '',
          archivo_ruta: '',
          archivo_fecha_subida: '',
          archivo_tamanio: ''
        });
      }
    }
  }

  // ============ MÉTODOS EXISTENTES MODIFICADOS ============

  private async alertGuardado(nombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Empleado',
      subHeader: subMsg,
      message: msg,
      cssClass: 'alert-personalizado',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
          cssClass: 'btn-confirmar'
        },
        {
          text: 'Salir',
          role: 'confirm',
          cssClass: 'btn-cancelar',
          handler: () => {
            this.modalCtrl.dismiss();
          },
        },
      ],
    });
    await alert.present();
  }

  async getDetalles() {
    try {
      const response = await axios({
        method: 'get',
        url: this.baseUrl + "/empleados/" + this.emp_id + '?expand=archivo',
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      this.editarDatos = response.data;

      // Poblar el formulario con los datos
      Object.keys(this.editarDatos).forEach((key: string) => {
        const control = this.empleado.get(key);
        if (control !== null) {
          control.markAsTouched();
          control.patchValue(this.editarDatos[key]);
        }
      });

      // Si hay archivo, cargar preview
      if (this.editarDatos.emp_fkarc_id && this.editarDatos.archivo) {
        this.previewUrl = `${this.baseUrl}/${this.editarDatos.archivo.arc_ruta}`;
        this.modoArchivo = 'existente';
      }

    } catch (error) {
      console.log('Error al obtener detalles:', error);
    }
  }

  async guardarDatos() {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando empleado...',
      spinner: 'bubbles',
    });
    await loading.present();

    try {
      let archivoId: number;

      // PASO 1: Manejar el archivo
      if (this.modoArchivo === 'nuevo' && this.selectedFile) {
        try {
          // 1a. Subir archivo físico
          const uploadResult = await this.uploadFile();

          // 1b. Crear registro en tabla archivos
          archivoId = await this.crearArchivoEnBD(uploadResult);

        } catch (error) {
          await loading.dismiss();
          this.alertGuardado('', 'Error al subir el archivo', 'Error');
          return;
        }
      } else if (this.modoArchivo === 'existente') {
        // Usar archivo existente
        archivoId = this.empleado.value.emp_fkarc_id;

        if (!archivoId) {
          await loading.dismiss();
          this.alertGuardado('', 'Debe seleccionar un archivo existente', 'Error');
          return;
        }
      } else {
        await loading.dismiss();
        this.alertGuardado('', 'Debe seleccionar un archivo', 'Error');
        return;
      }

      // PASO 2: Crear/Actualizar empleado
      const empleadoData = {
        emp_nombre: this.empleado.value.emp_nombre,
        emp_paterno: this.empleado.value.emp_paterno,
        emp_materno: this.empleado.value.emp_materno,
        emp_telefono: this.empleado.value.emp_telefono,
        emp_comision: this.empleado.value.emp_comision,
        emp_hora_entrada: this.empleado.value.emp_hora_entrada,
        emp_hora_salida: this.empleado.value.emp_hora_salida,
        emp_fecha_nacimiento: this.empleado.value.emp_fecha_nacimiento,
        emp_fecha_alta: this.empleado.value.emp_fecha_alta,
        emp_fkdom_id: this.empleado.value.emp_fkdom_id,
        emp_fkpuesto_id: this.empleado.value.emp_fkpuesto_id,
        emp_fkarc_id: archivoId
      };

      if (this.emp_id === undefined) {
        try {
          await this.empleadosService.crear(empleadoData).subscribe(
            async response => {
              await loading.dismiss();
              if (response?.status == 201) {
                this.alertGuardado(response.data.emp_nombre, 'El empleado ' + response.data.emp_nombre + ' ha sido registrado');
                this.resetFormulario();
              }
            },
            async error => {
              await loading.dismiss();
              this.handleError(error, empleadoData.emp_nombre);
            }
          );
        } catch (error) {
          await loading.dismiss();
          console.log(error);
        }
      } else {
        try {
          await this.empleadosService.actualizar(this.emp_id, empleadoData).subscribe(
            async response => {
              await loading.dismiss();
              if (response?.status == 200) {
                this.alertGuardado(response.data.emp_nombre, 'El empleado ' + response.data.emp_nombre + ' ha sido actualizado');
              }
            },
            async error => {
              await loading.dismiss();
              this.handleError(error, empleadoData.emp_nombre);
            }
          );
        } catch (error) {
          await loading.dismiss();
          console.log(error);
        }
      }

    } catch (error) {
      await loading.dismiss();
      console.error('Error general:', error);
      this.alertGuardado('', 'Error inesperado al guardar', 'Error');
    }
  }

  /** Maneja errores de validación o de servidor */
  private handleError(error: any, nombre: string) {
    if (error?.response?.status == 422) {
      this.alertGuardado(nombre, error?.response?.data[0]?.message, "Error");
    }
    if (error?.response?.status == 500) {
      this.alertGuardado(nombre, "Error del servidor", "Error");
    }
    if (error?.response?.status == 401) {
      this.alertGuardado(nombre, "No tiene permisos para realizar esta acción", "Error");
    }
  }

  /** Limpia el formulario completamente */
  private resetFormulario() {
    this.empleado.reset();
    this.selectedFile = null;
    this.previewUrl = null;
    this.modoArchivo = 'nuevo';
    this.empleado.markAsPristine();
    this.empleado.markAsUntouched();
  }
}