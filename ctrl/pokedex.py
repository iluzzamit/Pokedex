import copy

from flask import Blueprint, jsonify, request
from db import db

pokedex_blueprint = Blueprint('pokedex_blueprint', __name__)
pokemon_cache = dict()


@pokedex_blueprint.route('/')
def get():
    if not bool(pokemon_cache):
        [pokemon_cache.setdefault(pokemon['number'], pokemon) for pokemon in db.get()]

    args = request.args.to_dict()
    pokemons = copy.copy(list(pokemon_cache.values()))

    if args.get('sort') == 'desc':
        pokemons.reverse()

    if args.get('filter') and args.get('filter') != 'None':
        filter_word = args.get('filter')
        pokemons = list(filter(lambda pokemon: pokemon['type_one'] == filter_word or pokemon['type_two'] == filter_word, pokemons))

    display = int(args.get('display') or 10)
    pokemons = [pokemons[i:i + display] for i in range(0, len(pokemons), display or 10)]
    pages = len(pokemons)
    pokemons = pokemons[int(args.get('page') or 1) - 1]

    return jsonify({'data': pokemons, 'pages': pages})


@pokedex_blueprint.route('/icon/<name>')
def get_icon_url(name: str):
    return f"https://img.pokemondb.net/sprites/silver/normal/{name}.png"
