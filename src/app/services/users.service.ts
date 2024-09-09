import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SignalsService } from "./signals.service";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  url: string = "http://localhost:8080/api/users";

  constructor(private http: HttpClient, private signals: SignalsService) {}

  getAllUsers(tenantId: number) {
    const token = this.signals.loggedInUser().token;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    return this.http.get(this.url + "/tenant/" + tenantId.toString(), {
      headers: headers,
    });
  }

  getUserById(id: number) {
    const token = this.signals.loggedInUser().token;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    return this.http.get(this.url + "/" + id.toString(), { headers: headers });
  }

  addUser(
    name: string,
    email: string,
    phone: string,
    tenantId: number,
    userType: number,
    isActive: boolean
  ) {
    const token = this.signals.loggedInUser().token;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    return this.http.post(
      this.url,
      {
        name,
        email,
        phone,
        tenantId,
        userType,
        isActive,
      },
      { headers: headers }
    );
  }
  editUser(
    id: number,
    name: string,
    email: string,
    phone: string,
    userType: number,
    isActive: boolean
  ) {
    const token = this.signals.loggedInUser().token;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    return this.http.put(
      this.url + "/" + id.toString(),
      {
        name,
        email,
        phone,
        userType,
        isActive,
      },
      { headers: headers }
    );
  }
  deleteUser(id: number) {
    const token = this.signals.loggedInUser().token;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    return this.http.delete(this.url + "/" + id.toString(), {
      headers: headers,
    });
  }
  restoreUser() {}
}
