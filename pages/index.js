import Head from "next/head";
import Layout from "../components/Layout";
import axios from "axios";
import Link from "next/link";

export default function Home({ pokemons }) {

  return (
    <Layout title="Pokedex">
      <h1 className="text-4xl mb-8 text-center">Pokedex ;D</h1>
      <ul>
        {pokemons.map((pokemon, i) => {
          return (
            <li key={i}>
              <Link href={`/pokemon?id=${i + 1}`}>
                <a className="shadow rounded-lg p-4 my-2 capitalize flex items-center text-lg bg-gray-200" >
                  <img  className="w-20 h-20 mr-3" src={pokemon.image} alt={pokemon.name} />
                  <span className="mr-2 font-bold" >{i + 1}.</span>
                  {pokemon.name}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  try {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = res.data;
    const pokemons = results.map((pokemon, i) => {
      const paddedIndex = ("00" + (i + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...pokemon,
        image,
      };
    });

    return {
      props: { pokemons },
    };
  } catch (error) {
    console.log(error.message);
  }
}
