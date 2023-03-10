const router = require('express').Router();
const { Company, JobPosting } = require('../../models');

//Route to Get all companies
router.get('/', async (req, res) => {
    try {
        const companies = await Company.findAll({
            include: [
                {
                model: JobPosting,
                attributes: ['id', 'job_title', 'job_description', 'salary']
                }],
        });
        res.status(200).json(companies);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Route to Get a single company
router.get('/:id', async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.id, {
            include: [
                {
                    model: JobPosting,
                    attributes: ['id', 'job_title', 'job_description','salary']
                }],
        });
        if (!company) {
            res.status(404).json({ message: 'No company found with this id!'});
            return;
        }
        res.status(200).json(company);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Route to create a new company
router.post('/', async (req, res) => {
    try {
        const newCompany = await Company.create(req.body);
        res.status(200).json(newCompany);
    } catch (err) {
        res.status(400).json(err);
    }
});

//Route to update a company
router.put('/:id', async (req, res) => {
    try {
        const company = await Company.update(req.body, {
            where: {
            id: req.params.id
            },
        });
        if (!company) {
            res.status(404).json({ message: 'No company found with this id!'});
            return;
        }
        res.status(200).json(company);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Route to delete a company
router.delete('/:id', async (req, res) => {
    try {
        const company = await Company.destroy({
            where: {
            id: req.params.id
            },
        });
        if (!company) {
            res.status(404).json({ message: 'No company found with this id!'});
            return;
        }
        res.status(200).json(company);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;