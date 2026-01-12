const templateModel = require("../Models/templateModels");

const CreateTemplate = async (req, res) => {
    try {
        // is user authenticated
        console.log("Debug: req Body", req);
        const userId = req.userId;
        console.log("Debug: req userId", userId);
        const template = await templateModel.create({
            userId,
            ...req.body
        });
        // if Successful
        res.status(201).json({
            success: true,
            template,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a template
const updateTemplate = async (req, res) => {
    const id = req.params.id;
    try {
        const userId = req.userId;
        const template = await templateModel.findByIdAndUpdate({ _id: id, userId }, req.body, { new: true });
        if (!template) {
            return res.status(404).json({ error: "Template not found" });
        }
        res.status(200).json(template);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a template
const deleteTemplate = async (req, res) => {
    const id = req.params.id;
    try {
        const userId = req.userId;
        const template = await templateModel.findByIdAndDelete({ _id: id, userId });
        if (!template) {
            return res.status(404).json({ error: "Template not found" });
        }
        res.status(202).json(template);
        // res.status(200).json({ message: "Template deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all templates for a user
const getTemplateList = async (req, res) => {
    try {
        const userId = req.userId;
        const templates = await templateModel.find({ userId });
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a single template by ID
const getTemplateById = async (req, res) => {
    try {
        const userId = req.userId;
        const template = await templateModel.findOne({ _id: req.params.id, userId });
        if (!template) {
            return res.status(404).json({ error: "Template not found" });
        }
        res.status(200).json(template);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { CreateTemplate, updateTemplate, deleteTemplate, getTemplateList, getTemplateById };