const Project = require('../model/Project');

module.exports.findAllProjects = (req, res) =>
{
    Project.find().populate('category')
    .then((data) =>
    {
        res.json(data);
    })
    .catch((error) => console.log(error));
};
module.exports.findOneProject = (req, res) =>
{
    const id = req.params.id;

    Project.findById({_id: id}).populate('category')
    .then((data) =>
    {
        res.json(data);
    })
    .catch((error) => console.log(error));
};
module.exports.createNewProject = (req, res) =>
{
    const { name, budget, category } = req.body;
    Project.create({ name, budget, category })
    .then((data) =>
    {
        res.json(data)
    })
    .catch((error) => console.log(error));
};
module.exports.editProject = (req, res) =>
{
    const { name, budget, category, cost } = req.body;
    const id = req.params.id;

    Project.findByIdAndUpdate({_id: id }, { name, budget, category, cost })
    .then(() =>
    {
        Project.findById({_id: id}).populate('category')
        .then((data) =>
        {
            res.json(data)
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};
module.exports.addNewService = (req, res) =>
{
    const { name, cost, description, projectCost } = req.body;
    const id = req.params.id;

    Project.findByIdAndUpdate({_id: id}, 
    {
        $push: {'services': {name, cost, description}},
        cost: projectCost
    })
    .then((data) =>
    {
        Project.findById({_id: id}).populate('category')
        .then((data) =>
        {
            res.json(data)
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}
module.exports.deleteService = (req, res) =>
{
    const { id, service } = req.params;
    const { projectCost } = req.body;

    Project.findByIdAndUpdate({_id: id}, 
    {
        $pull: {'services': {_id: service}},
        cost: projectCost
    })
    .then(() =>
    {
        Project.findById({_id: id}).populate('category')
        .then((data) =>
        {
            res.json(data)
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}
module.exports.deleteProject = (req, res) =>
{
    const id = req.params.id;

    Project.findByIdAndDelete({_id: id})
    .then((data) =>
    {
        res.json(data)
    })
    .catch((error) => console.log(error));
};