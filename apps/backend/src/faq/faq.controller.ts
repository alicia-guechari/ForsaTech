import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { FaqService } from './faq.service';

@Controller('faq')
export class FaqController {
    constructor(private readonly faqService: FaqService) { }

    @Get('search')
    search(@Query('q') q: string, @Query('wilayaId') wilayaId?: number) {
        return this.faqService.search(q, wilayaId);
    }

    @Post()
    create(@Body() data: any) {
        return this.faqService.create(data);
    }
}
