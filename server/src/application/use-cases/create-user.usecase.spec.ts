import { UserInMemoryRepository } from "@test/repositories/user-in-memory.repository";
import { makeUser } from "@test/factories/user.factory";

import { CreateUserUseCase } from "./create-user.usecase";

let userRepositoryInMemory: UserInMemoryRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserInMemoryRepository();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should create user with valid data", async () => {
    const newUserName = "User Test";
    const emailUser = "test@dev.com";

    const userData = makeUser({
      name: newUserName,
      email: emailUser,
    });

    const user = await createUserUseCase.execute(userData);

    // Validando se o método de validação por email foi chamado corretamente
    const spyFindByEmail = jest.spyOn(userRepositoryInMemory, "findByEmail");

    // Validando se existe o metodo foi chamado apenas 1 vez
    expect(spyFindByEmail).toHaveBeenCalledTimes(1);

    // Validando se a chamada foi utilizada o email correto
    expect(spyFindByEmail).toHaveBeenCalledWith(emailUser);

    // Validando se o create do repository foi chamado corretamente
    jest.spyOn(userRepositoryInMemory, "create");

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: newUserName,
        email: expect.any(String),
        dateBirth: expect.any(Date),
        createdAt: expect.any(Date),
      })
    );

    expect(userRepositoryInMemory.users).toHaveLength(1);
    expect(userRepositoryInMemory.users[0].name).toBe(newUserName);
  });
});
