import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateRpgDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsInt()
  @Min(1970)
  @Max(new Date().getFullYear())
  launchYear: number;
  @IsString()
  @IsNotEmpty()
  publisher: string;
  @IsString()
  @IsNotEmpty()
  author: string;
}
