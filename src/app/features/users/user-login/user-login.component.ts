import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';
import { isObservable } from 'rxjs';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {

  userForm: FormGroup;
  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email',
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
  };
  constructor(private fb: FormBuilder,
    public auth: AuthService,
    private router: Router) {
    if (this.auth.user) {
      this.afterSignIn();
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
    });

    this.userForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  login() {
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']).then((user)=>{
      this.router.navigate(['/dashboard'])
      if(isObservable(user)){
        user.subscribe(u=>console.log('user--->',u));
      }      
    })
  }

  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password')) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                this.formErrors[field] += `${(messages as { [key: string]: string })[key]} `;
              }
            }
          }
        }
      }
    }
  }

  /// Shared

  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    return this.router.navigate(['./dashboard']);
  }

}