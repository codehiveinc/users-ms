import { Expose } from "class-transformer";

class CreateTokensResponseDto {
  @Expose()
  accessToken!: string;

  @Expose()
  refreshToken!: string;
}

export default CreateTokensResponseDto;
