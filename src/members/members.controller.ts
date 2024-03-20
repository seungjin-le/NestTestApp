import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MembersService } from "./members.service";

@ApiTags("members")
@Controller("members")
export class MembersController {
  constructor(private readonly membersService: MembersService) {}
  @Get()
  getAll() {
    return this.membersService.getAll({ page: 1, size: 10 });
  }
}
