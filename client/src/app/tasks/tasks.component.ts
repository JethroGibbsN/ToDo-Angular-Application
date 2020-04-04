import { Component, OnInit, Inject } from '@angular/core'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Task } from './task'
import { TasksService } from './tasks.service'



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  providers: [TasksService]
})
export class TasksComponent implements OnInit {
  tasks: Task[]
  editTask: Task

  constructor(private taskService: TasksService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getTasks()
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks))
  }

  add(taskName: string, taskDesc: string): void {
    this.editTask = undefined
    taskName = taskName.trim()
    if (!taskName) {
      return
    }
    taskDesc = taskDesc.trim()
    if (!taskName) {
      return
    }
    const newTask: Task = { taskName, taskDesc } as Task
    this.taskService.addTask(newTask).subscribe(task => this.tasks.push(task))
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(h => h !== task)
    this.taskService.deleteTask(task.taskName).subscribe()
  }

  edit(task) {
    this.editTask = task
  }

  update() {
    if (this.editTask) {
      this.taskService.updateTask(this.editTask).subscribe(task => {
        const ix = task ? this.tasks.findIndex(h => h.taskName === task.taskName) : -1
        if (ix > -1) {
          this.tasks[ix] = task
        }
      })
      this.editTask = undefined
    }
  }
  openUpdateDialog(task){
    const dialogRef = this.dialog.open(UpdateTaskDialog, {
      width: 'auto',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      task.animal = result;
      this.getTasks();
    });
  }
}
@Component({
  selector: 'update-task',
  templateUrl: './updatetask.html',
  providers: [TasksService]
})
export class UpdateTaskDialog {

  constructor(
    public dialogRef: MatDialogRef<UpdateTaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Task, private taskService: TasksService) {}
    saveData(task) {
      // delete task.imgData;
        this.taskService.updateTask(task).subscribe(task => {
          this.closeDialog()
        })
      
    }
  closeDialog(): void {
    this.dialogRef.close();
  }

}