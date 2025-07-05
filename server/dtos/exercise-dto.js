module.exports = class ExerciseDTO {
  id;
  title;
  complexity;
  recommendation;
  type;
  equipment;
  repeats;
  time;
  measurementType;
  imageUrl;

  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.complexity = model.complexity;
    this.recommendation = model.recommendation;
    this.type = model.type;
    this.equipment = model.equipment;
    this.repeats = model.repeats;
    this.time = model.time;
    this.measurementType = model.measurementType;
    this.imageUrl = model.imageUrl
  }

}
