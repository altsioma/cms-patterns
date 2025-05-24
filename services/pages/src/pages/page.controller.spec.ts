import { Test, TestingModule } from '@nestjs/testing';
import { PageController } from './page.controller';
import { PageService } from './page.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

describe('PageController', () => {
  let controller: PageController;

  const mockPageService = {
    findAll: jest.fn(),
    findBySlug: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  // моки guard-ов (всегда разрешают доступ, тесты логики guard определены в roles.guard)
  const mockAuthGuard = {
    canActivate: jest.fn(() => true),
  };
  const mockRolesGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PageController],
      providers: [
        {
          provide: PageService,
          useValue: mockPageService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockRolesGuard)
      .compile();

    controller = module.get<PageController>(PageController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('должен вернуть все страницы', async () => {
      const pages = [{ slug: 'page1' }, { slug: 'page2' }];
      mockPageService.findAll.mockResolvedValue(pages);

      const result = await controller.findAll();
      expect(result).toEqual(pages);
      expect(mockPageService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('должен вернуть страницу по slug', async () => {
      const page = { slug: 'page1' };
      mockPageService.findBySlug.mockResolvedValue(page);

      const result = await controller.findOne('page1');
      expect(result).toEqual(page);
      expect(mockPageService.findBySlug).toHaveBeenCalledWith('page1');
    });
  });

  describe('create', () => {
    it('должен создать страницу', async () => {
      const dto = { slug: 'new-page', components: [], params: {} };
      mockPageService.create.mockResolvedValue(dto);

      const result = await controller.create(dto);
      expect(result).toEqual(dto);
      expect(mockPageService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('должен обновить страницу', async () => {
      const dto = { slug: 'page1', components: ['header'], params: {} };
      mockPageService.update.mockResolvedValue(dto);

      const result = await controller.update('page1', dto);
      expect(result).toEqual(dto);
      expect(mockPageService.update).toHaveBeenCalledWith('page1', dto);
    });
  });

  describe('remove', () => {
    it('должен удалить страницу', async () => {
      mockPageService.delete.mockResolvedValue(undefined);

      const result = await controller.remove('page1');
      expect(result).toBeUndefined();
      expect(mockPageService.delete).toHaveBeenCalledWith('page1');
    });
  });
});
