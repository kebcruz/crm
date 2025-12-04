import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Categoria } from '../services/categoria';
import axios from 'axios';

@Component({
  selector: 'app-categoria-crear',
  templateUrl: './categoria-crear.page.html',
  styleUrls: ['./categoria-crear.page.scss'],
  standalone: false
})
export class CategoriaCrearPage implements OnInit {

  @Input() cat_id: number | undefined;

  baseUrl: string = "http://localhost:8080/categorias"
  private editarDatos = []; /* Pedir los datos del registro a actualizar para guardarlos aqui */

  public categoria!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private categoriaService: Categoria
  ) { }

  ngOnInit() {
    this.formulario();
    if (this.cat_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'cat_nombre': [
      { type: 'required', message: 'Nombre de categoria requerido.' },
    ],
    'cat_descripcion': [
      { type: 'required', message: 'Descripción requerido.' },
    ],
  }

  private formulario() {
    this.categoria = this.formBuilder.group({
      cat_nombre: ['', [Validators.required]],
      cat_descripcion: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.categoria.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.cat_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.categoria.get(String(key));
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
      const categoria = this.categoria?.value;
      if (this.cat_id === undefined) {
        try {
          await this.categoriaService.crear(categoria).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.cat_nombre, 'La categoria de nombre ' + response.data.cat_nombre + ' ha sido registrado');
                this.resetFormulario();
              }
            },
            error => {
              this.handleError(error, categoria.cat_nombre);
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.categoriaService.actualizar(this.cat_id, categoria).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.cat_nombre, 'La categoria de nombre ' + response.data.cat_nombre + ' ha sido actualizado');
              }
            },
            error => {
              this.handleError(error, categoria.cat_nombre);
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
    this.categoria.reset();
    this.categoria.markAsPristine();
    this.categoria.markAsUntouched();
  }

  private async alertGuardado(catNombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Categoria',
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
  
}
