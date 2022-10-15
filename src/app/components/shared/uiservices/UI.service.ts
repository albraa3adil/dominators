import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { MessageBoxService } from '../../messagebox/message-box.service';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  loadingStateChanged = new Subject<boolean>();
  fsValue= new Subject<string>()
  notDone:boolean
constructor(
  // private _msg:MessageBoxService
  ) { 
  this.loadingStateChanged.subscribe((res)=>{
    if (res){
      this.callTimeOut()
    }
  })
}

callTimeOut(){
  this.notDone=true
setTimeout(()=>{
  if(this.notDone){
    this.loadingStateChanged.next(false)
    // this._msg.showError("timeout")
  }
},2000)
}

}
