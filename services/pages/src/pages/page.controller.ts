import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Pages')
@ApiBearerAuth()
@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get()
  findAll() {
    return this.pageService.findAll();
  }

  // Получить страницу по id
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.pageService.findBySlug(slug);
  }

  // Создать страницу (только для админа)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() dto: CreatePageDto) {
    return this.pageService.create(dto);
  }

  @Put(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('slug') slug: string, @Body() dto: CreatePageDto) {
    return this.pageService.update(slug, dto);
  }

  @Delete(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('slug') slug: string) {
    return this.pageService.delete(slug);
  }
}
