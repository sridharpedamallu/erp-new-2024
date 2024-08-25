import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  url: string = "http://localhost:8080/api/users";

  constructor(private http: HttpClient) {}

  getAllUsers(tenantId: number) {
    return this.http.get(this.url + "/tenant/" + tenantId.toString());
  }

  getUserById(id: number) {
    return this.http.get(this.url + "/" + id.toString());
  }

  addUser(
    name: string,
    email: string,
    phone: string,
    tenantId: number,
    userType: number,
    isActive: boolean
  ) {
    return this.http.post(this.url, {
      name,
      email,
      phone,
      tenantId,
      userType,
      isActive,
    });
  }
  editUser(
    id: number,
    name: string,
    email: string,
    phone: string,
    userType: number,
    isActive: boolean
  ) {
    return this.http.put(this.url + "/" + id.toString(), {
      name,
      email,
      phone,
      userType,
      isActive,
    });
  }
  deleteUser(id: number) {
    return this.http.delete(this.url + "/" + id.toString());
  }
  restoreUser() {}
}
