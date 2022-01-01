export class User {
    constructor(
      private email: string,
      private idToken: string,
      private localId: string,
      // private expirationDate: Date
    ) {}
    get token(){
      return this.idToken
    }
  }