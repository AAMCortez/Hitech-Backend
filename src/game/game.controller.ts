import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  UseGuards,
  Param,
  Body,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GameService } from './game.service';
import { createGameDto } from './dto';

@UseGuards(JwtGuard)
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}
  @Post()
  async createGame(@Body() createGameDto: createGameDto) {
    const game = await this.gameService.createGame(createGameDto);
    return game;
  }

  @Get()
  async getGames() {
    const games = await this.gameService.getGames();
    return games;
  }

  @Get(':id')
  async getGameById(@Param('id') id: number) {
    const game = await this.gameService.getGameById(id);
    return game;
  }

  @Patch(':id')
  async editGameById(
    @Param('id') id: number,
    @Body() createGameDto: createGameDto,
  ) {
    const updatedGame = await this.gameService.editGameById(id, createGameDto);
    return updatedGame;
  }

  @Delete(':id')
  async deleteGameById(@Param('id') id: number) {
    const deletedGame = await this.gameService.deleteGameById(id);
    return deletedGame;
  }
}
