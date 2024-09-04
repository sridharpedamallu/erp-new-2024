import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SignalsService } from "./signals.service";

@Injectable({
  providedIn: "root",
})
export class TenantsService {
  url: string = "http://localhost:8080/api/tenants";

  constructor(private http: HttpClient, private signals: SignalsService) {}

  getAllTenants() {
    return this.http.get(this.url);
  }

  getAllTenantById(id: number) {
    return this.http.get(this.url + "/" + id.toString());
  }

  addTenant(name: string, email: string, phone: string, isActive: boolean) {
    const token = this.signals.loggedInUser().token;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });

    return this.http.post(
      this.url,
      { name, email, phone, isActive },
      { headers: headers }
    );
  }
  editTenant(
    id: number,
    name: string,
    email: string,
    phone: string,
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
        isActive,
      },
      { headers: headers }
    );
  }
  deleteTenant(id: number) {
    return this.http.delete(this.url + "/" + id.toString());
  }
  restoreTenant() {}
  getTenantLoginSetupData(id: number) {
    return this.http.get(this.url + "/login-settings/" + id.toString());
  }
  setLoginSettings(id: number, data: any) {
    return this.http.post(this.url + "/login-settings/" + id.toString(), {
      ...data,
    });
  }
}
