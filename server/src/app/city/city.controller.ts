import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('api/v1/cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getCities() {
    return await this.cityService.getCities();
  }

  @Get(':id')
  async getCityWithBhus(@Param('id', ParseIntPipe) id: number) {
    return await this.cityService.getCityWithBhus(id);
  }
}
