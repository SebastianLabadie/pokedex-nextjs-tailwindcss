import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import axios from "axios";

function pokemon({ pokemon }) {
  return (
    <Layout title={pokemon.name}>
      <h1 className="text-4xl mb-2 text-center capitalize "></h1>
      <img className="mx-auto " src={pokemon.image} alt={pokemon.image} />
      <p>
        <span className="font-bold mr-2">Weight:</span>
        {pokemon.weight}
      </p>
      <p>
        <span className="font-bold mr-2">Height:</span>
        {pokemon.height}
      </p>
      <h2 className="mt-6 mb-2 font-bold">
        Types:
        {pokemon.types.map((type, i) => (
          <p className=" font-normal" key={i}>{type.type.name}</p>
        ))}
      </h2>
      <Link href="/">
        <a className="font-bold block text-center mt-10 underline text-2xl">Home</a>
      </Link>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = res.data;
    const paddedIndex = ("00" + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    pokemon.image = image;
    return {
      props: { pokemon },
    };
  } catch (error) {}
}

export default pokemon;
