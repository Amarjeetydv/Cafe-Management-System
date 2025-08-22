import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	// signupForm!: FormGroup;
	responseMessage: string = '';
	data: any;
  
	constructor(private dashboardService:DashboardService,
				private snackbarService: SnackbarService,
				private ngxService: NgxUiLoaderService) { }
	
	ngAfterViewInit() {
		this.dashboardData();
	}
	
     dashboardData(){
		this.ngxService.start();
		this.dashboardService.getDetails().subscribe({
			next: (response: any) => {
			  this.ngxService.stop();
			  this.data = response;
			  this.responseMessage = response.message || 'Dashboard data loaded successfully';
			},
			error: (error) => {
			  this.ngxService.stop();
			  console.log(error);
			  let errorMessage = GlobalConstants.genericError;
			  if (error.error?.message) {
				errorMessage = error.error.message;
			  }
			  this.snackbarService.openSnackBar(errorMessage, GlobalConstants.error);
			}
		  });
	 }	  
	}

  
