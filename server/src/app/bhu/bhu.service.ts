import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bhu } from './bhu.entity';

@Injectable()
export class BhuService {
  constructor(
    @InjectRepository(Bhu)
    private readonly bhuRepository: Repository<Bhu>,
  ) {}

  async getBhus(): Promise<Bhu[]> {
    return this.bhuRepository.find();
  }
}
