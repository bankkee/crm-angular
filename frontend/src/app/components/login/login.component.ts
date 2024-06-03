import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup | undefined;
  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.loginForm) {
      if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;
        this.loginForm.disable();

        this.authService.login(username, password).subscribe(
          () => {
            alert('Login successful');
            this.loginForm?.enable();
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            alert('Login failed : ' + error.message);
            this.loginForm?.enable();
          }
        );
      }
    }
  }
}
