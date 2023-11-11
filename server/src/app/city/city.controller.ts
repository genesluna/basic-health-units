import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { CityService } from './city.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cities')
@Controller('v1/cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  @ApiOperation({ summary: 'Get cities list' })
  async getCities() {
    return await this.cityService.getCities();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get city with basic health units' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getCityWithBhus(@Param('id', ParseIntPipe) id: number) {
    const cityWithBhus = await this.cityService.getCityWithBhus(id);
    if (!cityWithBhus) throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    return cityWithBhus;
  }
}
