import { model, Schema, Document } from 'mongoose';
import { Command } from '@interfaces/command.interface';
import { getUUID } from '@utils/uuid';

const commandSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      default: getUUID(),
      alias: 'id',
    },

    code: {
      type: String,
      required: true,
      unique: true,
      default: 'code0',
    },

    total: {
      type: Number,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'command',
    versionKey: false,
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  },
);

const commandModel = model<Command & Document>('Command', commandSchema);

export default commandModel;
