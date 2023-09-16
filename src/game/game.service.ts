import { Injectable, NotFoundException } from '@nestjs/common';
import { createGameDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(private readonly prismaService: PrismaService) {}

  async createGame(createGameDto: createGameDto) {
    const { title, value, description, bets } = createGameDto;

    // Create a new game
    const game = await this.prismaService.game.create({
      data: {
        title,
        value,
        description,
        bets: {
          connect: bets?.map((betId) => ({ id: betId })),
        },
      },
    });

    return game;
  }

  async getGames() {
    // Retrieve all games
    const games = await this.prismaService.game.findMany();
    return games;
  }

  async getGameById(id: number) {
    // Retrieve a game by its Id
    const game = await this.prismaService.game.findUnique({
      where: { id },
    });

    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    return game;
  }

  async editGameById(id: number, createGameDto: createGameDto) {
    const { title, value, description, bets } = createGameDto;

    // Update the game by its Id
    const updatedGame = await this.prismaService.game.update({
      where: { id },
      data: {
        title,
        value,
        description,
        bets: {
          connect: bets?.map((betId) => ({ id: betId })),
        },
      },
    });

    if (!updatedGame) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    return updatedGame;
  }

  async deleteGameById(id: number) {
    // Delete a game by its Id
    const deletedGame = await this.prismaService.game.delete({
      where: { id },
    });

    if (!deletedGame) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    return deletedGame;
  }
}
