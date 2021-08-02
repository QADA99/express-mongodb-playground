import { NextFunction, Request, Response } from 'express';
import { CreateCommandDto } from '@dtos/command.dto';
import { Command } from '@interfaces/command.interface';
import commandService from '@services/command.service';

class CommandController {
  public commandService = new commandService();

  public getCommands = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCommandsData: Command[] = await this.commandService.findAll();

      res.status(200).json({ data: findAllCommandsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCommandById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commandId: string = req.params.id;
      const findOneCommandData: Command = await this.commandService.findCommandById(commandId);

      res.status(200).json({ data: findOneCommandData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCommand = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commandData: CreateCommandDto = req.body;
      commandData.date = new Date(req.body.date);
      const createCommandData: Command = await this.commandService.createCommand(commandData);

      res.status(201).json({ data: createCommandData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCommand = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commandId: string = req.params.id;
      const commandData: CreateCommandDto = req.body;
      const updateCommandData: Command = await this.commandService.updateCommand(commandId, commandData);

      res.status(200).json({ data: updateCommandData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCommand = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commandId: string = req.params.id;
      const deleteCommandData: Command = await this.commandService.deleteCommand(commandId);

      res.status(200).json({ data: deleteCommandData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CommandController;
