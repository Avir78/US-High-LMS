import Joi from 'joi';

const passwordSchema = Joi.string()
  .min(8)
  .max(50)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  .required()
  .messages({
    'string.pattern.base': 'Password must contain uppercase, lowercase, number and special character',
  });

const emailSchema = Joi.string().email().required();

export const validators = {
  // Auth Validation
  loginValidator: Joi.object({
    email: emailSchema,
    password: Joi.string().required(),
  }),

  registerValidator: Joi.object({
    email: emailSchema,
    password: passwordSchema,
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    role: Joi.string().valid('student', 'teacher').required(),
  }),

  // User Profile Update
  profileUpdateValidator: Joi.object({
    first_name: Joi.string().min(2).max(50),
    last_name: Joi.string().min(2).max(50),
    phone: Joi.string().pattern(/^[0-9+\-\s()]+$/),
    birth_date: Joi.date(),
    institution: Joi.string().max(100),
    class_level: Joi.number().integer().min(6).max(12),
    avatar_url: Joi.string().uri(),
  }),

  // Course Creation/Update
  courseValidator: Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(10).max(5000).required(),
    category: Joi.string().min(2).max(50).required(),
    level: Joi.number().integer().min(1).max(12).required(),
    duration_hours: Joi.number().min(0.5).required(),
    content_url: Joi.string().uri(),
    pdf_url: Joi.string().uri(),
  }),

  // Simulation Setup
  simulationValidator: Joi.object({
    business_type: Joi.string().valid(
      'entrepreneurship',
      'hotel',
      'restaurant',
      'fashion',
      'sports',
      'retail',
      'finance',
      'accounting',
      'construction',
      'agriculture',
      'healthcare',
      'education'
    ).required(),
    business_name: Joi.string().min(2).max(100).required(),
  }),

  // Loan Request
  loanValidator: Joi.object({
    amount: Joi.number().positive().required(),
    description: Joi.string().max(500),
  }),
};

export const validate = (schema: Joi.Schema, data: any) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors: Record<string, string> = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
    return { isValid: false, errors, value: null };
  }

  return { isValid: true, errors: null, value };
};
