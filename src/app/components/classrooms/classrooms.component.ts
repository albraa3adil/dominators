import { Component, OnInit } from '@angular/core';
import { ClassroomService } from './DBservice.service';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {

  showAdd: boolean = false;

  newRecord: any = {
     name:'',
      capacity:0,
       projector: ''
      }
  

  classRoomResult:any[]=[]

  constructor(
    private service: ClassroomService
  ) { }

  ngOnInit(): void {
    this.service.getData()
    this.service.dataChange.subscribe((res:any) => {
      this.classRoomResult = res
      this.classRoomResult.forEach((classRoom) => {
        classRoom.showEdit = false
      })
    })
  }

  onEdit(id:number, i:number){
    console.log(id);
    for (let x = 0; x < this.classRoomResult.length; x++) {
      if (this.classRoomResult[x].classRoomId === id) {
        this.classRoomResult[x].showEdit = true
      }else {
        this.classRoomResult[x].showEdit = false
      }
    }
    
  }

  onAdd(){
    this.showAdd = true
  }
  onSave(){
    this.service.save(
      this.newRecord
    )
    this.showAdd = false
    this.newRecord.name = ''
    this.newRecord.capacity = 0
    this.newRecord.projector = ''
  }
  onDelete(id:any){
    console.log(id);
    
    this.service.delete(id)
  }
  onSaveEdit(classRoom: any) {
    this.service.update(classRoom)
    classRoom.showEdit = false
  }
  
  onCancel(){
    for (let x = 0; x < this.classRoomResult.length; x++) {
        this.classRoomResult[x].showEdit = false
    }
    
  }
  onCancelAdd(){
    this.showAdd = false
  }
  onScroll(e:any){
    // console.log(e);
    if (e.target.classList.contains("on-scrollbar") === false) {
      e.target.classList.add("on-scrollbar");
    }
  }

}
