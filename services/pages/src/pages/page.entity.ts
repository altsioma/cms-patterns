import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * Идентификатор страницы, по которому она будет доступна: /:slug
   */
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  /**
   * Список ID компонентов, определяющих порядок и состав страницы
   */
  @Column({ type: 'jsonb' })
  components: string[]; // Пример: ['header', 'main', 'footer']

  /**
   * Объект параметров компонентов.
   * Каждый ключ — это ID компонента из массива выше.
   */
  @Column({ type: 'jsonb' })
  params: Record<string, object>;
}
