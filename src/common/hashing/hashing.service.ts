export abstract class HashingService {
  abstract hash(value: string): Promise<string>;
  abstract compare(value: string, comparator: string): Promise<boolean>;
}
