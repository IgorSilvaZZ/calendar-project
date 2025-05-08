import { z } from "zod";

import { userCreateMessages } from "@errors/user.messages";

export const createUserSchema = z.object({
  name: z
    .string({ message: userCreateMessages.INVALID_TYPE_STRING })
    .min(3, { message: userCreateMessages.TOO_SHORT_NAME })
    .nonempty({ message: userCreateMessages.EMPTY_NAME }),
  email: z
    .string({ message: userCreateMessages.INVALID_TYPE_STRING })
    .email({ message: userCreateMessages.INVALID_TYPE_EMAIL }),
  password: z
    .string({ message: userCreateMessages.INVALID_TYPE_STRING })
    .min(4, { message: userCreateMessages.TOO_SHORT_PASSWORD })
    .nonempty({ message: userCreateMessages.EMPTY_PASSWORD }),
  dateBirth: z.date({ message: userCreateMessages.INVALID_TYPE_DATEBIRTH }),
});
