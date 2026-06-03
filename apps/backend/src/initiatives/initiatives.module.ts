import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Initiative } from '../entities/initiative.entity';
import { InitiativeSupport } from '../entities/initiative-support.entity';
import { InitiativesService } from './initiatives.service';
import { InitiativesController } from './initiatives.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Initiative, InitiativeSupport])],
  providers: [InitiativesService],
  controllers: [InitiativesController],
  exports: [InitiativesService],
})
export class InitiativesModule { }
