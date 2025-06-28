export class CreateBookDto {
    title: string;
    chapters: number;
    pages: number;
    authorIds?: string[]; 
}