import { CommonModule } from "@angular/common";
import { Component, isDevMode } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { TenantsService } from "../../services/tenants.service";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login-setup",
  standalone: true,
  imports: [
    CheckboxModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: "./login-setup.component.html",
  styleUrl: "./login-setup.component.scss",
  providers: [MessageService, ConfirmationService],
})
export class LoginSetupComponent {
  domainRestricted: boolean = false;
  clientLoginAccess: boolean = false;
  domainList: string[] = [];
  domain: string = "";
  tenantId: number = 0;

  isValidDomain(str: string) {
    // Regex to check valid Domain Name
    let regex = /^[A-Za-z0-9-]{1,63}\.[A-Za-z]{2,6}$/;
    let regexAdditional = /^[A-Za-z0-9-]{1,63}\.[A-Za-z]{2,6}\.[A-Za-z]{2,6}$/;

    // Check if the string is null or empty
    if (!str) {
      return false;
    }

    // Return true if the string matches the regex
    if (!regex.test(str)) {
      if (!regexAdditional.test(str)) {
        return false;
      }
    }

    return true;
  }

  constructor(
    private tenantService: TenantsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((e: any) => {
      this.tenantId = e.id;
      this.getSettings();
      console.log(this.domainList);
    });
  }

  addDomain() {
    if (
      this.domain != "" &&
      this.domainList.find((d: any) => d == this.domain) == undefined
    ) {
      if (!this.isValidDomain(this.domain)) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Invalid domain name",
        });
        return;
      }
      this.domainList.push(this.domain);
      this.domain = "";
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail:
          "Domain name can't be blank or domain already exists in the list",
      });
    }
  }

  deleteDomain(idx: number) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.domainList.splice(idx, 1);
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail:
            "Domain name removed from the list, this may cause all users with this domain can't access the system.",
        });
      },
    });
  }

  getSettings() {
    this.tenantService
      .getTenantLoginSetupData(this.tenantId)
      .subscribe((data: any) => {
        this.clientLoginAccess = data.loginSettings.clientLoginAccess;
        this.domainRestricted = data.loginSettings.domainRestricted;
        this.domainList = [...data.domains];
      });
  }

  saveSettings() {
    this.tenantService
      .setLoginSettings(this.tenantId, {
        clientLoginAccess: this.clientLoginAccess,
        domainRestricted: this.domainRestricted,
        domains: this.domainList,
      })
      .subscribe((data: any) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Settings saved successfully.",
        });
      });
  }
}
