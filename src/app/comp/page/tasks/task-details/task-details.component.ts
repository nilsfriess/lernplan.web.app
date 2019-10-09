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
  pagePerDay: number = 0;
  taskDeadline;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.databaseService.getAllTasks().subscribe(data => {
        this.task = data.find(elem => {
          if (elem.taskId == params['id']) {
            let currentDate = new Date();
            let deadline = new Date(elem.deadline.seconds * 1000);
            this.remainingDays = deadline.getDate() - currentDate.getDate();
            return true;
          }
          return false;
        });
        this.pagePerDay = Math.ceil(
          (this.task.pageCount - this.task.currentStatus) / this.remainingDays
        );
        this.taskDeadline = new Date(this.task.deadline.seconds * 1000);
        this.updateStatusIndicator();
      });
    });
  }

  updateStatusIndicator() {
    let interval = setInterval(() => {
      if (document.querySelector('.taskStatusInnerIndicator')) {
        let fullWidth = document.querySelector('.taskStatusIndicator')
          .clientWidth;
        let z = fullWidth * (this.task.currentStatus / this.task.pageCount);
        document
          .querySelector('.taskStatusInnerIndicator')
          .setAttribute('style', 'width: ' + z + 'px');
        clearInterval(interval);
      }
    }, 50);
  }

  updateStatus(val: number) {
    let newVal = parseInt(val.toString());
    if (newVal >= 0 && newVal <= this.task.pageCount) {
      let newTask = JSON.parse(JSON.stringify(this.task));
      newTask.currentStatus = newVal;
      this.databaseService.updateTask(newTask).then(d => console.log(d));
    }
  }
}
