import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  avatars = [
    'svg-1', 'svg-2', 'svg-3', 'svg-4'
  ];
  user: User;
  name = new FormControl('', [Validators.required]);

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<NewContactDialogComponent>) { }

  ngOnInit() {
    this.user = new User();
  }

  save() {
    this.userService.addUser(this.user).then(user => {
      this.dialogRef.close(user);
    });
  }

  dismiss() {
    this.dialogRef.close(null);
  }

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

}
