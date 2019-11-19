import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {
  endpoint: string = '/upload';

  constructor(private http: HttpClient) { }

  postFile(fileToUpload: File, botText: string, topText: string) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('botText', botText);
    formData.append('topText', topText);
    return new Observable<any>(subscriber => {
      this.http.post(this.endpoint, formData, { responseType: 'text' }).subscribe(result => {
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
