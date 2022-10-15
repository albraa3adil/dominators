import { Component, OnInit } from '@angular/core';
import { ManagerService } from './DBservice.service';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss']
})
export class ManagersComponent implements OnInit {

  showAdd: boolean = false;

  newRecord: any = {
    id: 0,
     name:'',
      email:'',
       password: '',
       role: 1
      }
  
  

  managerResult:any[]=[]

  constructor(
    private service: ManagerService
  ) { }

  ngOnInit(): void {
    this.service.getData()
    this.service.dataChange.subscribe((res:any) => {
      this.managerResult = res
      this.managerResult.forEach((manager) => {
        manager.showEdit = false
      })
    })
  }

  onEdit(id:number, i:number){
    console.log(id);
    for (let x = 0; x < this.managerResult.length; x++) {
      if (this.managerResult[x].managerId === id) {
        this.managerResult[x].showEdit = true
      }else {
        this.managerResult[x].showEdit = false
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
  onSaveEdit(manager: any) {
    this.service.update(manager)
    manager.showEdit = false
  }
  
  onCancel(){
    for (let x = 0; x < this.managerResult.length; x++) {
        this.managerResult[x].showEdit = false
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
