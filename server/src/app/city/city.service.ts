import { Injectable } from '@nestjs/common';
import { City } from './city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async getCities(): Promise<City[]> {
    return this.cityRepository.find();
  }

  async getCityWithBhus(id: number): Promise<City> {
    return this.cityRepository.findOne({
      where: { id: id },
      relations: { bhus: true },
    });
  }
}
