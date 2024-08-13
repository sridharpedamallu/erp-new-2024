import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ToastModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  providers: [MessageService],
})
export class LoginComponent {
  otpGenerated: boolean = false;
  data: any = {
    loginId: "super@system.com",
    password: "test",
    otpLogin: false,
    otp: "",
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  SwitchLoginHandler(params: any) {
    this.data.otp = "";
    this.data.otpLogin = params.otpLogin;
    this.otpGenerated = false;
  }

  loginButtonHandler() {
    this.data.otp = "";
    this.data.otpLogin = false;
    if (this.data.otpLogin && this.data.otp.toString().length > 0) {
      this.ValidateOTPHandler();
    } else {
      try {
        this.authService.LoginAction({ ...this.data });
        if (this.authService.loginSignal()) {
          if (this.authService.loggedInUser().userType == 999) {
            this.router.navigate(["/tenants/list"]);
          } else {
            this.router.navigate(["/"]);
          }
        }
      } catch (error: any) {
        this.messageService.add({
          severity: "error",
          summary: "Invalid Login",
          detail: error,
        });
      }
    }
  }
  GenerateOTPHandler() {
    this.otpGenerated = true;
    this.data.otp = "";
    this.authService.GenerateOTP({ ...this.data });
  }
  ValidateOTPHandler() {
    try {
      this.authService.VerifyOTP({ ...this.data });
      if (this.authService.loginSignal()) {
        this.router.navigate(["customer"]);
      }
    } catch (error: any) {
      this.messageService.add({
        severity: "error",
        summary: "Invalid Login",
        detail: error,
      });
    }
  }
}
