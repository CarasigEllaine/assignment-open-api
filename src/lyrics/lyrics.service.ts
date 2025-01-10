import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LyricsService {
    async getLyrics(artist: string, title: string): Promise<any> {
        try {
            // Fetch song lyrics
            const lyricsResponse = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
            const rawLyrics = lyricsResponse.data.lyrics;

            const lyrics = rawLyrics
    ? rawLyrics
        .replace(/\r\n/g, '\n') // Normalize line endings
        .replace(/\n{2,}/g, '\n\n') // Add a blank line between paragraphs
        .trim() // Remove leading/trailing whitespace
    : 'No lyrics found.';




            // Fetch "you might also like" songs from Deezer
            const deezerResponse = await axios.get(
                `https://api.deezer.com/search?q=track:"${title}" artist:"${artist}"`,
            );

            const suggestions = deezerResponse.data.data.map((song: any) => ({
                title: song.title,
                artist: song.artist.name,
            }));

            return {
                lyrics: lyrics.replace(/\n/g, '\n'), // Ensure line breaks are maintained
                suggestions,
            };
            
            
            
        } catch (error) {
            throw new HttpException(
                'Failed to fetch data. Please check the artist and song title.',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
