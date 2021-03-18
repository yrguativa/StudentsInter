import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  // UI
  pageIsLoad = false;
  errorMessage: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private transalte: TranslateService
  ) {}

  ngOnInit(): void {}

  signIn() {
    if (this.loginForm.valid) {
      this.pageIsLoad = true;
      this.authService
        .signIn(
          this.loginForm.controls['username'].value,
          this.loginForm.controls['password'].value
        )
        .then((res) => {
          this.pageIsLoad = false;
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          this.pageIsLoad = false;
          this.transalte.get('logIn.errorLogIn').subscribe(msg=>{
            this.errorMessage = msg;
          });          
        });
    }
  }
}
