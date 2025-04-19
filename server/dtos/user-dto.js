module.exports = class UserDto {
    id;
    email;
    token;
    weight;
    height;
    experience;
    trainingGoal;
    


    constructor(model) {
        this.id = model._id
        this.email = model.email
        this.token = model.token
        this.weight = model.weight
        this.height = model.height
        this.experience = model.experience
        this.trainingGoal = model.trainingGoal
    }
}