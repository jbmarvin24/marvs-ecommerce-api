import { Test, TestingModule } from '@nestjs/testing';
import { VoucherTypeController } from './voucher-type.controller';
import { VoucherTypeService } from './voucher-type.service';

describe('VoucherTypeController', () => {
  let controller: VoucherTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoucherTypeController],
      providers: [VoucherTypeService],
    }).compile();

    controller = module.get<VoucherTypeController>(VoucherTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
