import { Test, TestingModule } from '@nestjs/testing';
import { VoucherTypeService } from './voucher-type.service';

describe('VoucherTypeService', () => {
  let service: VoucherTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoucherTypeService],
    }).compile();

    service = module.get<VoucherTypeService>(VoucherTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
