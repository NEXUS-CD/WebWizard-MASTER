// import { Application } from 'egg';
import { Document } from 'mongoose';

export interface InterUserSchema extends Document {
  username: string;
  password: string;
  expire: number;
  queries: number;
  queried: number;
  enterprise: string;
}

export default (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const userSchame = new Schema(
    {
      username: { type: String },
      password: { type: String },
      expire: { type: Number },
      queries: { type: Number },
      queried: { type: Number },
      enterprise: { type: String },
      createTime: { type: Date },
      updateTime: { type: Date },
    },
    {
      usePushEach: true,
      timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
    },
  );
  return mongoose.model('user', userSchame);
};
