import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { InitiativesService } from './initiatives.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('initiatives')
export class InitiativesController {
    constructor(private readonly initiativesService: InitiativesService) { }

    @Get()
    findAll(@Query('wilayaId') wilayaId?: number) {
        return this.initiativesService.findAll(wilayaId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.initiativesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req: any, @Body() data: any) {
        return this.initiativesService.create(req.user, data);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/support')
    support(@Request() req: any, @Param('id') id: string) {
        return this.initiativesService.support(req.user, id);
    }
}
