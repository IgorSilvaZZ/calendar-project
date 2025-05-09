import { faker } from "@faker-js/faker/.";

import { Override } from "../../shared/types";

import { CreateUserDTO } from "@dtos/create-user.dto";

export const makeUser = (overrideUser: Override<CreateUserDTO> = {}) => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  dateBirth: faker.date.anytime(),
  ...overrideUser,
});
