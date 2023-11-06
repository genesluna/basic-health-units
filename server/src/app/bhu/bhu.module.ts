import { Module } from '@nestjs/common';
import { BhuService } from './bhu.service';
import { BhuController } from './bhu.controller';
import { Bhu } from './bhu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Bhu])],
  providers: [BhuService],
  controllers: [BhuController],
})
export class BhuModule {}
