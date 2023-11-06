import { Controller, Get } from '@nestjs/common';
import { BhuService } from './bhu.service';

@Controller('api/v1/bhus')
export class BhuController {
  constructor(private readonly bhuService: BhuService) {}

  @Get()
  async getCities() {
    return await this.bhuService.getBhus();
  }
}
