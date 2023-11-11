import { Controller, Get } from '@nestjs/common';
import { BhuService } from './bhu.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Basic health units')
@Controller('v1/bhus')
export class BhuController {
  constructor(private readonly bhuService: BhuService) {}

  @Get()
  @ApiOperation({ summary: 'Get basic health units list' })
  async getCities() {
    return await this.bhuService.getBhus();
  }
}
