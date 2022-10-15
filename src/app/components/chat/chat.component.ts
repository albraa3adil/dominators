import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {serverTimestamp, orderBy} from 'firebase/firestore';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  textToSend: string = ''
  isUser:boolean=true
  messages:any[]=[]
  constructor(
    private db: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.db.collection('messages',  ref => ref.orderBy('timestamp', 'desc')).valueChanges().subscribe((res:any) => {
      console.log(res);
      
        this.messages=res
      });
  }

  sendMessage() {
    this.db.collection("messages").add({
      message: this.textToSend,
      username: localStorage.getItem('user'),
      timestamp: serverTimestamp(),
      date: new Date().toISOString()
    }).then((resu:any)=>{
      console.log(resu);
      
    });
    this.textToSend = ''
  }

}
