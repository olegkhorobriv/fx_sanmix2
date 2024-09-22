import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  taskForm: FormGroup;
  notificationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      dueDate: ['', Validators.required]
    });

    this.notificationForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmitTask() {
    if (this.taskForm.valid) {
      console.log('Task:', this.taskForm.value);
      this.taskForm.reset();
    }
  }

  onSubmitNotification() {
    if (this.notificationForm.valid) {
      console.log('Notification:', this.notificationForm.value);
      this.notificationForm.reset();
    }
  }
}
