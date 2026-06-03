import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request, Query } from '@nestjs/common';
import { OdejService } from './odej.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('odej')
export class OdejController {
    constructor(private readonly odejService: OdejService) { }

    @Get()
    findAll(@Query('wilayaId') wilayaId?: number) {
        if (wilayaId) return this.odejService.findByWilaya(wilayaId);
        return []; // Return empty list or implement generic search
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    findMe(@Request() req: any) {
        return this.odejService.findByAdmin(req.user);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.odejService.findOne(id);
    }

    @Post()
    create(@Body() data: any) {
        return this.odejService.create(data);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: any) {
        return this.odejService.update(id, data);
    }
}
