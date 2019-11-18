import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  constructor(private http: HttpClient) { }

  postFile(fileToUpload: File) {
    const endpoint = '/upload';
    const formData: FormData = new FormData();
    formData.append('filekey', fileToUpload, fileToUpload.name);
    //console.log('This is formdata:', formData.get('filekey'));
    return new Observable<any>(subscriber => {
      this.http.post(endpoint, { file: formData.get('filekey') }).subscribe(result => {
        subscriber.next(result);
      },
        err => {
          subscriber.error(err);
        },
        () => {
          subscriber.complete();
        })
    })
  }
}
