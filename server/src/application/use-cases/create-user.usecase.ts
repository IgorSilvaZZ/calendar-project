import { CreateUserDTO } from "../dtos/create-user.dto";

import { User } from "@domains/user/user.entity";
import { UserRepository } from "@domains/user/user.repository";

import { HashRepository } from "@shared/repositories/hash.repository";
import { BcryptJsRepository } from "@shared/repositories/bcryptjs.repository";

import { createUserSchema } from "@validators/user.schema";

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashPassword: HashRepository = new BcryptJsRepository()
  ) {}

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

    const passwordHashed = await this.hashPassword.hash(password);

    const user = User.create({
      name,
      email,
      password: passwordHashed,
      dateBirth,
      createdAt: new Date(),
    });

    await this.userRepository.create(user);

    return user;
  }
}
