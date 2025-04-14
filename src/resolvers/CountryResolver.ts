import { Resolver, Query, Arg, Mutation, InputType, Field } from "type-graphql";
import { Country } from "../entities/Country";
import { Continent } from "../entities/Continent";

@InputType()
class CreateCountryInput {
  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field()
  emoji!: string;

  @Field()
  continentCode!: string;
}

@Resolver(Country)
export class CountryResolver {
  @Query(() => [Country])
  async getCountries(): Promise<Country[]> {
    try {
      return Country.find();
    } catch (error) {
      throw new Error(`Error fetching countries: ${error.message}`);
    }
  }

  @Query(() => Country)
  async getCountryByCode(@Arg("code") code: string): Promise<Country> {
    try {
      return Country.findOneOrFail({
        where: { code },
      });
    } catch (error) {
      throw new Error(`Country with code ${code} not found`);
    }
  }

  @Query(() => [Country])
  async getCountriesByContinentCode(
    @Arg("continentCode") continentCode: string
  ): Promise<Country[]> {
    try {
      return Country.find({
        where: { continent: { code: continentCode } },
      });
    } catch (error) {
      throw new Error(
        `Error fetching countries for continent ${continentCode}: ${error.message}`
      );
    }
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("input") input: CreateCountryInput
  ): Promise<Country> {
    try {
      const continent = await Continent.findOne({
        where: { code: input.continentCode },
      });
      if (!continent) throw new Error("Continent not found");

      const country = Country.create({
        ...input,
        continent,
      });

      return country.save();
    } catch (error) {
      throw new Error(`Error creating country: ${error.message}`);
    }
  }
}
