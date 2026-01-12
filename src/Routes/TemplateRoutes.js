const express = require('express');
const { CreateTemplate, updateTemplate, deleteTemplate, getTemplateById, getTemplateList } = require('../Controllers/templateController');
const auth = require('../Middlewares/auth');

const templateRouter = express.Router();
templateRouter.post("/create",auth , CreateTemplate);
templateRouter.put("/update/:id",auth, updateTemplate);
templateRouter.delete("/delete/:id",auth, deleteTemplate);
templateRouter.get("/list",auth, getTemplateList);
templateRouter.get("/:id",auth, getTemplateById);
module.exports = templateRouter;