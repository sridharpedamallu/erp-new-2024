import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { EncryptServiceService } from "../../services/encrypt.service";
import { SignalsService } from "../../services/signals.service";

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
    email: "test1@test111.com",
    password: "test",
    otpLogin: false,
    otp: "",
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private encryptService: EncryptServiceService,
    private signals: SignalsService
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
      this.authService.LoginAction({ ...this.data }).subscribe(
        (data: any) => {
          this.signals.loggedInUser.set({ ...data });
          const dt = new Date();
          sessionStorage.setItem("lastAccessTime", dt.toISOString());
          this.signals.loginSignal.set(true);
          this.router.navigate(["/"]);
        },
        (e: any) => {
          if (e.error == "Password reset required") {
            setTimeout(() => {
              this.router.navigate(["/auth/reset-password"]);
            }, 1000);
          }
          this.messageService.add({
            severity: "error",
            summary: "Invalid Login",
            detail: e.error,
          });
        }
      );
    }
  }
  GenerateOTPHandler() {
    // this.otpGenerated = true;
    // this.data.otp = "";
    // this.authService.GenerateOTP({ ...this.data });
  }
  ValidateOTPHandler() {
    // try {
    //   this.authService.VerifyOTP({ ...this.data });
    //   if (this.authService.loginSignal()) {
    //     this.router.navigate(["customer"]);
    //   }
    // } catch (error: any) {
    //   this.messageService.add({
    //     severity: "error",
    //     summary: "Invalid Login",
    //     detail: error,
    //   });
    // }
  }
}
