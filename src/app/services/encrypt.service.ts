import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class EncryptServiceService {
  secretKey = "your_secret_key";

  constructor() {}

  encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.secretKey).toString();
  }

  decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.secretKey).toString(
      CryptoJS.enc.Utf8
    );
  }
}
