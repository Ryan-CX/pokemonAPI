import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
	const [pokemonName, setPokemonName] = useState('');
	const [pokemonChosen, setPokemonChosen] = useState(false);
	const [pokemon, setPokemon] = useState({
		name: '',

		img: '',
		hp: '',
		attack: '',
		defence: '',
		type: '',
	});
	const searchPokemon = () => {
		Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
			(res) => {
				setPokemon({
					name: pokemonName,

					img: res.data.sprites.front_shiny,
					hp: res.data.stats[0].base_stat,
					attack: res.data.stats[1].base_stat,
					defence: res.data.stats[2].base_stat,
					type: res.data.types[0].type.name,
				});
				setPokemonChosen(true);
			}
		);
	};

	return (
		<div className='App'>
			<div className='wrap'>
				<div className='Title'>
					<h1>Pokemon Data</h1>
					<input
						type='text'
						onChange={(event) => {
							setPokemonName(event.target.value);
						}}
					/>
					<button onClick={searchPokemon}>Search Pokemon</button>
				</div>
				<div>
					<div className='DisplaySection'>
						{!pokemonChosen ? (
							<h2>Please choose a Pokemon.</h2>
						) : (
							<>
								<h1>
									{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
								</h1>
								<img src={pokemon.img} alt='' />

								<>Type:{pokemon.type}</>
								<h4>HP:{pokemon.hp}</h4>
								<h4>Attack:{pokemon.attack}</h4>
								<h4>Defence:{pokemon.defence}</h4>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
