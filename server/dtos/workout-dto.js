module.exports = class WorkoutDTO {
    id;
    title;
    description;
    exercises;

    constructor(model) {
        this.id = model.id;
        this.title = model.title;
        this.description = model.description;
        this.exercises = model.exercises;
    }
}