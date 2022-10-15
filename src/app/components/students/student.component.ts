import { Component, OnInit } from '@angular/core';
import { StudentService } from './DBservice.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  showAdd: boolean = false;

  newRecord: any = {
      id: 0,
       name:'',
        email:'',
         password: '',
         class: '',
         role: 3
        }
  

  studentResult: any[]=[]
  dropdownResult:any[]=[]

  constructor(
    private service: StudentService
  ) { }

  ngOnInit(): void {
    this.service.getData()
    this.service.dataChange.subscribe((res:any) => {
      this.studentResult = res
      this.studentResult.forEach((student) => {
        student.showEdit = false
      })
    })
    this.service.getDataDropdown()
    this.service.dataDropdown.subscribe((res:any) => {
      this.dropdownResult = res
    })
  }

  onEdit(id:number, i:number){
    console.log(id);
    for (let x = 0; x < this.studentResult.length; x++) {
      if (this.studentResult[x].studentId === id) {
        this.studentResult[x].showEdit = true
      }else {
        this.studentResult[x].showEdit = false
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
  onSaveEdit(subject: any) {
    this.service.update(subject)
    subject.showEdit = false
  }
  
  onCancel(){
    for (let x = 0; x < this.studentResult.length; x++) {
        this.studentResult[x].showEdit = false
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
