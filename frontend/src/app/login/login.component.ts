import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  responseMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private snackbarService: SnackbarService,
              private dialogRef: MatDialogRef<LoginComponent>,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.createloginForm();
  }

  createloginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required]]
    });
  }

  handleSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.ngxService.start();
    const data = this.loginForm.value;

    this.userService.login(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = response.message || 'Default Message'; // Adjust according to your response structure
        localStorage.setItem('token',response.token);
        this.router.navigate(['/cafe/dashboard']);
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

