import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-empleado-crear',
  templateUrl: './empleado-crear.page.html',
  styleUrls: ['./empleado-crear.page.scss'],
  standalone: false
})
export class EmpleadoCrearPage implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private alert : AlertController,
    private modalCtrl: ModalController
  ) { }
  public empleado!: FormGroup;
  archivos: any=[];
  domicilios: any=[];
  puestos: any=[];
  archivoUrl: string = "http://localhost:8080/archivos"
  domicilioUrl: string = "http://localhost:8080/domicilios"
  puestoUrl: string = "http://localhost:8080/puestos"
  baseUrl:string = "http://localhost:8080/empleados"

  ngOnInit() {
    this.cargarDomicilios();
    this.cargarPuestos();
    this.cargarArchivos();
    this.formulario();
  }
  mensajes_validacion:any = {
    'emp_nombre' : [
      {type : 'required' , message : 'Nombre(s) requeridos.'},
    ],
    'emp_paterno' : [
      {type : 'required' , message : 'Apellido Paterno requeridos.'},
    ],
    'emp_materno' : [
      {type : 'required' , message : 'Apellido Materno requeridos.'},
    ],
    'emp_telefono' : [
      {type : 'required' , message : 'Telefono requerido.'},
    ],
    'emp_comision' : [
      {type : 'required' , message : 'Comisión requerido.'},
    ],
    'emp_hora_entrada' : [
      {type : 'required' , message : 'Hora de entrada requerido.'},
    ],
    'emp_hora_salida' : [
      {type : 'required' , message : 'Hora de salida requerido.'},
    ],
    'emp_fecha_nacimiento' : [
      {type : 'required' , message : 'Fecha de nacimiento requerido.'},
    ],
    'emp_fecha_alta' : [
      {type : 'required' , message : 'Fecha de alta requerido.'},
    ],
    'emp_fkdom_id' : [
      {type : 'required' , message : 'Domicilio requerido.'},
    ],
    'emp_fkpuesto_id' : [
      {type : 'required' , message : 'Puesto requerido.'},
    ],
    'emp_fkarc_id' : [
      {type : 'required' , message : 'Archivo requerido.'},
    ],
  }

  async cargarDomicilios() {
    const response = await axios({
      method: 'get',
      url : this.domicilioUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then( (response) => {
      this.domicilios = response.data;
    }).catch(function (error) {
      console.log(error);     
    });
  }

  async cargarPuestos() {
    const response = await axios({
      method: 'get',
      url : this.puestoUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then( (response) => {
      this.puestos = response.data;
    }).catch(function (error) {
      console.log(error);     
    });
  }

  async cargarArchivos() {
    const response = await axios({
      method: 'get',
      url : this.archivoUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then( (response) => {
      this.archivos = response.data;
    }).catch(function (error) {
      console.log(error);     
    });
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
      emp_fkarc_id: ['', [Validators.required]],
    })
  }

  async guardarDatos() {
    try {
    const empleado = this.empleado?.value;
    const response = await axios({
      method: 'post',
      url : this.baseUrl,
      data: empleado,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then( (response) => {
      if(response?.status == 201) {
        this.alertGuardado(response.data.emp_nombre, 'El empleado con nombre: ' + response.data.emp_nombre + ' ha sido registrada');
      }
    }).catch( (error) => {
      if(error?.response?.status == 422) {
        this.alertGuardado(empleado.emp_nombre, error?.response?.data[0]?.message, "Error");
      }     
    });
    } catch(e){
      console.log(e);
    }
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.empleado.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(nombre: String, msg = "",  subMsg= "Guardado") {
    const alert = await this.alert.create({
      header: 'Empleado',
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
