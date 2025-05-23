import {
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './page.entity';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepo: Repository<Page>,
  ) {}

  findAll() {
    return this.pageRepo.find();
  }

  findBySlug(slug: string) {
    return this.pageRepo.findOneBy({ slug });
  }

  async create(createPageDto: CreatePageDto): Promise<Page> {
    const { slug } = createPageDto;
    const existingPage = await this.findBySlug(slug);

    if (existingPage) {
      throw new ConflictException('Страница с таким slug уже существует');
    }

    const page = this.pageRepo.create(createPageDto);

    return this.pageRepo.save(page);
  }

  async update(slug: string, dto: UpdatePageDto) {
    const page = await this.findBySlug(slug);

    if (!page) {
      throw new NotFoundException('Страница не найдена');
    }

    // Обновляем содержимое page
    Object.assign(page, dto);
    return this.pageRepo.save(page);
  }

  async delete(slug: string) {
    const page = await this.findBySlug(slug);

    if (!page) {
      throw new NotFoundException('Страница не найдена');
    }

    return this.pageRepo.remove(page);
  }
}
