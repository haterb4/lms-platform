import { array, number, object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const verifyUserSchema = object({
  params: object({
      id: string(),
      code: string(),
  })
})

export const forgotPasswordSchema = object({
  body: object({
      email: string({
          required_error: "Email is required",
      }).email("Not a valid email"),
  })
})

export const resetPasswordSchema = object({
  params: object({
    id: string(),
    code: string(),
  }),
  body: object({
      password: string({
          required_error: "Password is required",
      }).min(6, "Passwords must be at least 6 characters"),
      repassword: string({
          required_error: "Password confirmation is required",
      })
  }).refine((data) => data.password === data.repassword, {
      message: "Password do not match",
      path: ["repassword"]
  })
})

export const subscribeRolesSchema = object({
  body: object({
    roles: array(string())
  })
})

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;

export type subscribeRolesInput = TypeOf<typeof subscribeRolesSchema>