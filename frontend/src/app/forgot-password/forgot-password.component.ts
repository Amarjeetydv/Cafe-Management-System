import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  responseMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private snackbarService: SnackbarService,
              private dialogRef: MatDialogRef<ForgotPasswordComponent>,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.createforgotPasswordForm();
  }

  createforgotPasswordForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({     
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]]     
    });
  }

  handleSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    
    this.ngxService.start();
    const data = this.forgotPasswordForm.value;

    this.userService.forgotPassword(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = response.message || 'Default Message'; // Adjust according to your response structure
        this.snackbarService.openSnackBar(this.responseMessage, '');
        
      },
      error: (error) => {
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
