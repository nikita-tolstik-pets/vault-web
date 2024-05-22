import sha256 from "crypto-js/sha256";
import sjcl from "sjcl";

class CryptoService {
  generatePrivateKey(secret: string) {
    const privateKeyBitArray = sjcl.misc.pbkdf2(secret, [], 100000, length);
    const privateKey = sjcl.codec.hex.fromBits(privateKeyBitArray);

    return privateKey;
  }

  generatePublicKey(privateKey: string) {
    const publicKeyBitArray = sjcl.misc.pbkdf2(privateKey, [], 1, length);
    const publicKey = sjcl.codec.hex.fromBits(publicKeyBitArray);

    return publicKey;
  }

  hashPassword(password: string) {
    return sha256(password).toString();
  }

  encrypt(data: string, privateKey: string) {
    return sjcl.encrypt(privateKey, data);
  }

  decrypt(encrypted: sjcl.SjclCipherEncrypted, privateKey: string): string {
    return sjcl.decrypt(privateKey, encrypted);
  }
}

export const cryptoService = new CryptoService();
