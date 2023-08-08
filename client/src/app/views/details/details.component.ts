import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Log } from 'src/app/types/log';
import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/types/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute, private sessionService: SessionService,) { }

  get isLoggedIn(): boolean {
    return this.sessionService.hasUser;
  }

  log!: Log | null;
  user!: User | null;
  avatar: string | undefined;
  image: string | undefined;
  isOwner: Boolean = false;
  logId!: string;
  isShown: boolean = false;
  isLoading: boolean = true;
  showComments: boolean = false;
  name!: string;

  like(): void {
    console.log('like');
  }

  ngOnInit(): void {
    this.user = this.sessionService.getUserData();
    this.logId = this.activatedRoute.snapshot.params['logId'];
    this.apiService.getDetails(this.logId).subscribe(
      {
        next: (result) => {
          this.log = result;
          this.name = result.name;
          this.isLoading = !this.isLoading;
          this.avatar = this.getImageAsBase64(this.log?._ownerId.img.data.data);
          this.image = this.getImageAsBase64(this.log?.img.data.data);
          this.isOwner = this.user?._id === this.log?._ownerId._id;
          console.log(this.isOwner);
          console.log(this.log);
        },
        error: (error) => {
          console.log(error.error.message);
        }
      }
    );
  }

  getImageAsBase64(file: any): string {
    let binary = '';
    const bytes = new Uint8Array(file);

    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  onCloseModal(isShown: boolean) {
    this.isShown = isShown; // Update the isShown variable in the parent component
  }

  showDeleteModal() {
    this.isShown = !this.isShown;
  }

  onDeleteConfirmed() {
    console.log('Delete operation confirmed');

    this.apiService.deleteByLogId(this.logId).subscribe({
      error: (error) => {
        console.log(error.error.message);
      },
      complete: () => this.router.navigate(['home'])
    });
  }

  showCommentSection(): void {
    this.showComments = !this.showComments;
  }

  addComment(commentForm: NgForm): void {
    if (commentForm.invalid) {
      return;
    }

  }

}
