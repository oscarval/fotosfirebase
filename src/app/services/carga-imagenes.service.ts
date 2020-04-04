import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import *  as firebase from "firebase";
import { Observable } from 'rxjs';
import { FileItem } from '../models/file-item';



@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore) { }

  public cargarImagenesFirebase(imagenes: FileItem[]) {
    console.error(imagenes);
  }

  private guardarImagen(image: { name: string, url: string }): void {
    this.db.collection(`/${this.CARPETA_IMAGENES}`)
      .add(image);
  }
}
