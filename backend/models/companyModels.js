class Company extends Model {
  static get tableName() {
    return "companies";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "user_id"],

      properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        name: { type: "string", minLength: 2, maxLength: 255 },
        website: { type: "string", maxLength: 255 },
        industry: { type: "string", maxLength: 255 },
        location: { type: "string", maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "companies.user_id",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Company;