import { NativeModules } from 'react-native';

type NativeMKExports = {
  generateMnemonic(): Promise<string>;
  derivePrivateKey(
    mnemonic: string,
    coinType: number,
    account: number,
    index: number
  ): Promise<string>;
};

export const MK: NativeMKExports = NativeModules.MnemonicKey;

export const BTC_COIN_TYPE = 0;

interface MnemonicKeyOptions {
  /**
   * Space-separated list of words for the mnemonic key.
   */
  mnemonic?: string;

  /**
   * BIP44 account number.
   */
  account?: number;

  /**
   * BIP44 index number
   */
  index?: number;

  /**
   * Coin type. Default is BTC, 0.
   */
  coinType?: number;
}

const DEFAULT_OPTIONS = {
  account: 0,
  index: 0,
  coinType: BTC_COIN_TYPE,
};

/**
 * Implements a BIP39 mnemonic wallet with standard key derivation from a word list. Note
 * that this implementation exposes the private key in memory, so it is not advised to use
 * for applications requiring high security.
 */
export class RNMnemonicKey {
  private constructor(public mnemonic: string, public privateKey: Buffer) {
    this.mnemonic = mnemonic;
  }

  static async createMnemonic() {
    return await MK.generateMnemonic();
  }

  static async getPrivateKeyForMnemonic(
    options: MnemonicKeyOptions = {}
  ): Promise<Buffer> {
    const { account, index, coinType } = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    let { mnemonic } = options;

    if (mnemonic === undefined) {
      throw new Error('No mnemonic was given');
    }

    const pkHex = await MK.derivePrivateKey(mnemonic, coinType, account, index);
    const privateKey = Buffer.from(pkHex, 'hex');

    if (!privateKey) {
      throw new Error('Failed to derive key pair');
    }

    return privateKey;
  }
}
