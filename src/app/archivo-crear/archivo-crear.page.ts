import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Archivo } from '../services/archivo';
import axios from 'axios';

@Component({
  selector: 'app-archivo-crear',
  templateUrl: './archivo-crear.page.html',
  styleUrls: ['./archivo-crear.page.scss'],
  standalone: false
})
export class ArchivoCrearPage implements OnInit {

  @Input() arc_id: number | undefined;

  baseUrl: string = "http://localhost:8080/archivos"
  selectedFile: File | null = null;

  public archivo!: FormGroup;
  private editarDatos = []; /* Pedir los datos del registro a actualizar para guardarlos aqui */

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private archivoService: Archivo
  ) { }

  ngOnInit() {
    if (this.arc_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'arc_nombre': [
      { type: 'required', message: 'Nombre del archivo requerido.' },
    ],
    'arc_tipo': [
      { type: 'required', message: 'Tipo de archivo requerido.' },
    ],
    'arc_ruta': [
      { type: 'required', message: 'Ruta del archivo requerido.' },
      { type: 'pattern', message: 'La ruta contiene caracteres no válidos.' },
    ],
    'arc_fecha_subida': [
      { type: 'required', message: 'Fecha de subida requerido.' },
    ],
    'arc_tamanio': [
      { type: 'required', message: 'Tamaño del archivo requerido.' },
      { type: 'pattern', message: 'El tamaño solo debe contener números.' },
    ],
  }

  private formulario() {
    this.archivo = this.formBuilder.group({
      arc_nombre: ['', [Validators.required]],
      arc_tipo: ['', [Validators.required]],
      arc_ruta: [''],
      arc_fecha_subida: ['', [Validators.required]],
      arc_tamanio: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.archivo.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.arc_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.archivo.get(String(key));
        if (control !== null) {
          control.markAsTouched();
          control.patchValue(this.editarDatos[key]);
        }
      })
    }).catch(function (error) {
      console.log(error);
    });
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.autoFillForm(file);
    }
  }

  // Método para auto-rellenar el formulario con la información del archivo
  private autoFillForm(file: File) {
    // Obtener nombre del archivo sin extensión
    const lastDotIndex = file.name.lastIndexOf('.');
    const fileName = lastDotIndex !== -1 ? file.name.substring(0, lastDotIndex) : file.name;

    // Obtener extensión del archivo
    const fileExtension = lastDotIndex !== -1 ? file.name.substring(lastDotIndex + 1).toLowerCase() : 'unknown';

    // Obtener tamaño del archivo en bytes
    const fileSize = file.size;

    // Fecha actual
    const currentDate = new Date().toISOString().split('T')[0];

    // Generar ruta única para el archivo
    const uniquePath = `uploads/archivos/${currentDate}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

    // Rellenar el formulario automáticamente
    this.archivo.patchValue({
      arc_nombre: fileName,
      arc_tipo: fileExtension,
      arc_ruta: uniquePath,
      arc_fecha_subida: currentDate,
      arc_tamanio: fileSize
    });
  }

  // Método para abrir el selector de archivos
  openFileSelector() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.jpg,.jpeg,.png';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', (event) => {
      this.onFileSelected(event);
      document.body.removeChild(fileInput);
    });

    document.body.appendChild(fileInput);
    fileInput.click();
  }

  // Método para subir el archivo al servidor
  private async uploadFile(): Promise<string> {
    if (!this.selectedFile) {
      throw new Error('No se ha seleccionado ningún archivo');
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Aquí debes ajustar la URL según tu endpoint de subida de archivos en Yii2
    const uploadUrl = 'http://localhost:8080/archivo/upload';

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        withCredentials: true
      });

      return response.data.ruta; // Asumiendo que el servidor devuelve la ruta donde se guardó
    } catch (error) {
      console.error('Error al subir archivo:', error);
      throw error;
    }
  }

  async guardarDatos() {
    try {
      // Si hay un archivo seleccionado, subirlo primero
      if (this.selectedFile) {
        try {
          const filePath = await this.uploadFile();
          // Actualizar la ruta en el formulario con la ruta real del servidor
          this.archivo.patchValue({
            arc_ruta: filePath
          });
        } catch (uploadError) {
          this.alertGuardado('', 'Error al subir el archivo', 'Error');
          return;
        }
      }
      const archivo = this.archivo?.value;
      if (this.arc_id === undefined) {
        try {
          await this.archivoService.crear(archivo).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.arc_nombre, 'El archivo con nombre ' + response.data.arc_nombre + ' ha sido registrado');
                this.resetFormulario();
              }
            },
            error => {
              this.handleError(error, archivo.arc_nombre);
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.archivoService.actualizar(this.arc_id, archivo).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.arc_nombre, 'El archivo con nombre ' + response.data.arc_nombre + ' ha sido actualizado');
              }
            },
            error => {
              this.handleError(error, archivo.arc_nombre);
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  /** Maneja errores de validación o de servidor */
  private handleError(error: any, nombre: string) {
    if (error?.response?.status == 422) {
      this.alertGuardado(nombre, error?.response?.data[0]?.message, "Error");
    }
    if (error?.response?.status == 500) {
      this.alertGuardado(nombre, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
    }
    console.error('Error en la petición:', error);
  }

  /** Limpia el formulario completamente */
  private resetFormulario() {
    this.archivo.reset();
    this.archivo.markAsPristine();
    this.archivo.markAsUntouched();
  }

  private async alertGuardado(arcNombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Archivo',
      subHeader: subMsg,
      message: msg,
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
        },
        {
          text: 'Salir',
          role: 'confirm',
          handler: () => {
            this.modalCtrl.dismiss();
          },
        },
      ],
    });
    await alert.present();
  }

}
