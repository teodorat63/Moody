import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateMoodDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  emoji!: string;
}
