import { Component } from '@angular/core';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  title: string = "タスク登録";
  tasks: { name: string }[] = [
    { name: 'タスク1' },
    { name: 'タスク2' }
  ];
  task: string;//変数"task"を宣言
  constructor() {
  }
//関数"addTask"を定義
  addTask() {
    this.tasks.push({
      name: this.task //ユーザーが入力したタスクを追加
    });
    //タスク永続化に
    localStorage.setItem('tasks', JSON.stringify(this.tasks));//入力データをstring型（JSON文字列）へ変換
    this.task = '';//<ion-input>を空にして、次の入力に備える
  }
//関数"ionViewWillEnter"を定義
  ionViewWillEnter() {
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));//localStorageからデータを取り出し、JSON文字列→配列へ変換
    }
  }
}
