# District Cinema Sample Project

A small SvelteKit project allowing me to showcase my skills to District Cinema by creating a demo application from scratch, using tools similar to those in their deployment.

## Table of Contents

1. [Live Application](#live-application)
2. [Design Choices](#design-choices)
3. [Setup Instructions](#setup-instructions)
4. [Code Structure](#code-structure)

## Live Application

You can view the live application here: [Live Demo](https://dc-sample-project.vercel.app/)

## Design Choices

- **Svelte Store**: When researching Svelte stores, I came across [this documentation page](https://svelte.dev/docs/svelte/stores#When-to-use-stores) stating **"Prior to Svelte 5, stores were the go-to solution for creating cross-component reactive states or extracting logic. With runes, these use cases have greatly diminished."** I followed the docs and created a what is essentially a store in /src/lib/state.svelte.ts, exporting a variable using the **$state** rune.
- **Reused Components**: I identified reusable pieces of layout code and separated them into components.
- **Header**: I created a Header component and included it in the root layout so it would appear on every page.
- **Forms**: I decided to separate all forms with visible inputs to separate pages for cleaner UX.
- **Form Actions**: As directed by the [SvelteKit docs](https://svelte.dev/docs/kit/form-actions#Alternatives), I used Form Actions for client to server communication wherever possible, which, in such a small and simple project, turned out to be everywhere.

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

.
