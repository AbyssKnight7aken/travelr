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

   ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['logId'];
    this.apiService.getDetails(id).subscribe(
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

  editHandler(editForm: NgForm) {
    if (editForm.invalid) {
      return;
    }

    if (this.selectedFile) {
      console.log(this.selectedFile);
      this.fileName = this.selectedFile.name;
    }

    editForm.value.img = this.selectedFile;
    console.log(editForm.value);

    const formData = new FormData();
    formData.append('name', editForm.value.name);
    formData.append('date', editForm.value.date);
    formData.append('description', editForm.value.description);
    formData.append('location', editForm.value.location);
    formData.append('img', this.selectedFile);
    
    this.apiService.create(formData as unknown as Log).subscribe({
      next: (newLog) => {
        console.log(newLog);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error.error.message);
        this.errorMesssageFromServer = error.error.message;
      }
    });
  }

}
