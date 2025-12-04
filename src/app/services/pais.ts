import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Pais {
  url:string  = `${environment.apiUrl}pais`;
  headers:any = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };

  listado(extra: string = '', busqueda:string=''): Observable<any> {
    let url:string = '';
    if(busqueda === '') {
      url = `${this.url}`+extra;
    } else {
      url = `${this.url}/buscar/`+busqueda+extra;
    }
    return new Observable(observer => {
      axios.get(url, {
        withCredentials: true,
        headers: this.headers
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  detalle(pai_id:string | null = '', extra:string = ''): Observable<any> {
    const url = `${this.url}/`+pai_id+extra;
    return new Observable(observer => {
      axios.get(url, {
        withCredentials: true,
        headers: this.headers
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  crear(pais: any): Observable<any> {
    const url = `${this.url}`;
    return new Observable(observer => {
      axios.post(url, pais, {
        withCredentials: true,
        headers: this.headers
      })
      .then(response => {
        observer.next(response);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  actualizar(pai_id: number, pais: any): Observable<any> {
    const url = `${this.url}/${pai_id}`;
    return new Observable(observer => {
      axios.put(url, pais, {
        withCredentials: true,
        headers: this.headers
      })
      .then(response => {
        observer.next(response);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  eliminar(pai_id: number): Observable<any> {
    const url = `${this.url}/${pai_id}`;
    return new Observable(observer => {
      axios.delete(url, {
        withCredentials: true,
        headers: this.headers
      })
      .then(response => {
        observer.next(response);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  total(busqueda:string=''): Observable<any> {
    const url = `${this.url}/total/`+busqueda;
    return new Observable(observer => {
      axios.get(url, {
        withCredentials: true,
        headers: this.headers
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }
}
