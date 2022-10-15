import { Component, OnInit } from '@angular/core';
import { SubjectService } from './DBservice.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  showAdd: boolean = false;

  newRecord: any = {
     name:'',
      description:''
      }
  

  subjectResult:any[]=[]

  constructor(
    private service: SubjectService
  ) { }

  ngOnInit(): void {
    this.service.getData()
    this.service.dataChange.subscribe((res:any) => {
      this.subjectResult = res
      this.subjectResult.forEach((dept) => {
        dept.showEdit = false
      })
    })
  }

  onEdit(id:number, i:number){
    console.log(id);
    for (let x = 0; x < this.subjectResult.length; x++) {
      if (this.subjectResult[x].subjectId === id) {
        this.subjectResult[x].showEdit = true
      }else {
        this.subjectResult[x].showEdit = false
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
    for (let x = 0; x < this.subjectResult.length; x++) {
        this.subjectResult[x].showEdit = false
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
