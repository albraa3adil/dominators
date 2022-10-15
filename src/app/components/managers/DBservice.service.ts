import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  dataChange = new Subject()
  // dataDropdown = new Subject()
  constructor(
    private db: AngularFirestore,
  ) { }

  delete(managerId:any){
    this.db.collection('manager').doc(managerId).delete().catch((error) => {
      console.log(error);
      
  })
  }
  save(manager:any){
    this.db.collection('manager').add(manager).catch((error) => {
      console.log(error);
      
  })
  }
  update(manager: any){
    this.db.collection('manager').doc(manager.managerId).update({name: manager.name, email: manager.email, password: manager.password, role: manager.role}).catch((error) => {
      console.log(error);
      
  })
  }
  getData () {
    // var data!:any[]
    this.db.collection('manager').valueChanges({idField: 'managerId'}).subscribe((res:any[])=>{
      console.log(res);
      this.dataChange.next(res)
  })
 
  }

  
}

