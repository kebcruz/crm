import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Cliente } from '../services/cliente';
import axios from 'axios';

@Component({
  selector: 'app-cliente-crear',
  templateUrl: './cliente-crear.page.html',
  styleUrls: ['./cliente-crear.page.scss'],
  standalone: false
})
export class ClienteCrearPage implements OnInit {

  @Input() cli_id: number | undefined;

  baseUrl: string = "http://localhost:8080/clientes"
  domicilioUrl: string = "http://localhost:8080/domicilio" /* Peticion para datos de llave foranea */

  public cliente!: FormGroup;
  domicilios: any = []; /* Guardar datos de llave foranea */
  private editarDatos = []; /* Pedir los datos del registro a actualizar para guardarlos aqui */

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private clienteService: Cliente
  ) { }

  ngOnInit() {
    this.cargarDomicilios();
    if (this.cli_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'cli_nombre': [
      { type: 'required', message: 'Nombre(s) requeridos.' },
    ],
    'cli_paterno': [
      { type: 'required', message: 'Apellido Paterno requerido.' },
    ],
    'cli_materno': [
      { type: 'required', message: 'Apellido Materno requerido.' },
    ],
    'cli_telefono': [
      { type: 'required', message: 'Telefono requerido.' },
      { type: 'pattern', message: 'Dígite un número valido.' },
    ],
    'cli_correo': [
      { type: 'required', message: 'Correo requerido.' },
    ],
    'cli_fecha_registro': [
      { type: 'required', message: 'Fecha de registro requerido.' },
    ],
    'cli_fkdom_id': [
      { type: 'required', message: 'Domicilio requerido.' },
    ],
  }

  private formulario() {
    this.cliente = this.formBuilder.group({
      cli_nombre: ['', [Validators.required]],
      cli_paterno: ['', [Validators.required]],
      cli_materno: ['', [Validators.required]],
      cli_telefono: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      cli_correo: ['', [Validators.required]],
      cli_fecha_registro: ['', [Validators.required]],
      cli_fkdom_id: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.cliente.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  /* Para cargar los datos llave foranea */
  async cargarDomicilios() {
    const response = await axios({
      method: 'get',
      url: this.domicilioUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.domicilios = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.cli_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.cliente.get(String(key));
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
      const cliente = this.cliente?.value;
      if (this.cli_id === undefined) {
        try {
          await this.clienteService.crear(cliente).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.cli_nombre, 'El cliente con nombre ' + response.data.cli_nombre + ' ha sido registrado');
                this.resetFormulario();
              }
            },
            error => {
              this.handleError(error, cliente.cli_nombre);
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.clienteService.actualizar(this.cli_id, cliente).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.cli_nombre, 'El cliente con nombre ' + response.data.cli_nombre + ' ha sido actualizado');
              }
            },
            error => {
              this.handleError(error, cliente.cli_nombre);
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
    this.cliente.reset();
    this.cliente.markAsPristine();
    this.cliente.markAsUntouched();
  }

  private async alertGuardado(cliNombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Cliente',
      subHeader: subMsg,
      message: msg,
      cssClass: 'alert-personalizado',
      buttons: [
        {
          text: 'Continuar',
          role: 'confirm',
          cssClass: 'btn-confirmar',
        },
        {
          text: 'Salir',
          role: 'cancel',
          cssClass: 'btn-cancelar',
          handler: () => {
            this.modalCtrl.dismiss();
          },
        },
      ],
    });
    await alert.present();
  }

}
