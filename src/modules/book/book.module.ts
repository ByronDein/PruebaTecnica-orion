import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book, BookSchema } from './schemas/book.schema';
import { Author, AuthorSchema } from '../author/schemas/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Author.name, schema: AuthorSchema } 
    ])
  ],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService]
})
export class BookModule {}
