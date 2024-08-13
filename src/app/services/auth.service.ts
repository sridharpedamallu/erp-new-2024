import { Injectable, signal } from "@angular/core";
import { EncryptServiceService } from "./encrypt.service";
import { Router } from "@angular/router";

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
  loginSignal = signal(false);
  loggedInUser = signal(<IUser>{});

  constructor(
    private encryptService: EncryptServiceService,
    private router: Router
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
    const u = users.find(
      (user: any) =>
        user.userName == data.loginId && user.password == data.password
    );
    if (u) {
      this.loggedInUser.set({ ...u });

      const dt = new Date();
      sessionStorage.setItem(
        "user",
        this.encryptService.encrypt(JSON.stringify(u))
      );
      sessionStorage.setItem("login", dt.toISOString());
      sessionStorage.setItem("lastAccessTime", dt.toISOString());
      this.loginSignal.set(true);
    } else {
      throw "Invalid User credentials";
    }
  }

  GenerateOTP(data: any) {
    const otp = "123123";
    console.log(otp);
    return otp;
  }

  VerifyOTP(data: any) {
    if (data.loginId == "test" && data.otp == "123123") {
      this.loginSignal.set(true);
    } else {
      throw "Invalid OTP / User name";
    }
  }

  LogoutAction() {
    sessionStorage.clear();
    this.loginSignal.set(false);
  }
}
