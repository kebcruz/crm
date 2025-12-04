import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Metodo {
  url: string = `${environment.apiUrl}metodos`;
  headers: any = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
  listado(extra: string = '', busqueda: string = ''): Observable<any> {
    let url: string = '';
    if (busqueda === '') {
      url = `${this.url}` + extra;
    } else {
      url = `${this.url}/buscar/` + busqueda + extra;
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

  detalle(met_id: string | null = '', extra: string = ''): Observable<any> {
    const url = `${this.url}/` + met_id + extra;
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

  crear(metodo: any): Observable<any> {
    const url = `${this.url}`;
    return new Observable(observer => {
      axios.post(url, metodo, {
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

  actualizar(met_id: number, metodo: any): Observable<any> {
    const url = `${this.url}/${met_id}`;
    return new Observable(observer => {
      axios.put(url, metodo, {
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

  eliminar(met_id: number): Observable<any> {
    const url = `${this.url}/${met_id}`;
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

  total(busqueda: string = ''): Observable<any> {
    const url = `${this.url}/total/` + busqueda;
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

