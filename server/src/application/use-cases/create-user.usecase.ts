import { hash } from "bcryptjs";

import { CreateUserDTO } from "../dtos/create-user.dto";

import { User } from "@domains/user/user.entity";
import { UserRepository } from "@domains/user/user.repository";

import { createUserSchema } from "src/shared/validators/user.schema";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password, dateBirth }: CreateUserDTO) {
    const resultCreateUserSchema = createUserSchema.safeParse({
      name,
      email,
      password,
      dateBirth,
    });

    if (!resultCreateUserSchema) {
      throw new Error(resultCreateUserSchema);
    }

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHashed = await hash(password, 10);

    const user = new User({
      name,
      email,
      password: passwordHashed,
      dateBirth,
      createdAt: new Date(),
    });
  }
}
