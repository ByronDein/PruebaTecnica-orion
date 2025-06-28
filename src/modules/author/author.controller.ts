import { Controller, Post, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) { }

  @Post('/create')
  async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    try {
      const author = await this.authorService.create(createAuthorDto);
      return {
        message: 'Author created successfully',
        data: author,
      };
    } catch (error) {
      throw new HttpException('Error creating author', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAllAuthors() {
    try {
      const authors = await this.authorService.findAll();
      return {
        message: 'Authors retrieved successfully',
        data: authors,
      };
    } catch (error) {
      throw new HttpException('Error creating author', HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

}
