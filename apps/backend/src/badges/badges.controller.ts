import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('badges')
@UseGuards(JwtAuthGuard)
export class BadgesController {
    constructor(private readonly badgesService: BadgesService) { }

    @Get('me')
    findByMe(@Request() req: any) {
        return this.badgesService.findByMe(req.user);
    }
}
