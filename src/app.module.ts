import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './modules/author/author.module';
import { BookModule } from './modules/book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [AuthorModule, BookModule,
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(`${process.env.DATABASE_URl}`, {
      connectionFactory: (connection) => {
        connection.once('open', () => {
        });
        connection.on('error', (err) => {
          console.error('Mongoose connection error:', err);
        });
        return connection;
      },
    })],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule { }
