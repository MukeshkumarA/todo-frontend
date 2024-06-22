import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task/task.service';
import { Task } from '../../task/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  newTask: Task = { description: "", completed: false };
  tasks: Task[] = [];
  editingProcess: boolean = false;

  constructor(private taskService: TaskService) { }


  ngOnInit(): void {
    this.getAllTasks();
  }

  createTask(): void {
    this.taskService.createTask(this.newTask).subscribe((createdTask) => {
      this.newTask = { description: "", completed: false };
      this.getAllTasks();
    })
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    })
  }

  editTask(task: Task, inputElement: HTMLInputElement): void {
    this.tasks.forEach(t => {
      t.editing = false;
    })
    task.editing = !task.editing;
    setTimeout(() => {
      inputElement.focus();
    }, 0)
  }

  saveTask(editingTask: Task): void {
    this.taskService.updateTask(editingTask.id as number, editingTask).subscribe((updatedTask) => {
      const index = this.tasks.findIndex((task) => task.id === editingTask.id);
      if (index != -1) {
        this.tasks[index].description = editingTask.description;
        editingTask.editing = !editingTask.editing;
      }
    })
  }

  deleteTask(taskId: number | undefined): void {
    if (taskId) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.tasks = this.tasks.filter(t => t.id != taskId);
      })
    }
  }


}
