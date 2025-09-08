import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  artist!: string;

  @IsUrl()
  @IsNotEmpty()
  url!: string;
}
