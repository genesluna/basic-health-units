import { Controller, Get } from '@nestjs/common';
import { BhuService } from './bhu.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('basic health units')
@Controller('v1/bhus')
export class BhuController {
  constructor(private readonly bhuService: BhuService) {}

  @Get()
  async getCities() {
    return await this.bhuService.getBhus();
  }
}
