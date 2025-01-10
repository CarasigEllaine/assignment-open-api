import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { LyricsService } from './lyrics.service';

@Controller('lyrics')
export class LyricsController {
    constructor(private readonly lyricsService: LyricsService) {}

    @Get()
    async getLyrics(
        @Query('artist') artist: string,
        @Query('title') title: string,
        @Res() res: Response,
    ) {
        const data = await this.lyricsService.getLyrics(artist, title);

        res.setHeader('Content-Type', 'text/plain');
        res.send(`Lyrics:\n\n${data.lyrics}\n\nSuggestions:\n\n${JSON.stringify(data.suggestions, null, 2)}`);
    }
}
