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
    email: "sys.admin@erp.com",
    password: "",
    otpLogin: false,
    otp: "",
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private encryptService: EncryptServiceService
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
          this.authService.loggedInUser.set({ ...data });

          const dt = new Date();
          sessionStorage.setItem(
            "user",
            this.encryptService.encrypt(JSON.stringify(data))
          );
          sessionStorage.setItem("login", dt.toISOString());
          sessionStorage.setItem("lastAccessTime", dt.toISOString());
          this.authService.loginSignal.set(true);
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
