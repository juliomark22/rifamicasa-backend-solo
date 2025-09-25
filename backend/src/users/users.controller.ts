import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

@Controller("users")
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<User>) {
    return this.service.create(data);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() data: Partial<User>) {
    return this.service.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
