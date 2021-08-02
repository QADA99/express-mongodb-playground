import { Router } from 'express';
import CommandController from '@controllers/command.controller';
import { CreateCommandDto } from '@dtos/command.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
class CommandRoute implements Routes {
  public path = '/command';

  public router = Router();
  public commandController = new CommandController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.commandController.getCommands);
    this.router.get(`${this.path}/:id`, this.commandController.getCommandById);
    this.router.post(`${this.path}`, validationMiddleware(CreateCommandDto, 'body'), this.commandController.createCommand);
    // this.router.put(`${this.path}/:id`, validationMiddleware(CreateCommandDto, 'body', true), this.commandController.updateCommand);
    this.router.delete(`${this.path}/:id`, this.commandController.deleteCommand);
  }
}

export default CommandRoute;
