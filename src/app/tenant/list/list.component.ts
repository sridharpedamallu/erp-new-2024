import { Component, OnInit } from "@angular/core";
import { TenantsService } from "../../services/tenants.service";
import { CommonModule } from "@angular/common";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { RouterModule } from "@angular/router";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss",
  providers: [MessageService, ConfirmationService],
})
export class ListComponent implements OnInit {
  tenantList: any[] = [];

  constructor(
    private tenantService: TenantsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.loadList();
  }

  loadList() {
    this.tenantService.getAllTenants().subscribe((data: any) => {
      this.tenantList = [...data];
    });
  }
  deleteTenant(id: number) {
    console.log(id);
    this.confirmationService.confirm({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.tenantService.deleteTenant(id).subscribe((data: any) => {
          this.messageService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "Tenant Deleted Successfully",
          });
          this.loadList();
        });
      },
      reject: () => {},
    });
  }
}
