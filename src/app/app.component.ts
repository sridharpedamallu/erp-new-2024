import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MainTopNavComponent } from "./common/main-top-nav/main-top-nav.component";
import { ThemeService } from "./services/theme.service";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, MainTopNavComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  constructor(
    public themeService: ThemeService,
    public authService: AuthService
  ) {
    this.themeService.currentTheme.set("dark");
    this.themeService.applyTheme("dark");
  }

  title = "angular-app";
}
