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
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  // validations

  private canFileUpload(file: FileItem): boolean {
    return !this.isDropedd(file.nombreArchivo) && this.isImage(file.archivo.type);
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
