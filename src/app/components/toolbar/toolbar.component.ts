import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: false,
})
export class ToolbarComponent  implements OnInit {
  @Input('nombre') nombre: string | undefined;
  @Input('color') color: string = "primario";
  cerrarSesion(){
    localStorage.clear();
    this.router.navigateByUrl('/', { replaceUrl : true });
  }
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}
}
