import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Author, AuthorDocument } from '../author/schemas/author.schema';
import { CreateBookDto } from './dto/book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
        @InjectModel(Author.name) private authorModel: Model<AuthorDocument>, 
    ) { }

    async create(createBookDto: CreateBookDto): Promise<Book> {
        const lastBook = await this.bookModel.findOne().sort({ id: -1 }).exec();
        const nextId = lastBook ? lastBook.id + 1 : 1;

        let authorObjectIds: Types.ObjectId[] = [];
        if (createBookDto.authorIds && createBookDto.authorIds.length > 0) {
            authorObjectIds = createBookDto.authorIds.map(id => new Types.ObjectId(id));
        }

        const newBook = new this.bookModel({
            id: nextId,
            title: createBookDto.title,
            chapters: createBookDto.chapters,
            pages: createBookDto.pages,
            authors: authorObjectIds,
        });

        const savedBook = await newBook.save();

        if (authorObjectIds.length > 0) {
            await this.authorModel.updateMany(
                { _id: { $in: authorObjectIds } }, 
                { $addToSet: { books: savedBook._id } } 
            ).exec();
            
        }

        return savedBook;
    }

    async findAll(): Promise<Book[]> {
        return this.bookModel
            .find()
            .populate('authors', 'id name')
            .exec();
    }

    async getAvgpagePerChapter(): Promise<number> {
        const books = await this.bookModel.find().exec();
        if (books.length === 0) return 0;
        const totalChapters = books.reduce((sum, book) => sum + book.chapters, 0);
        const totalPages = books.reduce((sum, book) => sum + book.pages, 0);
        return Number((totalChapters > 0 ? totalPages / totalChapters : 0).toFixed(2));
    }
}
