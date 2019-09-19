import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lp-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  taskType: string = 'book';
  inputTimeout;
  previousSearch: string = '';
  autocompleteOptions = [];

  constructor() {}

  ngOnInit() {}

  searchforBook(e) {
    clearTimeout(this.inputTimeout);
    this.inputTimeout = setTimeout(async () => {
      console.log(e.target.value);
      if (e.target.value.trim() != '') {
        if (e.target.value.trim() == this.previousSearch) return;
        this.previousSearch = e.target.value.trim();
        const response = await fetch(
          'https://www.googleapis.com/books/v1/volumes?q=' +
            e.target.value.trim() +
            '&key=AIzaSyAxM4AZ2XF_jQEcseic588FMUOo6-ZI_4A&orderBy=relevance&maxResults=5'
        );
        const myJson = await response.json();
        console.log(myJson);
        if (myJson.totalItems > 0) {
          this.autocompleteOptions = myJson.items;
          console.log(this.autocompleteOptions);
        } else {
          this.autocompleteOptions = [];
        }
      }
    }, 400);
  }
}
