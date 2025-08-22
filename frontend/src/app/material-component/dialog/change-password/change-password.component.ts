import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../../services/snackbar.service';
import { GlobalConstants } from '../../../shared/global-constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm:any = FormGroup;
  responseMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private snackbarService: SnackbarService,
              private dialogRef: MatDialogRef<ChangePasswordComponent>,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.changePassword();
  }

  changePassword(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  validateSubmit() {
    if (this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value) {
      return true;
    }
    else{
      return false;
    }
 }

 handleChangePasswordSubmit(){
  
  this.ngxService.start();
  var formdata = this.changePasswordForm.value;
  var data = {
    oldPassword:formdata.oldPassword,
    newPassword:formdata.newPassword,
    confirmPassword:formdata.confirmPassword
  }

  this.userService.changePassword(data).subscribe({
    next: (response: any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response.message || 'Default Message'; // Adjust according to your response structure
      this.snackbarService.openSnackBar(this.responseMessage, "Success");
    },
    error: (error) => {
      console.log(error);
      this.ngxService.stop();
      let errorMessage = GlobalConstants.genericError;
      if (error.error?.message) {
        errorMessage = error.error.message;
      }
      this.snackbarService.openSnackBar(errorMessage, GlobalConstants.error);
    }
  });
}
}

