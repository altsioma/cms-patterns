import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty, IsObject } from 'class-validator';

export class CreatePageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  components: string[];

  @ApiProperty({ type: Object })
  @IsObject()
  params: Record<string, object>;
}
