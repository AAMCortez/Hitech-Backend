import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
//import { JwtGuard } from '../auth/guard';
import { GameService } from './game.service';
import { createGameDto } from './dto';

//@UseGuards(JwtGuard)
//Guard not working nicely on the browser but working on postman
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}
  @Post()
  async createGame(@Body() createGameDto: createGameDto) {
    const game = await this.gameService.createGame(createGameDto);
    console.log(createGameDto);
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
  async deleteGameById(@Param('id', ParseIntPipe) id: number) {
    const deletedGame = await this.gameService.deleteGameById(id);
    return deletedGame;
  }
}
