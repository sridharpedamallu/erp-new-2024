import { Injectable, signal } from "@angular/core";
import { EncryptServiceService } from "./encrypt.service";
import { HttpClient } from "@angular/common/http";

interface IUser {
  userName: string;
  phone: string;
  password: string;
  companyId: number;
  userType: EUserType;
}

enum EUserType {
  "client_support" = 1,
  "client_user" = 2,
  "system_admin" = 999,
}

const users: IUser[] = [
  {
    userName: "test@client.com",
    phone: "1231231231",
    password: "test",
    companyId: 1,
    userType: EUserType.client_support,
  },
  {
    userName: "test1@client.com",
    phone: "1231231232",
    password: "test",
    companyId: 1,
    userType: EUserType.client_user,
  },
  {
    userName: "super@system.com",
    phone: "9999999999",
    password: "test",
    companyId: 9999,
    userType: EUserType.system_admin,
  },
];

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url: string = "http://localhost:8080/api/auth";
  loginSignal = signal(false);
  loggedInUser = signal(<IUser>{});
  loginError = signal(false);
  loginErrorMessage = signal("");

  constructor(
    private encryptService: EncryptServiceService,
    private http: HttpClient
  ) {
    if (sessionStorage.getItem("user")) {
      this.loginSignal.set(true);
      this.loggedInUser.set(
        <IUser>(
          JSON.parse(
            this.encryptService.decrypt(<string>sessionStorage.getItem("user"))
          )
        )
      );
    }
  }

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
    this.loginSignal.set(false);
  }
}
