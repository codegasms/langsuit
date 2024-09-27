import mongoose, { Document, Schema } from "mongoose";

export interface ILanguage extends Document {
  language: string;
  alphabets: string[];
  vowels: string[];
  consonants: string[];
}

const languageSchema: Schema = new Schema({
  language: { type: String, required: true },
  alphabets: { type: [String], required: true },
  vowels: { type: [String], required: true },
  consonants: { type: [String], required: true },
});

export default mongoose.models.Language ||
  mongoose.model<ILanguage>("Language", languageSchema);
