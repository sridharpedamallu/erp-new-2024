import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn,
} from "@angular/router";
import { AuthService } from "../services/auth.service";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const loginService = inject(AuthService);
  const router = inject(Router);

  if (!loginService.loginSignal()) {
    router.navigate(["auth/login"]);
    return false;
  }

  if (sessionStorage.getItem("login")) {
    let sessionStartTime: Date = new Date(
      <string>sessionStorage.getItem("lastAccessTime")
    );
    const currentTime: Date = new Date();
    sessionStorage.setItem("lastAccessTime", currentTime.toISOString());
    // sessionStartTime = new Date(sessionStartTime.getTime() + 6000 * 300);
  }

  return true;
};
