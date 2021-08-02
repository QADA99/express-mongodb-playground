import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';
import { getUUID } from '@utils/uuid';

const userSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      default: getUUID(),
      alias: 'id',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
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

// virtuals
const userModel = model<User & Document>('User', userSchema);
export default userModel;
