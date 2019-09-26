import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '../../services/loading-bar.service';

@Component({
  selector: 'lp-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent implements OnInit {
  isLoading: Boolean = true;

  constructor(private loadingBarService: LoadingBarService) {}

  ngOnInit() {
    this.loadingBarService.loadingStatus.subscribe(x => {
      this.isLoading = x;
    });
  }
}
