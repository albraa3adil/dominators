import { Component, OnInit } from '@angular/core';
import { StudentService } from '../students/DBservice.service';
import { TeacherService } from './DBservice.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  showAdd: boolean = false;

  newRecord: any = {
    id: 0,
     name:'',
      email:'',
       password: '',
       subject: '',
       role: 2
      }
  

  teacherResult:any[]=[]
  dropdownResult:any[]=[]

  constructor(
    private service: TeacherService
  ) { }

  ngOnInit(): void {
    this.service.getData()
    this.service.dataChange.subscribe((res:any) => {
      this.teacherResult = res
      this.teacherResult.forEach((teacher) => {
        teacher.showEdit = false
      })
    })
    this.service.getDataDropdown()
    this.service.dataDropdown.subscribe((res:any) => {
      this.dropdownResult = res
    })
  }

  onEdit(id:number, i:number){
    console.log(id);
    for (let x = 0; x < this.teacherResult.length; x++) {
      if (this.teacherResult[x].teacherId === id) {
        this.teacherResult[x].showEdit = true
      }else {
        this.teacherResult[x].showEdit = false
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
    this.newRecord.description = ''
  }
  onDelete(id:any){
    console.log(id);
    
    this.service.delete(id)
  }
  onSaveEdit(teacher: any) {
    this.service.update(teacher)
    teacher.showEdit = false
  }
  
  onCancel(){
    for (let x = 0; x < this.teacherResult.length; x++) {
        this.teacherResult[x].showEdit = false
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
