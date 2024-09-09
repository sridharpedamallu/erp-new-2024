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
    const token = this.signals.loggedInUser().token;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    return this.http.get(this.url, { headers: headers });
  }

  getAllTenantById(id: number) {
    const token = this.signals.loggedInUser().token;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    return this.http.get(this.url + "/" + id.toString(), { headers: headers });
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
    const token = this.signals.loggedInUser().token;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    return this.http.delete(this.url + "/" + id.toString(), {
      headers: headers,
    });
  }
  restoreTenant() {}
  getTenantLoginSetupData(id: number) {
    const token = this.signals.loggedInUser().token;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    return this.http.get(this.url + "/login-settings/" + id.toString(), {
      headers: headers,
    });
  }
  setLoginSettings(id: number, data: any) {
    const token = this.signals.loggedInUser().token;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    return this.http.post(
      this.url + "/login-settings/" + id.toString(),
      {
        ...data,
      },
      { headers: headers }
    );
  }
}
