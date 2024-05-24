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
};

export default Validation;
