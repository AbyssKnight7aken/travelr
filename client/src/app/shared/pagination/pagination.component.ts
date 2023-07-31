import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage$!: any;
  
  nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  previousPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }
}


// // basic paging logic to demo the buttons
// var pr = document.querySelector( '.paginate.left' );
// var pl = document.querySelector( '.paginate.right' );

// pr.onclick = slide.bind( this, -1 );
// pl.onclick = slide.bind( this, 1 );

// var index = 0, total = 5;

// function slide(offset) {
//   index = Math.min( Math.max( index + offset, 0 ), total - 1 );

//   document.querySelector( '.counter' ).innerHTML = ( index + 1 ) + ' / ' + total;

//   pr.setAttribute( 'data-state', index === 0 ? 'disabled' : '' );
//   pl.setAttribute( 'data-state', index === total - 1 ? 'disabled' : '' );
// }

// slide(0);