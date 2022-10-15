import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  dataChange = new Subject()
  // dataDropdown = new Subject()
  constructor(
    private db: AngularFirestore,
  ) { }

  delete(newClassId:any){
    this.db.collection('newClass').doc(newClassId).delete().catch((error) => {
      console.log(error);
      
  })
  }
  save(newClass:any){
    this.db.collection('newClass').add(newClass).catch((error) => {
      console.log(error);
      
  })
  }
  update(newClass: any){
    this.db.collection('newClass').doc(newClass.newClassId).update({name: newClass.name, studentNum: newClass.studentNum}).catch((error) => {
      console.log(error);
      
  })
  }
  getData () {
    // var data!:any[]
    this.db.collection('newClass').valueChanges({idField: 'newClassId'}).subscribe((res:any[])=>{
      console.log(res);
      this.dataChange.next(res)
  })
 
  }

}
