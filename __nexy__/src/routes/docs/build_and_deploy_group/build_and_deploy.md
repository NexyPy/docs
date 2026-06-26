# Build and Deploy

`nx build` compiles your project for production. `nx start` runs the production server.

## Build

{% raw %}```bash
nx build
```{% endraw %}

Compiles `.nexy`/`.mdx` files, bundles frontend assets, generates route tree. Output goes to `__nexy__/`.

See [CLI: build](/docs/cli/build) for flags and options.

## Start

{% raw %}```bash
nx start
```{% endraw %}

Launches the production Uvicorn server.

See [CLI: start](/docs/cli/start) for flags (`--port`, `--host`, `--env`).

## Deploy

Docker, VPS, Fly.io, Railway, Render — see the [Deploy guide](/docs/guides/deploy) for platform-specific instructions.

## Static export

For fully static sites, each page is pre-rendered to HTML during build. Serve `__nexy__/static/` with any static file server.