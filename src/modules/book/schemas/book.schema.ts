import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  title: string;
  
  @Prop({ required: true })
  chapters: number;

  @Prop({ required: true })
  pages: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Author' }], default: [] })
  authors: Types.ObjectId[];
}

export const BookSchema = SchemaFactory.createForClass(Book);