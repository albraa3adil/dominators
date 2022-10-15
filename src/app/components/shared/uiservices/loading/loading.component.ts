import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})

export class LoadingComponent implements OnInit {

  isLoading = false;
  private loadingSubs: Subscription;

  constructor(
    private dialogRef: MatDialogRef<LoadingComponent>,
    private _loading: LoadingService
    ) { }

  ngOnInit() {
    this.dialogRef.disableClose = true;
    this.dialogRef.addPanelClass("load")
    this.loadingSubs = this._loading.loadingChanged.subscribe((isLoading:any) => {
      if ( isLoading !== true ) {
        this.dialogRef.close();
        
      }
      
    });
  }

}
