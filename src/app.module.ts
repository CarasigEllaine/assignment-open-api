import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LyricsService } from './lyrics/lyrics.service';
import { LyricsController } from './lyrics/lyrics.controller';

@Module({
  imports: [],
  controllers: [AppController, LyricsController],
  providers: [AppService, LyricsService],
})
export class AppModule {}
