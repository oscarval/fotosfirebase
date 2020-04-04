import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: [
  ],
})
export class CargaComponent implements OnInit {

  public estaSobreElemento: boolean = false;
  public archivos: FileItem[] = [];

  constructor(public cargaImagenesServices: CargaImagenesService) {
  }

  ngOnInit(): void {
  }

  public cargarImagenes() {
    this.cargaImagenesServices.cargarImagenesFirebase(this.archivos);
  }

  public deleteImages(): void {
    this.archivos = [];
  }

}
