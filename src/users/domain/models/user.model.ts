class UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cellphone: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    cellphone: string,
    uuid: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.cellphone = cellphone;
    this.uuid = uuid;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default UserModel;