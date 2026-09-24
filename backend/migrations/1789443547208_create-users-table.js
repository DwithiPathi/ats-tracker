exports.up = (pgm) => {
  pgm.createTable("companies", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade", // delete a user -> their companies go too
    },
    name: { type: "varchar(255)", notNull: true },
    website: { type: "varchar(255)" },
    industry: { type: "varchar(255)" },
    location: { type: "varchar(255)" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("companies");
};