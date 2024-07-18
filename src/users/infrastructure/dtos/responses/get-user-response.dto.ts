import { Expose } from "class-transformer";

class GetUserResponseDto {
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

export default GetUserResponseDto;