import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { WebapiServiceProvider } from '../../providers/webapi-service/webapi-service';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  //กำหนดตัวแปรผูกฟอร์ม (Model)

  userData = {
    "fullname": "",
    "email": "",
    "tel": "",
    "username": "",
    "password": ""
  }

  //ตัวแปรรับค่าข้อมูลจาก api
  responseData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public alertCtrl: AlertController,
    public webApi: WebapiServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  login() {
    //alert("OKK")
    //this.navCtrl.push(LoginPage);
    // this.app.getRootNav().push(LoginPage);
    this.navCtrl.setRoot(LoginPage);
  }
  gotoDashboard() {
    this.navCtrl.setRoot(TabsPage);
  }

  signup() {
    //alert( this.userData );
    //console.log(  this.userData );
    this.webApi.postData(this.userData, 'register.php').then((result) => {
      this.responseData = result;
      //console.log(result);
      if (this.responseData.userData) {
        let alert = this.alertCtrl.create({
          title: "สถานะการลงทะเบียน",
          subTitle: "ลงทะเบียนเรียบร้อยแล้ว",
          buttons: ['Dismiss']
        });

        alert.present();
        //ส่งกลับไปหน้า dashboard
        this.navCtrl.setRoot(TabsPage);
      }
    }, (err) => {
      console.log(err);
    });

  }

}
