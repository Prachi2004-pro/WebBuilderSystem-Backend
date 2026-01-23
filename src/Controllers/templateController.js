const templateModel = require("../Models/templateModels");
const { uploadToCloudinary } = require("../Utils/cloudinary");

const CreateTemplate = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.userId);

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    let heroImage = ""; // Default empty

    // FILE UPLOAD CHECK
    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer);
      heroImage = uploaded.secure_url;
    }

    const template = await templateModel.create({
      userId: req.userId,
      templateName: req.body.templateName,
      templateType: req.body.templateType,

      sections: {
        hero: true,
        features: true,
        aboutUs: true,
        contactUs: true,
        faq: true,
        footer: true,
      },

      headerSection: {
        businessName: "",
        logo: "",
        navigationLinks: [],
      },

      heroSection: {
        title: "",
        tagline: "",
        description: "",
        heroImage: heroImage, // ✅ SAVED
        button: "",
      },

      features: [],

      aboutUs: {
        aboutTitle: "",
        aboutDescription: "",
        team: [],
      },

      contactUs: {
        email: "",
        phoneNo: "",
        address: "",
      },

      faq: [],

      footer: {
        brandName: "",
        brandLogo: "",
        SocialLinks: null,
        copywrite: "",
      },
    });

    return res.status(201).json({
      success: true,
      template,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a template
const updateTemplate = async (req, res) => {
  const id = req.params.id;
  try {
    const userId = req.userId;
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    let updateData = { ...req.body };

    // FILE UPLOAD CHECK
    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer);
      updateData.heroSection = {
        ...updateData.heroSection,
        heroImage: uploaded.secure_url,
      };
      //Image URL
    } else if (req.body["heroSection.heroImage"]) {
      updateData.heroSection = {
        ...updateData.heroSection,
        heroImage: req.body["heroSection.heroImage"],
      };
    }

    const template = await templateModel.findByIdAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true },
    );
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
};

// Get all templates for a user
const getTemplateList = async (req, res) => {
  try {
    const userId = req.userId;
    const templates = await templateModel.find({ userId });
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single template by ID
const getTemplateById = async (req, res) => {
  try {
    const userId = req.userId;
    const template = await templateModel.findOne({
      _id: req.params.id,
      userId,
    });
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  CreateTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplateList,
  getTemplateById,
};
