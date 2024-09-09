import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";
import { ThemeService } from "../../services/theme.service";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { MenubarModule } from "primeng/menubar";
import { CommonModule } from "@angular/common";
import { SignalsService } from "../../services/signals.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-main-top-nav",
  standalone: true,
  imports: [ButtonModule, MenubarModule, CommonModule],
  templateUrl: "./main-top-nav.component.html",
  styleUrl: "./main-top-nav.component.scss",
})
export class MainTopNavComponent {
  sidebarVisible = false;
  items: MenuItem[] | undefined;
  userItems: MenuItem[] | undefined;
  contributorItems: MenuItem[] | undefined;
  adminItems: MenuItem[] | undefined;
  superUseritems: MenuItem[] | undefined;

  constructor(
    public themeService: ThemeService,
    private router: Router,
    public signals: SignalsService,
    private authService: AuthService
  ) {
    this.userItems = [
      {
        label: "Customers",
        icon: "pi pi-fw pi-users",
        routerLink: "customers/list",
      },
    ];

    this.contributorItems = [
      {
        label: "Customers",
        icon: "pi pi-fw pi-users",
        routerLink: "customers/list",
      },
      {
        label: "General Setup",
        icon: "pi pi-fw pi-users",
        routerLink: "customers/add",
      },
    ];
    this.adminItems = [
      {
        label: "Customers",
        icon: "pi pi-fw pi-users",
        routerLink: "customers/list",
      },
      {
        label: "General Setup",
        icon: "pi pi-fw pi-users",
        routerLink: "customers/add",
      },
      {
        label: "Users",
        icon: "pi pi-fw pi-users",
        routerLink: "customers/add",
      },
    ];

    this.superUseritems = [
      {
        label: "Tenants",
        icon: "pi pi-fw pi-users",
        items: [
          {
            label: "Add New",
            icon: "pi pi-fw pi-plus",
            routerLink: "tenants/add",
          },
          {
            label: "List",
            icon: "pi pi-fw pi-list",
            routerLink: "tenants/list",
          },
        ],
      },
      {
        label: "General Setup",
        icon: "pi pi-fw pi-users",
        routerLink: "tenants/add",
      },
    ];
    if (this.signals.loggedInUser()) {
      switch (this.signals.loggedInUser().userType) {
        case 999:
          this.items = [...this.superUseritems];
          break;
        case 1:
          this.items = [...this.userItems];
          break;
        case 2:
          this.items = [...this.contributorItems];
          break;
        case 9:
          this.items = [...this.adminItems];
          break;

        default:
          break;
      }
    }
  }

  switchTheme() {
    this.themeService.currentTheme.set(
      this.themeService.currentTheme() == "light" ? "dark" : "light"
    );
    this.themeService.applyTheme(this.themeService.currentTheme());
  }

  LogoutButtonHandler() {
    this.authService.LogoutAction();
    this.router.navigate(["/auth/login"]);
  }
}
