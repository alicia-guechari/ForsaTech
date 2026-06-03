import { FaqService } from './faq.service';
export declare class FaqController {
    private readonly faqService;
    constructor(faqService: FaqService);
    search(q: string, wilayaId?: number): Promise<import("../entities/faq.entity").Faq[]>;
    create(data: any): Promise<import("../entities/faq.entity").Faq>;
}
