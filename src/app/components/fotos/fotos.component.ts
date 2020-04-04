import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargaImagenesService, Item } from 'src/app/services/carga-imagenes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: [
  ],
})
export class FotosComponent implements OnInit {

  public images: Observable<Item[]>;

  constructor(private cargaImagenesServices: CargaImagenesService) {
    this.images = this.cargaImagenesServices.getAllImages();
  }

  ngOnInit(): void {
  }

}
