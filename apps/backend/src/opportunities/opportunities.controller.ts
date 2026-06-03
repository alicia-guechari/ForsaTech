import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('opportunities')
export class OpportunitiesController {
    constructor(private readonly opportunitiesService: OpportunitiesService) { }

    @Get()
    findAll(
        @Query('categoryId') categoryId?: number,
        @Query('wilayaId') wilayaId?: number,
        @Query('q') query?: string,
    ) {
        return this.opportunitiesService.findAll({ categoryId, wilayaId, query });
    }

    @UseGuards(JwtAuthGuard)
    @Get('recommendations')
    getRecommendations(@Request() req: any) {
        return this.opportunitiesService.getRecommendations(req.user);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.opportunitiesService.findOne(id);
    }

    @Post()
    create(@Body() data: any) {
        return this.opportunitiesService.create(data);
    }
}
