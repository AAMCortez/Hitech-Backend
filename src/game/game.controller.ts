import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GameService } from './game.service';
//import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}
  @Post()
  // createGame(@GetUser('id') userId: number) {}
  @Get()
  // getGames(@GetUser('id') userId: number) {}
  @Get()
  // getGameById(@GetUser('id') userId: number) {}
  @Patch()
  //editGameById(@GetUser('id') userId: number) {}
  @Delete()
  deleteGameById() {}
}
