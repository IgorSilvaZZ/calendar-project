export abstract class HashRepository {
  abstract hash(text: string): Promise<string>;
  abstract compare(text: string, textCompare: string): Promise<boolean>;
}
