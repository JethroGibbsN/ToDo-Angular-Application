import { Component, OnInit, Inject, ElementRef } from '@angular/core'
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
  dummy: Task

  constructor(private taskService: TasksService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getTasks()
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks))
  }

  

  delete(task: Task): void {
    this.tasks = this.tasks.filter(h => h !== task)
    this.taskService.deleteTask(task.taskName).subscribe()
  }

  edit(task) {
    this.editTask = task
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
  openCreateDialog(){
    const dialogRef = this.dialog.open(CreateTaskDialog, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTasks();
    });
  }
  open(task){
   this.taskService.getTask(task).subscribe(task => { 
     this.dummy = task  
     const dialogRef = this.dialog.open(OpenTaskDialog,  {
      width: 'auto',
      data: this.dummy || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTasks();
      this.dummy = null
    });
    })
  }
  openViewDialog(task){
      this.open(task)
   
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

@Component({
  selector: 'create-task',
  templateUrl: './createtask.html',
  providers: [TasksService]
})
export class CreateTaskDialog{
  tasks: Task[]
  editTask: Task
  imageFile: File
  constructor(
    
    public dialogRef: MatDialogRef<CreateTaskDialog>, private taskService: TasksService, private el: ElementRef) {}
    
    onFileSelect(event) {
      console.log(event.target.files.length)
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.imageFile = file
      }
    }
    add(taskName: string, taskDesc: string, image: File): void {
      this.editTask = undefined
      // const formData = new FormData();
      // formData.append('file', this.uploadForm.get('profile').value);
      taskName = taskName.trim()
      if (!taskName) {
        return
      }
      taskDesc = taskDesc.trim()
      image = this.imageFile
      if (!taskDesc) {
        return
      }
      if(!image){
        return
      }
      console.log(image)
      let formData = new FormData();
      formData.append('taskName', taskName);
      formData.append('taskDesc', taskDesc);
      formData.append('image', image);
      // let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#image');
      // image = inputEl.files.item(0)
      
      this.taskService.addTask(formData).subscribe(task => {
        // this.tasks.push(task)
        this.closeDialog()
      })
    }
  
  closeDialog(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'open-task',
  templateUrl: './opentask.html',
  providers: [TasksService]
})
export class OpenTaskDialog {

  constructor(
    public dialogRef: MatDialogRef<OpenTaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Task, private taskService: TasksService) {}
    openData(task) {
        this.taskService.getTask(task).subscribe(task => {
          
        })
      
    }
  closeDialog(): void {
    this.dialogRef.close();
  }

}