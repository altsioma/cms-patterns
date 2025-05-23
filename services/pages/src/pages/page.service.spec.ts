import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PageService } from './page.service';
import { Page } from './page.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('PageService', () => {
  let service: PageService;

  const mockRepo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PageService,
        {
          provide: getRepositoryToken(Page),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<PageService>(PageService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('должен возвращать список страниц', async () => {
      const pages = [{ slug: 'page1' }, { slug: 'page2' }];
      mockRepo.find.mockResolvedValue(pages);

      const result = await service.findAll();
      expect(result).toEqual(pages);
      expect(mockRepo.find).toHaveBeenCalled();
    });
  });

  describe('findBySlug', () => {
    it('должен возвращать страницу по slug', async () => {
      const page = { slug: 'page1' };
      mockRepo.findOneBy.mockResolvedValue(page);

      const result = await service.findBySlug('page1');
      expect(result).toEqual(page);
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ slug: 'page1' });
    });
  });

  describe('create', () => {
    it('создаёт страницу, если slug уникальный', async () => {
      const dto = { slug: 'new-page', components: [], params: {} };
      mockRepo.findOneBy.mockResolvedValue(null); // нет страницы с таким slug
      mockRepo.create.mockReturnValue(dto);
      mockRepo.save.mockResolvedValue(dto);

      const result = await service.create(dto);
      expect(result).toEqual(dto);
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ slug: 'new-page' });
      expect(mockRepo.create).toHaveBeenCalledWith(dto);
      expect(mockRepo.save).toHaveBeenCalledWith(dto);
    });

    it('выбрасывает ConflictException, если slug уже существует', async () => {
      const dto = { slug: 'exist-page', components: [], params: {} };
      mockRepo.findOneBy.mockResolvedValue(dto); // страница найдена

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ slug: 'exist-page' });
      expect(mockRepo.create).not.toHaveBeenCalled();
      expect(mockRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('обновляет страницу, если она существует', async () => {
      const slug = 'page1';
      const existingPage = { slug, components: [], params: {} };
      const dto = {
        components: ['header'],
        params: { header: { title: 'Hi' } },
      };

      mockRepo.findOneBy.mockResolvedValue(existingPage);
      mockRepo.save.mockResolvedValue({ ...existingPage, ...dto });

      const result = await service.update(slug, dto);
      expect(result).toEqual({ ...existingPage, ...dto });
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ slug });
      expect(mockRepo.save).toHaveBeenCalledWith(expect.objectContaining(dto));
    });

    it('выбрасывает NotFoundException, если страницы нет', async () => {
      mockRepo.findOneBy.mockResolvedValue(null);
      await expect(service.update('not-exist', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('удаляет страницу, если она существует', async () => {
      const page = { slug: 'page1' };
      mockRepo.findOneBy.mockResolvedValue(page);
      mockRepo.remove.mockResolvedValue({});

      const result = await service.delete('page1');
      expect(result).toEqual({});
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ slug: 'page1' });
      expect(mockRepo.remove).toHaveBeenCalledWith(page);
    });

    it('выбрасывает NotFoundException, если страницы нет', async () => {
      mockRepo.findOneBy.mockResolvedValue(null);
      await expect(service.delete('no-page')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
