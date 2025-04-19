module.exports = class ExerciseDTO {
  id: number;
  title: string;
  complexity: string;
  recommendation: string;
  type: string;
  equipment: string;
  repeats?: number;
  time?: number;
  measurementType: string;
  imageUrl: string;

  constructor(model: { id: number; title: string; complexity: string; recommendation: string; type: string; equipment: string; repeats: number | undefined; time: number | undefined; measurementType: string; imageUrl: string; }) {
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
