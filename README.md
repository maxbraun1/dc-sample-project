# District Cinema Sample Project

A small SvelteKit project allowing me to showcase my skills to District Cinema by creating a demo application from scratch, using tools similar to those in their deployment.

## Table of Contents

1. [Live Application](#live-application)
2. [Setup Instructions](#setup-instructions)
3. [Code Structure](#code-structure)
4. [Design Choices](#design-choices)

## Live Application

You can view the live application here: [Live Demo](https://dc-sample-project.vercel.app/)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/maxbraun1/dc-sample-project.git
   cd dc-sample-project
   ```
2. Install Dependencies:
   ```bash
   npm install
   ```
3. Set Environment Variables:

- Create a `.env` file in the root directory.
- Add the following variables:

  ```bash
  DATABASE_URL=supabase-db-connection-url
  PUBLIC_SUPABASE_URL=supabase-url
  PUBLIC_SUPABASE_KEY=supabase-key
  ```

4. Run the application:
   ```bash
   npm run dev
   ```
5. Open the application: Visit `http://localhost:5173/` in your browser.

## Code Structure

I tried to follow the project and code structure recommended in the [SvelteKit documentation](https://svelte.dev/docs/kit/project-structure) closely. I stored components and utility functions in `src/lib` and followed standard routing patterns in `src/routes`.

I used `load` functions to retrieve initial page data and Form Actions to handle user submitted data. I used a global `$state` variable to store category ids and names once they were fetched, and used this global array to find category names from ids when pulling in new products from real-time Supabase updates.

If I were to continue working on this project, I would like to separate some of the complexity in the root `+page.svelte` file, as well as add much more validation to the form actions.

## Design Choices

- **Live Updates**: The best way I found to implement live updates from Supabase was to capture the affected product data and either remove, update, or add it to the state based on the `eventType`.
- **Search & Filter**: I opted to perform the search and filter on the already-loaded state data, given the small amount of products and limited time. On a more in-depth project I would implement pagination for products and categories as well as moving the searching and filtering functionality to the back-end.
- **Svelte Store**: When researching Svelte stores, I came across [this documentation page](https://svelte.dev/docs/svelte/stores#When-to-use-stores) stating **"Prior to Svelte 5, stores were the go-to solution for creating cross-component reactive states or extracting logic. With runes, these use cases have greatly diminished."** I followed the docs and created a what is essentially a store in /src/lib/state.svelte.ts, exporting a variable using the **$state** rune.
- **Reused Components**: I identified reusable pieces of layout code and separated them into components.
- **Header**: I created a Header component and included it in the root layout so it would appear on every page.
- **Forms**: I decided to separate all forms with visible inputs onto separate pages for a cleaner UX.
- **Form Actions**: As directed by the [SvelteKit docs](https://svelte.dev/docs/kit/form-actions#Alternatives), I used Form Actions for client to server communication wherever possible, which, in such a small and simple project, turned out to be everywhere.
