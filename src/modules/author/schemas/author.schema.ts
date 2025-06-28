import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
export class Author {
    @Prop({ required: true, unique: true })
    id: number;

    @Prop({ required: true, trim: true }) 
    name: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Book' }], default: [] })
    books: Types.ObjectId[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);