import mongoose, { Schema, model, Document, Model } from 'mongoose';

const memberSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export interface IMember extends Document {
  name: { type: string };
}

export const Member = model<IMember>('members', memberSchema);
