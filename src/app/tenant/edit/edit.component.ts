import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { TenantsService } from "../../services/tenants.service";

@Component({
  selector: "app-edit",
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, RouterModule, FormsModule],
  templateUrl: "./edit.component.html",
  styleUrl: "./edit.component.scss",
})
export class EditComponent {
  id: number | null = null;
  name: string = "";
  email: string = "";
  isActive: boolean = false;

  constructor(
    private tenantsService: TenantsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((e: any) => {
      this.id = e.id;
      this.loadTenant();
    });
  }
  loadTenant() {
    if (this.id != null) {
      this.tenantsService.getAllTenantById(this.id).subscribe((data: any) => {
        this.name = data.name;
        this.email = data.email;
        this.isActive = data.isActive;
      });
    }
  }
}
