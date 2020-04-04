import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import *  as firebase from "firebase";
import { Observable } from 'rxjs';
import { FileItem } from '../models/file-item';

export interface Item { name: string; url: string; }

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private itemsCollection: AngularFirestoreCollection<Item>;
  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore) { }

  public cargarImagenesFirebase(images: FileItem[]) {
    const storagaRef = firebase.storage().ref();

    for (const image of images) {
      image.estaSubiendo = true;
      if (image.progeso >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =
        storagaRef.child(`${this.CARPETA_IMAGENES}/${image.nombreArchivo}`)
          .put(image.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => image.progeso = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        (error) => console.error('Upload error', error),
        () => {
          console.error("fichero subido correctamente");
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            image.url = url;
            image.estaSubiendo = false;
            console.error(uploadTask);
            this.guardarImagen({ name: image.nombreArchivo, url: image.url });
          }).catch((err) => {
            console.error("Error file upload", err);
          });

        });
    }
  }

  public getAllImages(): Observable<Item[]> {
    this.itemsCollection = this.db.collection<Item>(this.CARPETA_IMAGENES);
    return this.itemsCollection.valueChanges();
  }

  private guardarImagen(image: { name: string, url: string }): void {
    this.db.collection(`/${this.CARPETA_IMAGENES}`)
      .add(image);
  }

}
