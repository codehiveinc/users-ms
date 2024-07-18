import { Expose } from "class-transformer";

class CreateUserResponseDto {
  @Expose()
  uuid!: string;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;

  @Expose()
  cellphone!: string;
}

export default CreateUserResponseDto;