exports.up = (pgm) => {
  pgm.createTable("notes", {
    id: "id",
    user_id: { type: "integer", notNull: true, references: '"users"', onDelete: "cascade" },
    application_id: { type: "integer", notNull: true, references: '"applications"', onDelete: "cascade" },
    type: { type: "varchar(50)", notNull: true, default: "note" }, // call / email / interview / note
    body: { type: "text", notNull: true },
    created_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("notes");
};