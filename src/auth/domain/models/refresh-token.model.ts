class RefreshTokenModel {
  id: number;
  userUUID: string;
  token: string;
  expiresIn: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    userUUID: string,
    token: string,
    expiresIn: Date,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.userUUID = userUUID;
    this.token = token;
    this.expiresIn = expiresIn;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default RefreshTokenModel;
