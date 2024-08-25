import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TenantsService {
  url: string = "http://localhost:8080/api/tenants";

  constructor(private http: HttpClient) {}

  getAllTenants() {
    return this.http.get(this.url);
  }

  getAllTenantById(id: number) {
    return this.http.get(this.url + "/" + id.toString());
  }

  addTenant(name: string, email: string, isActive: boolean) {
    return this.http.post(this.url, { name, email, isActive });
  }
  editTenant() {}
  deleteTenant(id: number) {
    return this.http.delete(this.url + "/" + id.toString());
  }
  restoreTenant() {}
}
