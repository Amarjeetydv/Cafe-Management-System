import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  responseMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private snackbarService: SnackbarService,
              private dialogRef: MatDialogRef<SignupComponent>,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.createSignupForm();
  }

  createSignupForm(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password: [null, [Validators.required]],
    });
  }

  handleSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }
    
    this.ngxService.start();
    const data = this.signupForm.value;

    this.userService.signup(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = response.message || 'Default Message'; // Adjust according to your response structure
        this.snackbarService.openSnackBar(this.responseMessage, '');
        this.router.navigate(['/']);
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
