import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
//to add form we need formbuilder, formgroups and validator
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms';
import { iTask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup; //strict checking typescript 
  //! mark is used to inform todoForm will be intialized later in ngOnit or constructor.. if "!" is not used then it'll show error of todoForm is not intiliazed

  tasks : iTask[] = [];
  inprogress : iTask[] = [];
  done : iTask[] = [];
  updateIndex : any;
  isEditEnabled : boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.todoForm = this.fb.group({
        item : ['', Validators.required]
      })
  }

  addTask() {
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false
    })
    this.todoForm.reset();
  }

  deleteTask(i: number) {
    this.tasks.splice(i,1)
  }

  deleteInprogressTask(i: number) {
    this.inprogress.splice(i,1)
  }

  deleteDoneTask(i: number) {
    this.done.splice(i,1)
  }

  onEdit(item:iTask, i:number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i; //which index i want to update in array 
    this.isEditEnabled = true;
  }

  updateTask() {
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }
  drop(event: CdkDragDrop<iTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
