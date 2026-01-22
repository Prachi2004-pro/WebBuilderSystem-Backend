const { url } = require("inspector");
const mongoose = require("mongoose");
const { type } = require("os");
const templateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    templateName: {
      type: String,
      required: true,
    },

    templateType: {
      type: String,
      required: true,
    },

    headerSection: {
      logo: {
        type: String,
        url: true,
      },
      businessName: {
        type: String,
      },
      navigationLinks: [
        {
          name: {
            type: String,
          },
          url: {
            type: String,
            url: true,
          },
          _id: false,
        },
      ],
    },

    heroSection: {
      title: {
        type: String,
      },
      tagline: {
        type: String,
      },
      description: {
        type: String,
      },
      heroImage: {
        type: String,
        url: true,
      },
      button: {
        type: String,
      },
    },

    // templateUrl:{
    //     type:String,
    //     required:true,
    //     unique:true,
    //     index:true,
    // },
    features: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        _id: false,
      },
    ],

    aboutUs: {
      // offers:{
      //   type:String,
      //   required: true,
      // }
      aboutTitle: {
        type: String,
      },
      aboutDescription: {
        type: String,
      },
      team: [
        {
          memberName: {
            type: String,
          },
          memberRole: {
            type: String,
          },
          memberImage: {
            type: String,
          },
          _id: false,
        },
      ],
    },

    // services: {
    //   name: {
    //     type: String,
    //     required: true,
    //   },
    //   description: {
    //     type: String,
    //     required: true,
    //   },
    //   icon: {
    //     type: String,
    //     required: true,
    //     url: true,
    //   },
    // },

    // testimonials: {
    //   name: {
    //     type: String,
    //     required: true,
    //   },
    //   feedback: {
    //     type: String,
    //     required: true,
    //   },
    //   Image: {
    //     type: String,
    //     required: true,
    //     url: true,
    //   },
    // },

    contactUs: {
      email: {
        type: String,
      },
      phoneNo: {
        type: Number,
      },
      address: {
        type: String,
      },
    },

    FAQ: [
      {
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
        _id: false,
      },
    ],

    footer: {
      brandName: {
        type: String,
      },
      branLogo: {
        type: String,
        url: true,
      },
      SocialLinks: {
        type: String,
        enum: ["Instagram", "Facebook", "WhatsApp", "LinkedIn", "Youtube"],
        url: true,
      },
      copywrite: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Template", templateSchema);
