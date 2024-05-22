import { POST_SignIn, POST_SignUp } from "modules/api/requests";
import { authStore } from "modules/auth/stores";
import { vaultService } from "modules/vault/services/vault";
import { vaultMigrationsService } from "modules/vault/services/vault-migrations";
import { storage } from "shared/libs/storage";
import { cryptoService } from "shared/services/crypto";
import { ValidationError } from "yup";

class AuthService {
  async initialize() {
    const publicKey = await storage.local.getItem("publicKey");
    const privateKey = await storage.local.getItem("privateKey");
    const hashedPassword = await storage.local.getItem("hashedPassword");
    const isSessionActive = await storage.session.getItem("isSessionActive");

    authStore.subscribe(async (state) => {
      if (state.privateKey) {
        await storage.local.setItem("privateKey", state.privateKey);
      } else {
        await storage.local.removeItem("publicKey");
      }

      if (state.publicKey) {
        await storage.local.setItem("publicKey", state.publicKey);
      } else {
        await storage.local.removeItem("publicKey");
      }

      if (state.hashedPassword) {
        await storage.local.setItem("hashedPassword", state.hashedPassword);
      } else {
        await storage.local.removeItem("hashedPassword");
      }

      await storage.session.setItem("isSessionActive", String(state.isSessionActive));
    });

    authStore.setState({
      publicKey,
      privateKey,
      hashedPassword,
      isSessionActive: isSessionActive === "true",
    });
  }

  clearSession() {
    authStore.setState({ publicKey: null, privateKey: null, hashedPassword: null, isSessionActive: false });
    vaultService.clear();
  }

  async signInWithKeys({ privateKey, publicKey }: { privateKey: string; publicKey: string }) {
    const res = await POST_SignIn({ publicKey });
    const vault = await vaultService.decryptVault(res.data.vault, privateKey);
    await vaultService.saveVault(vault);
    authStore.setState({ privateKey, publicKey });
  }

  async checkSession() {
    const { privateKey, publicKey } = authStore.getState();

    if (publicKey && privateKey) {
      try {
        await this.signInWithKeys({ publicKey, privateKey });
      } catch (e) {
        this.clearSession();
      }
    } else {
      this.clearSession();
    }

    authStore.setState({ isSessionChecked: true });
  }

  async createVault(recoveryKey: string) {
    const privateKey = cryptoService.generatePrivateKey(recoveryKey);
    const publicKey = cryptoService.generatePublicKey(privateKey);
    const encryptedVault = cryptoService.encrypt(JSON.stringify(vaultMigrationsService.create()), privateKey);
    await POST_SignUp({ publicKey, encryptedVault: JSON.stringify(encryptedVault) });
  }

  savePassword(password: string) {
    authStore.setState({ hashedPassword: cryptoService.hashPassword(password) });
  }

  isValidPassword(password: string) {
    return cryptoService.hashPassword(password) === authStore.getState().hashedPassword;
  }

  signInWithPassword(password: string) {
    if (this.isValidPassword(password)) {
      authStore.setState({ isSessionActive: true });
    } else {
      throw new ValidationError("Invalid password");
    }
  }

  async signIn(recoveryKey: string) {
    const privateKey = cryptoService.generatePrivateKey(recoveryKey);
    const publicKey = cryptoService.generatePublicKey(privateKey);
    await this.signInWithKeys({ privateKey, publicKey });
  }

  signOut() {
    this.clearSession();
  }
}

export const authService = new AuthService();
