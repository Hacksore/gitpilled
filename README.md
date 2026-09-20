# gitpilled 
<p align="center">
  <a href="https://gitpilled.vercel.app">
    <img src="https://github.com/Hacksore/gitpilled/assets/996134/e8e9af6e-d113-45a5-8522-172a85eb1873" height="128" />
  </a>
</p>

<a href="https://discord.com/servers/trash-devs-796594544980000808" target="_parent">
<img alt="Discord" height=20 src="https://img.shields.io/discord/796594544980000808?style=&logo=discord&logoColor=white&label=%20&labelColor=%237389D8&color=%237389D8" />
</a>
<a href="https://twitter.com/gitpilled" target="_parent">
<img alt="Twitter" height=20 src="https://img.shields.io/twitter/follow/gitpilled?style=&logo=twitter&logoColor=white&label=@gitpilled&labelColor=%231DA1F2&color=%231DA1F2" />
</a>

## What is this?
Do you want to know what languages you are pilled? Now you can do it with our revolutionary [**pillgorithm™**](https://github.com/Hacksore/gitpilled/blob/main/src/utils/pillgorithm.ts)

## Development

Use Node.js 20.9 or newer and pnpm 12.4.1. Run `pnpm install`, then `pnpm dev`.
GitHub profile lookups require `GITHUB_PAT` in `.env.local`.

Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` to validate changes.
Type-checking uses TypeScript 7 through the `@typescript/native` alias. The
`typescript` dependency aliases Microsoft's TypeScript 6 compatibility package
for tools such as ESLint that still require its compiler API, following the
[TypeScript migration guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0).
