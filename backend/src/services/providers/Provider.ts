import { Dto } from '../../models/dtos/Dto';

export interface Provider<T> {
  all(): Promise<T[]>;
  find(id: number): Promise<T | undefined>;
  insert(data: Dto): Promise<T>;
  delete(id: number): Promise<void>;
}
