import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  dataChange = new Subject()

  constructor(
    private db: AngularFirestore,
  ) { }

  delete(classRoomId:any){
    this.db.collection('classRooms').doc(classRoomId).delete().catch((error) => {
      console.log(error);
      
  })
  }
  save(classRoom:any){
    this.db.collection('classRooms').add(classRoom).catch((error) => {
      console.log(error);
      
  })                
  // this.db.collectionGroup('hall').get().subscribe((event)=>{
  //   event.forEach(element => {
  //     console.log(element, classRoom);
  //     this.db.doc(element.ref.path).update({name:classRoom.name, capacity: classRoom.capacity, projector: classRoom.projector})
      
  //   });
  // })
  }
  update(classRoom: any){
    this.db.collection('classRooms').doc(classRoom.classRoomId).update({name: classRoom.name, capacity: classRoom.capacity, projector: classRoom.projector}).catch((error) => {
      console.log(error);
      
  })
}
  // this.db.collectionGroup('hall', ref => ref.where('idField', '==', classRoom.classRoomId))
  //                     .valueChanges().subscribe((res)=>{
  //                       console.log(res);
                        
  //  
//   let querySnapshot = await this.db
//     .collectionGroup('collectionGroupName')
//     .where('userId', '==', 'data.uid')
//     .get();
// querySnapshot.docs.forEach((snapshot:any) => {
//     snapshot.ref.update(...)
// })                   
  // this.db.collectionGroup('hall').get().subscribe((event)=>{
  //   event.forEach(element => {
  //     console.log(element, classRoom);
  //     if (element.ref.id == classRoom.classRoomId) {
  //       this.db.doc(element.ref.path).update({name:classRoom.name, capacity: classRoom.capacity, projector: classRoom.projector})
  //     }
      
  //   });
  // })
  // }
  getData () {
    // var data!:any[]
    this.db.collectionGroup('classRooms').valueChanges({idField: 'classRoomId'}).subscribe((res:any[])=>{
      console.log(res);
      this.dataChange.next(res)
  })
 
  }
}
