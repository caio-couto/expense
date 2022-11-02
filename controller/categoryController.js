const Category = require('../model/Category');

module.exports.findAllCategories = (req, res) =>
{
    Category.find()
    .then((data) =>
    {
        res.json(data);
    })
    .catch((error) => console.log(error));
};
module.exports.createNewCategory = (req, res) =>
{
    const { name } = req.body;
    Category.create({ name })
    .then((data) =>
    {
        res.json(data)
    })
    .catch((error) => console.log(error));
}