import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ClienteEtiqueta } from '../services/cliente-etiqueta';
import axios from 'axios';

@Component({
  selector: 'app-cliente-etiqueta-crear',
  templateUrl: './cliente-etiqueta-crear.page.html',
  styleUrls: ['./cliente-etiqueta-crear.page.scss'],
  standalone: false
})
export class ClienteEtiquetaCrearPage implements OnInit {

  @Input() clet_id: number | undefined;

  baseUrl: string = "http://localhost:8080/cliente-etiquetas"
  clienteUrl: string = "http://localhost:8080/cliente" /* Peticion para datos de llave foranea */
  etiquetaUrl: string = "http://localhost:8080/etiqueta" /* Peticion para datos de llave foranea */

  public etiCliente!: FormGroup;
  clientes: any = []; /* Guardar datos de llave foranea */
  etiquetas: any = []; /* Guardar datos de llave foranea */
  private editarDatos = []; /* Pedir los datos del registro a actualizar para guardarlos aqui */

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private cliEtiquetaService: ClienteEtiqueta
  ) { }

  ngOnInit() {
    this.cargarClientes();
    this.cargarEtiquetas();
    if (this.clet_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'clet_fkcli_id': [
      { type: 'required', message: 'Cliente asociado requerido.' },
    ],
    'clet_fketi_id': [
      { type: 'required', message: 'Etiqueta asociado requerido.' },
    ],
  }

  private formulario() {
    this.etiCliente = this.formBuilder.group({
      clet_fkcli_id: ['', [Validators.required]],
      clet_fketi_id: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.etiCliente.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  /* Para cargar los datos llave foranea */
  async cargarEtiquetas() {
    const response = await axios({
      method: 'get',
      url: this.etiquetaUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.etiquetas = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  /* Para cargar los datos llave foranea */
  async cargarClientes() {
    const response = await axios({
      method: 'get',
      url: this.clienteUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.clientes = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.clet_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.etiCliente.get(String(key));
        if (control !== null) {
          control.markAsTouched();
          control.patchValue(this.editarDatos[key]);
        }
      })
    }).catch(error => {
      console.error('Error al obtener detalles:', error);
    });
  }

  async guardarDatos() {
    try {
      const etiCliente = this.etiCliente?.value;
      if (this.clet_id === undefined) {
        try {
          await this.cliEtiquetaService.crear(etiCliente).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.clet_id, 'La etiqueta número ' + response.data.clet_id + ' ha sido registrado');
                this.resetFormulario();
              }
            },
            error => {
              this.handleError(error, etiCliente.cli_nombre);
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.cliEtiquetaService.actualizar(this.clet_id, etiCliente).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.clet_id, 'La etiqueta número ' + response.data.clet_id + ' ha sido actualizado');
              }
            },
            error => {
              this.handleError(error, etiCliente.clet_id);
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
    this.etiCliente.reset();
    this.etiCliente.markAsPristine();
    this.etiCliente.markAsUntouched();
  }

  private async alertGuardado(cletNombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Etiqueta-Cliente',
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
