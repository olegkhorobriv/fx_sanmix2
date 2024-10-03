import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  taskForm: FormGroup;
  notificationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      dueDate: ['', Validators.required]
    });

    this.notificationForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Можеш додати тут ініціалізацію даних, якщо потрібно
  }

  onSubmitTask(): void {
    if (this.taskForm.valid) {
      const taskData = {
        text: this.taskForm.value.description, // виправлено
        dueDate: new Date(this.taskForm.value.dueDate),
      };

      this.taskService.createTask(taskData).subscribe(
        response => {
          console.log('Task created successfully', response);
        },
        error => {
          console.error('Error creating task', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  onSubmitNotification(): void {
    if (this.notificationForm.valid) {
      const notificationData = { text: this.notificationForm.value.message };

      this.notificationService.createNotification(notificationData).subscribe(response => {
        console.log('Notification created:', response);
        this.notificationForm.reset();
      });
    }
  }
}
