import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';


@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() public archivos: FileItem[] = [];

  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this.preventLoadImage(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    this.mouseSobre.emit(false);
    const transfer = this.getTransfer(event);
    if (!transfer) {
      return;
    }
    this.preventLoadImage(event);
    this.extractFiles(transfer.files);
  }

  private getTransfer(event) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extractFiles(files: FileList): void {
    for (const propiedad of Object.getOwnPropertyNames(files)) {
      if (this.canFileUpload(files[propiedad])) {
        const newFileItem = new FileItem(files[propiedad]);
        this.archivos.push(newFileItem);
      }
    }
  }

  // validations

  private canFileUpload(file: File): boolean {
    return !this.isDropedd(file.name) && this.isImage(file.type);
  }

  private preventLoadImage(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private isDropedd(fileName: string): boolean {
    const existItem: FileItem = this.archivos.find(item => item.nombreArchivo == fileName);
    return existItem ? true : false;
  }

  private isImage(fileType: string): boolean {
    return (fileType === '' || fileType === 'undefined') ? false : fileType.startsWith('image');
  }

}
