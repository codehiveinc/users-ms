class AuthTokenModel {
  accessToken: string;
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

export default AuthTokenModel;
