// import { v4 as uuidv4 } from 'uuid';

export default class UuidProvider {
  public static getRandom(): string {
    // return uuidv4();
    // return window.crypto['randomUUID']();
    return crypto.randomUUID();
  }
}
