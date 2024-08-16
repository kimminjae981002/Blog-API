import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';

export class UpdateBoardDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;
}
