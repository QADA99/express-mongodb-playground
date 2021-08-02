import { CreateCommandDto } from '@dtos/command.dto';
import { HttpException } from '@exceptions/HttpException';
import { Command } from '@interfaces/command.interface';
import commandModel from '@models/command.model';
import { isEmpty } from '@utils/util';

class CommandService {
  public model = commandModel;
  public async findAll(): Promise<Command[]> {
    const commands: Command[] = await this.model.find();
    return commands;
  }

  public async findCommandById(commandId: string): Promise<Command> {
    if (isEmpty(commandId)) throw new HttpException(400, 'Invalid id');

    const findCommand: Command = await this.model.findById(commandId);
    if (!findCommand) throw new HttpException(409, `No such command with id ${commandId}`);

    return findCommand;
  }

  public async createCommand(commandData: CreateCommandDto): Promise<Command> {
    if (isEmpty(commandData)) throw new HttpException(400, 'Invalid commandData');

    const findCommand: Command = await this.model.findOne({ code: commandData.code });
    if (findCommand) throw new HttpException(409, `The code ${commandData.code} already exists`);

    const createCommandData: Command = await this.model.create(commandData);
    return createCommandData;
  }

  public async updateCommand(commandId: string, commandData: CreateCommandDto): Promise<Command> {
    if (isEmpty(commandData)) throw new HttpException(400, 'Invalid commandData');

    if (commandData.code) {
      const findCommand: Command = await this.model.findOne({ code: commandData.code });
      if (findCommand && findCommand.id != commandId) throw new HttpException(409, `The code ${commandData.code} already exists`);
    }

    const updateCommandById: Command = await this.model.findByIdAndUpdate(commandId, { commandData });
    if (!updateCommandById) throw new HttpException(409, 'No such Command');

    return updateCommandById;
  }

  public async deleteCommand(commandId: string): Promise<Command> {
    const deleteCommandById: Command = await this.model.findByIdAndDelete(commandId);
    if (!deleteCommandById) throw new HttpException(409, `No such command with id ${commandId}`);

    return deleteCommandById;
  }
}
export default CommandService;
