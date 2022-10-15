import { Component, OnInit } from '@angular/core';
import { ClassService } from './DBservice.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  showAdd: boolean = false;

  newRecord: any = {
    id: 0,
    name:'',
    studentNum:0,
      
      }
  

      newClassResult:any[]=[]

  constructor(
    private service: ClassService
  ) { }

  ngOnInit(): void {
    this.service.getData()
    this.service.dataChange.subscribe((res:any) => {
      this.newClassResult = res
      this.newClassResult.forEach((newClass) => {
        newClass.showEdit = false
      })
    })
  }

  onEdit(id:number, i:number){
    console.log(id);
    for (let x = 0; x < this.newClassResult.length; x++) {
      if (this.newClassResult[x].newClassId === id) {
        this.newClassResult[x].showEdit = true
      }else {
        this.newClassResult[x].showEdit = false
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
    this.newRecord.studentNum = ''
  }
  onDelete(id:any){
    console.log(id);
    
    this.service.delete(id)
  }
  onSaveEdit(manager: any) {
    this.service.update(manager)
    manager.showEdit = false
  }
  onCancel(){
    for (let x = 0; x < this.newClassResult.length; x++) {
        this.newClassResult[x].showEdit = false
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
