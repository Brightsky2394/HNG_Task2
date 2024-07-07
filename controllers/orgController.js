// controllers/orgController.js
const { Organization } = require('../models');

exports.getOrganisations = async (req, res) => {
  try {
    const organisations = await Organization.findAll({ where: { userId: req.userId } });
    res.status(200).json({ status: 'success', message: 'Organisations found', data: organisations });
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', message: 'An error occurred', statusCode: 500 });
  }
};

exports.getOrganisationById = async (req, res) => {
  try {
    const organisation = await Organization.findByPk(req.params.orgId);
    if (!organisation) {
      return res.status(404).json({ message: 'Organisation not found' });
    }
    res.status(200).json({ status: 'success', message: 'Organisation found', data: organisation });
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', message: 'An error occurred', statusCode: 500 });
  }
};

exports.createOrganisation = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newOrganisation = await Organization.create({
      orgId: uuidv4(),
      name,
      description
    });
    res.status(201).json({ status: 'success', message: 'Organisation created successfully', data: newOrganisation });
  } catch (error) {
    res.status(400).json({ status: 'Bad Request', message: 'Client error', statusCode: 400 });
  }
};
