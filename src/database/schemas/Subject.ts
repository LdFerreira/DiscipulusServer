import { ObjectID, Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity('subjects')
class Subject {

  @ObjectIdColumn()
  _id: ObjectID;
  @Column('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Subject;