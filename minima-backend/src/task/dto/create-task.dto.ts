import { IsEnum, IsNotEmpty, IsOptional, IsString, IsBoolean, IsInt } from "class-validator"
import { Priority, Day, Tag } from "@prisma/client"

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsEnum(Priority)
  priority: Priority

  @IsEnum(Day)
  day: Day

  @IsEnum(Tag)
  tag: Tag

  @IsOptional()
  @IsBoolean()
  completed?: boolean

  @IsString()
  @IsNotEmpty()
  username: string
}
