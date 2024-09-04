import { Injectable, signal } from "@angular/core";

interface IUser {
  name: string;
  phone: string;
  email: string;
  password: string;
  tenantId: number;
  userType: EUserType;
  token: string;
}

enum EUserType {
  "client_support" = 1,
  "client_user" = 2,
  "system_admin" = 999,
}

@Injectable({
  providedIn: "root",
})
export class SignalsService {
  loginSignal = signal(false);
  loggedInUser = signal(<IUser>{});
  loginError = signal(false);
  loginErrorMessage = signal("");

  constructor() {}
}
