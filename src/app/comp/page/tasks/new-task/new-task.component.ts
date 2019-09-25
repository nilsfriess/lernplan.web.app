import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatStepper } from '@angular/material/stepper';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'lp-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  taskType: string = 'Buch';
  inputTimeout;
  previousSearch: string = '';
  bookSearchResults = [];
  resultsLoading = false;
  currentDate = new Date();
  readonly separatorKeysCodes: Set<number> = new Set<number>([
    ENTER,
    SPACE,
    COMMA,
  ]);

  taskDetails = {
    title: '',
    pageCount: null,
    author: '',
    note: '',
    categories: [{ name: this.taskType }],
  };

  taskDetailsFormGroup: FormGroup = new FormGroup({
    titleCtrl: new FormControl('', [Validators.required]),
    pageCountCtrl: new FormControl('', [Validators.required]),
    deadlineCtrl: new FormControl('', Validators.required),
  });

  @ViewChild('stepper', { static: true }) stepper: MatStepper;
  @ViewChild('titleInput', { static: true }) titleInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('pageCountInput', { static: true })
  pageCountInput: ElementRef<HTMLInputElement>;
  @ViewChild('authorInput', { static: true }) authorInput: ElementRef<
    HTMLInputElement
  >;

  constructor() {}

  ngOnInit() {}

  searchforBook(e) {
    clearTimeout(this.inputTimeout);
    this.inputTimeout = setTimeout(async () => {
      if (e.target.value.trim() != '') {
        if (e.target.value.trim() == this.previousSearch) return;
        this.resultsLoading = true;
        this.previousSearch = e.target.value.trim();
        const response = await fetch(
          'https://www.googleapis.com/books/v1/volumes?q=' +
            e.target.value.trim() +
            '&key=AIzaSyAxM4AZ2XF_jQEcseic588FMUOo6-ZI_4A&orderBy=relevance&maxResults=5'
        );
        const myJson = await response.json();
        if (myJson.totalItems > 0) {
          this.bookSearchResults = myJson.items;
        } else {
          this.bookSearchResults = [];
        }
        this.resultsLoading = false;
      }
    }, 400);
  }

  selectBook(book) {
    this.stepper.next();
    //this.taskDetails.title = book.volumeInfo.title;
    this.titleInput.nativeElement.value = book.volumeInfo.title;
    //this.taskDetails.pageCount = book.volumeInfo.pageCount
    this.pageCountInput.nativeElement.value = book.volumeInfo.pageCount
      ? book.volumeInfo.pageCount
      : null;
    //this.taskDetails.author =
    this.authorInput.nativeElement.value =
      book.volumeInfo.authors != null ? book.volumeInfo.authors[0] : '';
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.taskDetails.categories.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  remove(category): void {
    const index = this.taskDetails.categories.indexOf(category);

    if (index >= 0) {
      this.taskDetails.categories.splice(index, 1);
    }
  }

  onTaskTypeChange() {
    this.taskDetails.categories = [{ name: this.taskType }];
  }

  createTask() {}
}
