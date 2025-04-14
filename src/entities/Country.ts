import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Continent } from "./Continent";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ type: "varchar", length: 3 })
  code!: string;

  @Field()
  @Column()
  emoji!: string;

  @Field(() => Continent)
  @ManyToOne(() => Continent, (continent) => continent.countries, {
    eager: true,
  })
  continent!: Continent;
}
