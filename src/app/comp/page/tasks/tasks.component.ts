import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lp-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Array<any> = undefined;
  showFilter: Boolean = false;

  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.databaseService.getAllTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  openTask(task) {
    this.router.navigate(['/tasks/' + task.taskId]);
  }
}
