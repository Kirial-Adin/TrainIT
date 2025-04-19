const {Schema, model} = require ('mongoose')

const exerciseSchema = new Schema({
  title: { type: String, required: true },
  complexity: { type: String },
  recommendation: { type: String },
  type: { type: String },
  equipment: { type: String },
  repeats: { type: Number },
  time: { type: Number },
  measurementType: { type: String },
  imageUrl: { type: String },
});

export default model("Exercise", exerciseSchema);
