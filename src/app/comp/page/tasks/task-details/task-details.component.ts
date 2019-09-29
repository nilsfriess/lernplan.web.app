import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/services/database.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from 'src/app/core/services/loading-bar.service';

@Component({
  selector: 'lp-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  task;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.databaseService.getAllTasks().subscribe(data => {
        this.task = data.find(elem => {
          return elem.taskId == params['id'];
        });
      });
    });
  }
}
