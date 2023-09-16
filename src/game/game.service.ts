import { Injectable, NotFoundException } from '@nestjs/common';
import { createGameDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(private readonly prismaService: PrismaService) {}

  async createGame(createGameDto: createGameDto) {
    // Destructure properties from DTO
    const { title, value, description, bets } = createGameDto;

    // Create a new game using Prisma
    const game = await this.prismaService.game.create({
      data: {
        title,
        value,
        description,
        bets: {
          connect: bets?.map((betId) => ({ id: betId })), // Connect bets if provided
        },
      },
    });

    return game;
  }

  async getGames() {
    // Retrieve all games using Prisma
    const games = await this.prismaService.game.findMany();
    return games;
  }

  async getGameById(id: number) {
    // Retrieve a game by its ID using Prisma
    const game = await this.prismaService.game.findUnique({
      where: { id },
    });

    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    return game;
  }

  async editGameById(id: number, createGameDto: createGameDto) {
    // Destructure properties from DTO
    const { title, value, description, bets } = createGameDto;

    // Update the game by its ID using Prisma
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
    // Delete a game by its ID using Prisma
    const deletedGame = await this.prismaService.game.delete({
      where: { id },
    });

    if (!deletedGame) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    return deletedGame;
  }
}
