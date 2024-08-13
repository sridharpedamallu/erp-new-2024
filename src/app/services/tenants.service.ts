import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TenantsService {
  url: string = "http://localhost:8080/tenants";

  constructor(private http: HttpClient) {}

  getAllTenants() {
    this.http.get(this.url);
  }

  addTenant() {}
  editTenant() {}
  deleteTenant() {}
  restoreTenant() {}
}
