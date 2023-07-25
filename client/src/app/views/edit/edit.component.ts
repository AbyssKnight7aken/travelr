import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Log } from 'src/app/types/log';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) { }

  log!: any //TODO: implement data validation !!!
  errorMesssageFromServer!: string;
  image: any
  url: string = '';
  selectedFile: any
  fileName: string = '';
  id: string = this.activatedRoute.snapshot.params['logId'];

  ngOnInit(): void {
    this.apiService.getDetails(this.id).subscribe(
      {
        next: (result) => {
          this.log = result;
          this.image = this.getImageAsBase64();
          console.log(this.log);
        },
        error: (error) => {
          console.log(error.error.message);
          this.errorMesssageFromServer = error.error.message;
        }
      }
    );
  }

  getImageAsBase64(): string {
    let binary = '';
    const bytes = new Uint8Array(this.log.img.data.data);

    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  loadFile(event: any): void {

    if (event.target.files) {
      const reader = new FileReader();
      this.selectedFile = <File>event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target?.result;
      }
    }
  }

  convertToImageFile(base64String: string, filename: string): File {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: 'image/jpeg' });

    // Create a File object with the image data
    const file = new File([blob], filename, { type: 'image/jpeg' });
    return file;
    // Now you can use the 'file' variable to upload the image or perform other operations.
    // For example, you can use FormData to upload the file to the server:
    // const formData = new FormData();
    // formData.append('imageFile', file);
    // Then use HttpClient to send the formData to the server.

    // Note: The above code assumes the image data is in JPEG format. If the image data is in a different format,
    // make sure to adjust the 'type' parameter accordingly.
  }

  editHandler(editForm: NgForm) {
    if (editForm.invalid) {
      return;
    }
    console.log(editForm.value);

    const formData = new FormData();

    if (this.selectedFile) {
      console.log(this.selectedFile);
      this.fileName = this.selectedFile.name;
      formData.append('img', this.selectedFile);
    } else {

      this.selectedFile = this.convertToImageFile(this.getImageAsBase64(), editForm.value.name)
      formData.append('img', this.selectedFile);
      console.log(this.selectedFile);
    }

    formData.append('name', editForm.value.name);
    formData.append('date', editForm.value.date);
    formData.append('description', editForm.value.description);
    formData.append('location', editForm.value.location);

    this.apiService.edit(this.id, formData as unknown as Log).subscribe({
      next: (updatedLog) => {
        console.log(updatedLog);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error.error.message);
        this.errorMesssageFromServer = error.error.message;
      }
    });
  }

}

