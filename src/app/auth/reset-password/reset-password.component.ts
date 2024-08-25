import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-reset-password",
  standalone: true,
  imports: [ButtonModule, FormsModule, ToastModule, CommonModule],
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.scss",
  providers: [MessageService],
})
export class ResetPasswordComponent {
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  otp: string = "";
  otpGenerated: boolean = false;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  generateOTP() {
    this.authService.GenerateOTP(this.email).subscribe(
      (data: any) => {
        this.otpGenerated = true;
      },
      (e: any) => {
        this.messageService.add({
          severity: "error",
          summary: "Invalid Login",
          detail: e.error,
        });
      }
    );
  }

  verityOTP() {
    if (this.password != this.confirmPassword) {
      this.messageService.add({
        severity: "error",
        summary: "Password error",
        detail: "Password and confirm password should match. Please try again.",
      });
      return;
    }
    this.authService
      .VerifyOTP(this.email, this.otp, this.password)
      .subscribe((data: any) => {
        if (data.result) {
          setTimeout(() => {
            this.router.navigate(["/auth/login"]);
          }, 1000);
          this.messageService.add({
            severity: "success",
            summary: "Password reset",
            detail: "Password reset successfully!!!",
          });
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Password reset",
            detail: "Unable to reset password. Invalid OTP. Please try again.",
          });
        }
      });
  }
}
