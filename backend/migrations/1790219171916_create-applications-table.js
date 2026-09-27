exports.up = (pgm) => {
  // A real Postgres ENUM type — the DB will REJECT any status not in this list
  pgm.createType("application_status", [
    "Applied",
    "Interviewing",
    "Offer",
    "Rejected",
    "Withdrawn",
  ]);

  pgm.createTable("applications", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
    company_id: {
      type: "integer",
      notNull: true,
      references: '"companies"',
      onDelete: "cascade",
    },
    role: { type: "varchar(255)", notNull: true },
    status: { type: "application_status", notNull: true, default: "Applied" },
    source: { type: "varchar(255)" },
    salary: { type: "varchar(255)" },
    applied_date: { type: "date" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("applications");
  pgm.dropType("application_status");
};