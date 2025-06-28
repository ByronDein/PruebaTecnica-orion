import { Controller, Post, Get, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/book.dto';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Post('create')
    async createBook(@Body() createBookDto: CreateBookDto) {
        try {
            const book = await this.bookService.create(createBookDto);
            return {
                message: "Book created successfully",
                data: book
            };
        } catch (error) {
            throw new HttpException('Error creating book', HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAllBooks() {
        try {
            const books = await this.bookService.findAll();
            return {
                message: 'Books retrieved successfully',
                data: books,
            };
        } catch (error) {
            throw new HttpException('Error retrieving books', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Get('avPagePerChapter')
    async getAvgPagePerChapter() {
        try {
            const avg = await this.bookService.getAvgpagePerChapter();
            return {
                message: 'Average pages per chapter retrieved successfully',
                data: avg,
            };
        } catch (error) {
            throw new HttpException('Error retrieving average pages per chapter', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

