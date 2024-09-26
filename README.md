This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# PokeAPI Integration for iMusica technical case

## Overview

The project’s primary goal is to create a Pokedex where users can search for and explore Pokémon with ease. It supports searching, filtering by type, and viewing detailed stats for each Pokémon. The app includes pagination for large datasets and optimized URL handling.

## Key Considerations

- **Pokémon ID Extraction**: Since the PokeAPI does not always return a direct Pokémon ID, the project extracts it from the URL structure (6th index after splitting by /). This reduces unnecessary API requests, improving performance.

- **Type Queries**: The PokeAPI does not support pagination for Pokémon filtered by type. Instead of using front-end pagination (which could break URL query consistency), the app displays all results at once for type-based searches.

- **Custom Pagination**: Although PokeAPI provides **next** and **previous** **keys** for pagination when using limit and offset, I decided to implement custom pagination logic instead. This allows the app to dynamically calculate the next and previous API calls without needing to store or depend on the values returned by the next and previous keys.

- **Data Handling**: Type-based queries from the PokeAPI return a slightly different structure compared to standard queries. When fetching Pokémon by type, the response contains an object with a key called pokemon. Each item in this array has another key, also called pokemon, which contains the actual details needed (e.g., name, URL).
 - For example, a typical type-based query response looks like this.

```bash
{
  "pokemon": [
    {
      "pokemon": {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon/1/"
      }
    },
    {
      "pokemon": {
        "name": "ivysaur",
        "url": "https://pokeapi.co/api/v2/pokemon/2/"
      }
    },
    ...
  ]
}
```

## Features

- **Pokemons Lists**: Displays a paginated list of Pokémon with 20 Pokémon per page.

- **Pokemon Search**: Users can search Pokémon by name or number. Clicking a Pokémon's type leads to a list of all Pokémon of that type (without pagination due to API limits). A reset button allows users to clear all filters and return to the default Pokémon list.

- **Pokemon Details**: The details page for each Pokémon.

## Technical Details

- **Next.js**: Chosen for its modern features and standard recommendations for **React** projects, including server-side rendering (SSR) and other optimizations.

- **React Query:** Manages API requests and handles pagination, storing state via URL queries.

- **shadcn/ui**: Provides consistent, modern UI components.

- **Tailwind CSS**: Implements dynamic styling throughout the application..

- **Framer Motion**: Adds interactive animations to enhance the user experience.

## UI/UX Design

- **Minimalistic Layout**: Ensures a clean, user-friendly interface with fixed search and pagination headers.

- **Pokémon Cards**: Cards feature hover effects with a Pokéball icon to indicate a link to the Pokémon's details.

- **Animations**: Subtle, interactive animations powered by Framer Motion enrich the browsing experience.

## Known Issues & API Limitations

- **Type Queries**: PokeAPI does not support limit/offset parameters for type searches, so all results are shown without pagination.

- **Search Constraints**: The PokeAPI’s search functionality has limitations for complex queries (e.g., multiple types). Hosting PokeAPI locally would provide more advanced search options, but this was not implemented due to cost.

## Conclusion

This project demonstrates a functional Pokedex with clean design, optimized pagination, and smooth interactions. While it works within PokeAPI’s limitations, the app remains responsive and intuitive, with room for future enhancements.

## References

- [React](https://react.dev/)
- [PokeAPI](https://pokeapi.co/)
- [ReactQuery](https://tanstack.com/query/v3)
- [Shadcnui](https://ui.shadcn.com/)
- [Tailwind](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

