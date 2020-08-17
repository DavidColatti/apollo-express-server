const Lead = require("../models/Lead");

const resolvers = {
  Query: {
    leads: async () => {
      const res = await Lead.find();

      return res;
    },
    randomLeads: async () => {
      const res = await Lead.aggregate([{ $sample: { size: 12 } }]);

      return res;
    },
    leadsCount: async () => {
      const res = await Lead.countDocuments();

      return res;
    },
  },
};

module.exports = resolvers;
