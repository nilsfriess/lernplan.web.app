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
  remainingDays: number = 0;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.databaseService.getAllTasks().subscribe(data => {
        this.task = data.find(elem => {
          if (elem.taskId == params['id']) {
            console.log(elem);
            let currentDate = new Date();
            let deadline = new Date(elem.deadline.seconds * 1000);
            this.remainingDays = deadline.getDate() - currentDate.getDate();
            return true;
          }
          return false;
        });
      });
    });
  }
}
