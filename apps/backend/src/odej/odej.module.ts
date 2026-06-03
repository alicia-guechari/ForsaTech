import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Odej } from '../entities/odej.entity';
import { OdejService } from './odej.service';
import { OdejController } from './odej.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Odej])],
  providers: [OdejService],
  controllers: [OdejController],
  exports: [OdejService],
})
export class OdejModule { }
