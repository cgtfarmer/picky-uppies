// import { v4 as uuidv4 } from 'uuid.js';
export default class UuidProvider {
    static getRandom() {
        // return uuidv4();
        // return window.crypto['randomUUID']();
        return crypto.randomUUID();
    }
}
