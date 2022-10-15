import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  dataChange = new Subject()
  dataDropdown = new Subject()
  constructor(
    private db: AngularFirestore,
    private _auth: AuthService
  ) { }

  delete(studentId:any){
    this.db.collection('students').doc(studentId).delete().catch((error) => {
      console.log(error);
      
  })
  }
  save(student:any){
    this.db.collection('students').add(student).catch((error) => {
      console.log(error); 
  })
  this._auth.registerUser({email: student.email, password: student.password})
  }
  update(student: any){
    this.db.collection('students').doc(student.studentId).update({name: student.name, email: student.email, password: student.password, class: student.class, role: student.role}).catch((error) => {
      console.log(error);
      
  })
  }
  getData () {
    // var data!:any[]
    this.db.collection('students').valueChanges({idField: 'studentId'}).subscribe((res:any[])=>{
      console.log(res);
      this.dataChange.next(res)
  })
 
  }
  getDataDropdown () {
    // var data!:any[]
    this.db.collection('class').valueChanges({idField: 'classId'}).subscribe((res:any[])=>{
      console.log(res);
      this.dataDropdown.next(res)
  })
 
  }
}
