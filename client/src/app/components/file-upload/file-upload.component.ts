import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @ViewChild('fileInput', { static: false })
  inputVariable: ElementRef;
  fileToUpload: File = null;
  bottomText: string = '';
  topText: string = '';
  imageUrl: any;
  imageIsLoaded: Boolean = false;

  constructor(private fileUploadService: FileUploadService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity(this.fileToUpload);
    this.fileToUpload = null;
    this.resetInput();
  };

  uploadFileToActivity(fileToUpload: File) {
    this.fileUploadService.postFile(fileToUpload, this.bottomText, this.topText).subscribe(data => {
      this.imageUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(data);
      this.imageIsLoaded = true;
    }, error => {
      console.log(error);
    });
  }

  resetInput() {
    this.inputVariable.nativeElement.value = '';
  }
}
