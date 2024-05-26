import z from "zod";

const Validation = {
  // Validate the Tenant Registration Data
  tenantRegistration: (data) => {
    const schema = z.object({
      name: z
        .string()
        .min(5, { message: "Name must be at least 5 characters long" })
        .max(20, { message: "Name must be at most 20 characters long" }),
      email: z.string().email({ message: "Invalid email" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" }),

      phone: z
        .number()
        .refine(
          (phone) =>
            phone.toString().length >= 10 && phone.toString().length <= 10,
          {
            message: "Phone number must be at least 10 digits long",
          }
        ),
    });

    return schema.safeParse(data);
  },
  tenantLogin: (data) => {
    const schema = z.object({
      email: z.string().email({ message: "Invalid email" }),
      password: z.string(),
    });
    return schema.safeParse(data);
  },
  tenantProfile: (data) => {
    const schema = z.object({
      street: z
        .string()
        .min(5, { message: "Street must be at least 5 characters long" }),
      city: z
        .string()
        .min(5, { message: "City must be at least 5 characters long" }),
      state: z
        .string()
        .min(5, { message: "State must be at least 5 characters long" }),
      zip: z
        .string()
        .min(5, { message: "Zip must be at least 5 characters long" }),
      country: z
        .string()
        .min(5, { message: "Country must be at least 5 characters long" }),
    });

    return schema.safeParse(data);
  },

  // Validate the Landlord Registration Data
  landlordRegistration: (data) => {
    const schema = z.object({
      name: z
        .string()
        .min(5, { message: "Name must be at least 5 characters long" })
        .max(20, { message: "Name must be at most 20 characters long" }),
      email: z.string().email({ message: "Invalid email" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" }),

      phone: z
        .number()
        .refine(
          (phone) =>
            phone.toString().length >= 10 && phone.toString().length <= 10,
          {
            message: "Phone number must be at least 10 digits long",
          }
        ),
      street: z
        .string()
        .min(5, { message: "Street must be at least 5 characters long" }),
      city: z
        .string()
        .min(5, { message: "City must be at least 5 characters long" }),
      state: z
        .string()
        .min(5, { message: "State must be at least 5 characters long" }),
      zip: z
        .string()
        .min(5, { message: "Zip must be at least 5 characters long" }),
      country: z
        .string()
        .min(5, { message: "Country must be at least 5 characters long" }),
    });

    return schema.safeParse(data);
  },
  landlordLogin: (data) => {
    const schema = z.object({
      email: z.string().email({ message: "Invalid email" }),
      password: z.string(),
    });
    return schema.safeParse(data);
  },
  propertySchemaValidation: (data) => {
    const schema = z.object({
      name: z
        .string()
        .min(5, { message: "Name must be at least 5 characters long" })
        .max(20, { message: "Name must be at most 20 characters long" }),
      description: z
        .string()
        .min(5, { message: "Description must be at least 5 characters long" })
        .max(100, {
          message: "Description must be at most 100 characters long",
        }),
      rent: z.number(),
      status: z.string(),
    });
    return schema.safeParse(data);
  },
};

export default Validation;
