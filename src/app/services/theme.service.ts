import { Inject, Injectable, signal } from "@angular/core";
import { DOCUMENT } from "@angular/common";
enum styles {
  DARK = "md-dark-indigo",
  LIGHT = "md-light-indigo",
}

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  currentTheme = signal("light");

  constructor(@Inject(DOCUMENT) private document: Document) {}

  applyTheme = (theme: string = "light") => {
    localStorage.setItem("theme", theme);
    this.currentTheme.set(<string>localStorage.getItem("theme"));

    let themeLink = this.document.getElementById(
      "app-theme"
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = this.getStyleSheetName(theme) + ".css";
    }
  };

  getStyleSheetName = (theme: string) => {
    return theme == "dark" ? styles.DARK : styles.LIGHT;
  };
}
