import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-estado-crear',
  templateUrl: './estado-crear.page.html',
  styleUrls: ['./estado-crear.page.scss'],
  standalone: false
})
export class EstadoCrearPage implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private alert : AlertController,
    private modalCtrl: ModalController
  ) { }
  public estado!: FormGroup;
  paises: any=[];
  paisUrl: string = "http://localhost:8080/pais"
  baseUrl:string = "http://localhost:8080/estados"

  ngOnInit() {
    this.formulario();
    this.cargarPaises();
  }
  mensajes_validacion:any = {
    'estd_nombre' : [
      {type : 'required' , message : 'Nombre(s) requeridos.'},
    ],
    'estd_fkpai_id' : [
      {type : 'required' , message : 'País requerida.'},
    ],
  }

  private formulario() {
      this.estado = this.formBuilder.group({
      estd_nombre: ['', [Validators.required]],
      estd_fkpai_id: ['', [Validators.required]],
      })
  }

  async cargarPaises() {
    const response = await axios({
        method: 'get',
        url : this.paisUrl,
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then( (response) => {
        this.paises = response.data;
    }).catch(function (error) {
        console.log(error);     
    });
  }

  async guardarDatos() {
    try {
    const estado = this.estado?.value;
    const response = await axios({
        method: 'post',
        url : this.baseUrl,
        data: estado,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
        }
    }).then( (response) => {
        if(response?.status == 201) {
            this.alertGuardado(response.data.estd_nombre, 'El estado: ' + response.data.estd_nombre + ' ha sido registrada');
        }
    }).catch( (error) => {
        if(error?.response?.status == 422) {
            this.alertGuardado(estado.estd_nombre, error?.response?.data[0]?.message, "Error");
        }     
    });
    } catch(e){
        console.log(e);
    }
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.estado.get(controlName);
    if (control?.touched && control?.errors != null) {
        errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(nombre: String, msg = "",  subMsg= "Guardado") {
    const alert = await this.alert.create({
        header: 'Estado',
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
