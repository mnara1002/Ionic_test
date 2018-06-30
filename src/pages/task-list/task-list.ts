import { Component, ErrorHandler } from '@angular/core';
import { IonicPage, NavController, NavParams,
  ActionSheetController, AlertController } from 'ionic-angular';

/**
 * Generated class for the TaskListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {

  tasks: { name: string }[] = [
    /**{ name: 'タスク1' },
    { name: 'タスク2' },
    */
  ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionsheetCtrl: ActionSheetController, //ActionSheetControllerを呼び出す
              public alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));//localStorageからデータを取り出し、JSON文字列→配列へ変換
    }
  }

  changeTask(index: number) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'タスクの変更',
      buttons: [
        {
          text: '削除',
          role: 'destructive',
          handler: () => {
            this.tasks.splice(index, 1);
            localStorage.setItem('tasks',JSON.stringify(this.tasks));
          }
        }, {
          text: '変更',
          handler: () => {
            this._renameTask(index);
          }
        }, {
          text: '閉じる',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  _renameTask(index: number) {
    let prompt = this.alertCtrl.create({
      title: '変更後のタスク',
      inputs: [
        {
          name: 'task',
          placeholder: 'タスク',
          value: this.tasks[index].name
        },
      ],
      buttons: [
        {
          text: '閉じる'
        },
        {
          text: '保存',
          handler: data => {
            //タスクのindex番目を書き換え
            this.tasks[index] = { name: data.task };
            //localStorageに保存
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
          }
        }
      ]
    });
    prompt.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
  }
}

