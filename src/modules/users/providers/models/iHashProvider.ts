export default interface IHashProvider {
  generateHashFrom(payload: string): Promise<string>;
  assertEquals(payload: string, hashed: string): Promise<boolean>;
}
