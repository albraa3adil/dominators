import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  dataChange = new Subject()
  dataDropdown = new Subject()
  constructor(
    private db: AngularFirestore,
  ) { }

  delete(teacherId:any){
    this.db.collection('teacher').doc(teacherId).delete().catch((error) => {
      console.log(error);
      
  })
  }
  save(teacher:any){
    this.db.collection('teacher').add(teacher).catch((error) => {
      console.log(error);
      
  })
  }
  update(teacher: any){
    this.db.collection('teacher').doc(teacher.teacherId).update({name: teacher.name, email: teacher.email, password: teacher.password, role: teacher.role, subject: teacher.subject}).catch((error) => {
      console.log(error);
      
  })
  }
  getData () {
    // var data!:any[]
    this.db.collection('teacher').valueChanges({idField: 'teacherId'}).subscribe((res:any[])=>{
      console.log(res);
      this.dataChange.next(res)
  })
 
  }

  getDataDropdown () {
    // var data!:any[]
    this.db.collection('newSub').valueChanges({idField: 'subjectId'}).subscribe((res:any[])=>{
      console.log(res);
      this.dataDropdown.next(res)
  })
 
  }
}
