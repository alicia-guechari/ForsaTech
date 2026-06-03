import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApplicationStatus } from '../entities/application.entity';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) { }

    @Post(':opportunityId')
    apply(@Request() req: any, @Param('opportunityId') oppId: string) {
        return this.applicationsService.apply(req.user, oppId);
    }

    @Get('me')
    findByMe(@Request() req: any) {
        return this.applicationsService.findByMe(req.user);
    }

    @Get('odej')
    findByOdej(@Request() req: any) {
        return this.applicationsService.findByOdej(req.user);
    }

    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: ApplicationStatus) {
        return this.applicationsService.updateStatus(id, status);
    }
}
