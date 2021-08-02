import { model, Schema, Document } from 'mongoose';
import { Product } from '@interfaces/product.interface';
import { getUUID } from '@utils/uuid';

const productSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      default: getUUID(),
      alias: 'id',
    },

    name: {
      type: String,
    },

    price: {
      type: Number,
    },
  },
  {
    collection: 'product',
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

const productModel = model<Product & Document>('Product', productSchema);

export default productModel;
