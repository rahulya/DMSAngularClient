import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
//import { ProductsService } from 'src/app/Service/products.service';


@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.css']
})
export class DeletedialogComponent implements OnInit {
    actionType: any;
    ngOnInit(): void {


    }


    ngAfterViewInit() {
        this.actionType = "Customer"
    }
    message: string = "Are you sure?"
    confirmButtonText = "Yes"
    cancelButtonText = "Cancel"
    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<DeletedialogComponent>, private snackBar: MatSnackBar,
      ) {
        debugger
        if (data) {

            this.message = data.message || this.message;
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
           
        }
    }

    onConfirmClick(): void {
        debugger
       
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
        //const snack = this.snackBar.open('Snack bar open before dialog');
    }



}

