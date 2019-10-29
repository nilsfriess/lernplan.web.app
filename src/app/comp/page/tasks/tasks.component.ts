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
  tasksToShow: Array<any> = undefined;
  taskCategorys: Array<any> = [];
  showFilter: Boolean = false;
  selectedCategories = [];
  currentDate = new Date();

  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.databaseService.getAllTasks().subscribe(data => {
      this.tasks = data;
      this.tasksToShow = data;
      this.updateCategories();
    });
  }

  updateCategories() {
    this.tasks.forEach(elem => {
      if (elem.categories && elem.categories.length > 0) {
        elem.categories.forEach(cat => {
          if (this.taskCategorys.includes(cat.name) == false)
            this.taskCategorys.push(cat.name);
        });
      }
    });
  }

  openTask(task) {
    this.router.navigate(['/tasks/' + task.taskId]);
  }

  onSelectChange(val) {
    this.selectedCategories = val;
    this.tasksToShow = JSON.parse(JSON.stringify(this.tasks));
    if (val.length == 0) return;
    let tasksToRemove = [];
    for (let i = 0; i < this.tasksToShow.length; i++) {
      let z = false;
      this.tasksToShow[i].categories.forEach(elem => {
        if (this.selectedCategories.includes(elem.name)) z = true;
      });
      if (z == false) tasksToRemove.push(this.tasksToShow[i]);
    }
    for (let i = 0; i < tasksToRemove.length; i++) {
      let t = this.tasksToShow.indexOf(tasksToRemove[i]);
      this.tasksToShow.splice(t, 1);
    }
  }
}
