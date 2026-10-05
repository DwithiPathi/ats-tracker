exports.up = (pgm) => {
  pgm.createTable("contacts", {
    id: "id",
    user_id: { type: "integer", notNull: true, references: '"users"', onDelete: "cascade" },
    company_id: { type: "integer", notNull: true, references: '"companies"', onDelete: "cascade" },
    name: { type: "varchar(255)", notNull: true },
    role: { type: "varchar(255)" },
    email: { type: "varchar(255)" },
    created_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("contacts");
};
