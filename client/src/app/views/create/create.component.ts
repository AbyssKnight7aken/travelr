import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  constructor(private apiService: ApiService) { }

  url: string = '/assets/images/default_image.png';
  selectedFile: any
  fileName: string = '';

  //this.selectedFile = <File>event.target.files[0];
  // console.log(this.selectedFile);

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

  create(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.selectedFile) {
      console.log(this.selectedFile);
      this.fileName = this.selectedFile.name;
    }

    form.value.img = this.selectedFile;
    //console.log(this.selectedFile);

    //const formData = new FormData(form);
    //formData.append('img', this.selectedFile)

    //console.log(formData);

    this.apiService.create(form.value).subscribe({
      next: (newLog) => {
        console.log(newLog.img);
        //this.router.navigate(['/themes']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}




