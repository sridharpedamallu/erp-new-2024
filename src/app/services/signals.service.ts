import { Injectable, signal } from "@angular/core";
import { UserTypes } from "../enums";

interface IUser {
  name: string;
  phone: string;
  email: string;
  password: string;
  tenantId: number;
  userType: UserTypes;
  token: string;
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
