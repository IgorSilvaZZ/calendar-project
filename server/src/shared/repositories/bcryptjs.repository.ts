import { hash, compare } from "bcryptjs";

import { HashRepository } from "./hash.repository";

export class BcryptJsRepository implements HashRepository {
  private SALT_HASH_TEXT = 10;

  async hash(text: string): Promise<string> {
    const textHashed = await hash(text, this.SALT_HASH_TEXT);

    return textHashed;
  }

  async compare(text: string, textCompare: string): Promise<boolean> {
    return await compare(text, textCompare);
  }
}
