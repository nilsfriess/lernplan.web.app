import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'lp-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Array<any> = undefined;
  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.databaseService.getAllTasks().then(data => {
      this.tasks = data;
    });
  }
}
