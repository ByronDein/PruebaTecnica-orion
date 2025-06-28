import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from './schemas/author.schema';
import { CreateAuthorDto } from './dto/author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const lastAuthor = await this.authorModel.findOne().sort({ id: -1 }).exec();
    const nextId = lastAuthor ? lastAuthor.id + 1 : 1;

    const newAuthor = new this.authorModel({
      id: nextId,
      name: createAuthorDto.name,
    });

    return newAuthor.save();
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel
      .find()
      .populate('books', 'id title chapters pages') 
      .exec();
  }

  async findById(id: number): Promise<Author | null> {
    return this.authorModel
      .findOne({ id })
      .populate('books', 'id title chapters pages')
      .exec();
  }
}
