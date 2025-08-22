import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent implements OnInit {
  displayedColumn:string[] = ['name','email','contactNumber','status'];
  dataSource:any;
  responseMessage:any;

  constructor(private ngxService:NgxUiLoaderService,
    private userService:UserService,
    private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData(){
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      },
      error: (error:any) => {
        this.ngxService.stop();
        
        let errorMessage = GlobalConstants.genericError;
        if (error.error?.message) {
          errorMessage = error.error.message;
        }
        this.snackbarService.openSnackBar(errorMessage, GlobalConstants.error);
      }
    });
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleChangeAction(status:any,id:any){
    this.ngxService.start();
    var data={
      status:status.toString(),
      id:id
    }
    this.userService.update(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage,"Success");
      },
      error: (error:any) => {
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
