import { Injectable, signal } from "@angular/core";
import { EncryptServiceService } from "./encrypt.service";
import { HttpClient } from "@angular/common/http";
import { TenantsService } from "./tenants.service";
import { SignalsService } from "./signals.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url: string = "http://localhost:8080/api/auth";

  constructor(
    private encryptService: EncryptServiceService,
    private http: HttpClient,
    private tenantService: TenantsService,
    private signals: SignalsService
  ) {}

  LoginAction(data: any) {
    return this.http.post(this.url, {
      email: data.email,
      password: data.password,
    });
  }

  GenerateOTP(email: any) {
    return this.http.post(this.url + "/generate-otp", { email });
  }

  VerifyOTP(email: string, otp: string, password: string) {
    return this.http.post(this.url + "/verify-otp", { email, otp, password });
  }

  LogoutAction() {
    sessionStorage.clear();
    this.signals.loginSignal.set(false);
  }
}
