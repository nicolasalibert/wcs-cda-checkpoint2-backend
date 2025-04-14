import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Country } from "./Country";

@ObjectType()
@Entity()
export class Continent extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ type: "varchar", length: 2 })
  code!: string;

  @Field(() => [Country])
  @OneToMany(() => Country, (country) => country.continent)
  countries!: Country[];
}
