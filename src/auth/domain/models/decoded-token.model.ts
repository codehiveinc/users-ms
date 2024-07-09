class DecodedTokenModel {
  uuid: string;
  email: string;
  exp: number;

  constructor(uuid: string, email: string, expiration: number) {
    this.uuid = uuid;
    this.email = email;
    this.exp = expiration;
  }
}

export default DecodedTokenModel;
