import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn,
} from "@angular/router";
import { SignalsService } from "../services/signals.service";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const signals = inject(SignalsService);
  const router = inject(Router);

  if (!signals.loginSignal()) {
    router.navigate(["auth/login"]);
    return false;
  }

  if (sessionStorage.getItem("login")) {
    const currentTime: Date = new Date();
    sessionStorage.setItem("lastAccessTime", currentTime.toISOString());
  }

  return true;
};
