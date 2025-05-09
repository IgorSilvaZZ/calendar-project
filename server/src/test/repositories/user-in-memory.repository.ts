import { User } from "@domains/user/user.entity";
import { UserRepository } from "@domains/user/user.repository";

export class UserInMemoryRepository implements UserRepository {
  public users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    return user ?? null;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async reset() {
    this.users = [];
  }
}
