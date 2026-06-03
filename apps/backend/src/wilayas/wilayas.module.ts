import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wilaya } from '../entities/wilaya.entity';
import { WilayasService } from './wilayas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wilaya])],
  providers: [WilayasService],
  exports: [WilayasService],
})
export class WilayasModule { }
