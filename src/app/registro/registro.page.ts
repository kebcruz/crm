import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Empleados } from '../services/empleados';
import { Login } from '../services/login';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private empleadosService: Empleados,
    private router: Router,
    private loginService: Login
  ) { }

  public registro!: FormGroup;
  archivos: any = [];
  domicilios: any = [];
  puestos: any = [];
  archivoUrl: string = "http://localhost:8080/archivos"
  domicilioUrl: string = "http://localhost:8080/domicilios"
  puestoUrl: string = "http://localhost:8080/puestos"
  baseUrl: string = "http://localhost:8080/empleados"

  ngOnInit() {
    this.buildForm();
    this.cargarDomicilios();
    this.cargarPuestos();
    this.cargarArchivos();
  }


  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye!: ElementRef;

  passwordTypeInput = 'password';

  validation_messages: any = {
    'username': [
      { type: 'required', message: 'Matrícula requerida.' },
    ],
    'password': [
      { type: 'required', message: 'Contraseña requerida.' },
    ],
    'password_confirm': [
      { type: 'required', message: 'Contraseña requerida.' },
      { type: 'notEquivalent', message: 'No coinciden las contraseñas' },
    ],
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

  buildForm() {
    this.registro = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      password_confirm: ['', Validators.compose([
        Validators.required
      ])],
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
    }, { validator: this.checkIfMatchingPasswords('password', 'password_confirm') });
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

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

  async cargarPuestos() {
    const response = await axios({
      method: 'get',
      url: this.puestoUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.puestos = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  async cargarArchivos() {
    const response = await axios({
      method: 'get',
      url: this.archivoUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.archivos = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  async submitRegistrar() {
    localStorage.clear();
    const registrarData = this.registro?.value;
    try {
      await this.loginService.registrar(registrarData).subscribe(
        async response => {
          if (response?.status == 200 && response?.data !== '') {
            await localStorage.setItem('token', response?.data);
            localStorage.setItem('sesion', 'login');
            localStorage.setItem('username', registrarData.username);
            this.router.navigate(['/empleado']);
          } else if (response?.data === '') {
            this.alertError();
          }
        },
        error => {
          if (error.status == 422) {
            this.alertDuplicado();
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertError() {
    const alert = await this.alert.create({
      header: 'Importante',
      subHeader: 'Error',
      message: 'Nombre de usuario o contraseña incorrecta.',
      cssClass: 'alert-center',
      buttons: ['Corregir'],
    });
    await alert.present();
  }

  async alertDuplicado() {
    const alert = await this.alert.create({
      header: 'Importante',
      subHeader: 'Duplicado',
      message: 'El usuario ya se encuentra registrada',
      cssClass: 'alert-center',
      buttons: ['Corregir'],
    });
    await alert.present();
  }

  getError(controlName: string) {
    let errors: any[] = [];
    const control = this.registro.get(controlName);
    if (control!.touched && control!.errors != null) {
      errors = JSON.parse(JSON.stringify(control!.errors));
    }
    return errors;
  }

  login() {
    this.router.navigate(['/']);
  }

  togglePasswordMode() {
    const e = window.event;
    e!.preventDefault();
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    const inputSelection = nativeEl.selectionStart;
    nativeEl.focus();
    setTimeout(() => {
      nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);
  }

}
