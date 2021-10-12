import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(2)
  @Max(20)
  maxUserCount: number;
}
