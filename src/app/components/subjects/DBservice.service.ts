import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  
dataChange = new Subject()
dataDropdown = new Subject()
  constructor(
    private db: AngularFirestore,
  ) { }

  delete(subjectId:any){
    this.db.collection('newSub').doc(subjectId).delete().catch((error) => {
      console.log(error);
      
  })
  }
  save(subject:any){
    this.db.collection('newSub').add(subject).catch((error) => {
      console.log(error);
      
  })
  }
  update(subject: any){
    this.db.collection('newSub').doc(subject.subjectId).update({name: subject.name, description: subject.description}).catch((error) => {
      console.log(error);
      
  })
  }
  getData () {
    // var data!:any[]
    this.db.collection('newSub').valueChanges({idField: 'subjectId'}).subscribe((res:any[])=>{
      console.log(res);
      this.dataChange.next(res)
  })
 
  }
}
