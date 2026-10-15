const { z } = require("zod");

const signupSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email("valid email is required"),
  password: z.string().min(6, "password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("valid email is required"),
  password: z.string().min(1, "password is required"),
});

const companySchema = z.object({
  name: z.string().min(1, "name is required"),
  website: z.string().optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
});

const contactSchema = z.object({
  company_id: z.number().int("company_id must be a number"),
  name: z.string().min(1, "name is required"),
  role: z.string().optional(),
  email: z.string().email().optional(),
});

const applicationSchema = z.object({
  company_id: z.number().int("company_id must be a number"),
  role: z.string().min(1, "role is required"),
  status: z.enum(["Applied", "Interviewing", "Offer", "Rejected", "Withdrawn"]).optional(),
  source: z.string().optional(),
  salary: z.string().optional(),
  applied_date: z.string().optional(),
});

const noteSchema = z.object({
  type: z.string().optional(),
  body: z.string().min(1, "body is required"),
});

module.exports = {
  signupSchema, loginSchema, companySchema,
  contactSchema, applicationSchema, noteSchema,
};