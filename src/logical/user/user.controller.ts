import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

interface BodyRequest {
  username: string;
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('find-one')
  async findOne(@Body() body: BodyRequest): Promise<any> {
    const res = this.userService.findOne(body);
    return res;
  }
}
