# Lerna Configuration

This repo is a small example of using Lerna 5+.

Watch this [7-minute walkthrough](https://www.youtube.com/watch?v=WgO5iG57jeQ) to see how new versions of Lerna work.

This repo contains five packages or projects:

- `@mov-ai/fe-lib-core` (a library of Javascript classes)
- `@mov-ai/fe-lib-react` (a library of React components)
- `@mov-ai/fe-lib-code-editor` (a library of React components, exposing a Monaco Code Editor)
- `@mov-ai/fe-lib-ide` (a library of React components using the Remix framework which depends on `fe-lib-core`, `fe-lib-react` and `fe-lib-code-editor`)
- `@mov-ai/app-ide-ce` (an app written in React that consumes the `fe-lib-ide` to build an IDE)

```
packages/
    mov-fe-lib-core/
        src/
            ...
        package.json

    mov-fe-lib-react/
        src/
            ...
        package.json

    mov-fe-lib-code-editor/
        src/
            ...
        package.json

    mov-fe-lib-ide/
        src/
            ...
        package.json

    mov-fe-app-ide-ce/
        src/
            ...
        public/
        package.json

package.json
```

## Development

Once you clone the repository, open it in Visual Code and choose "Re-open in container"
During the container initialization, it will run the `npx lerna bootstrap && npx lerna link` to install the project dependencies and link the local libraries.

After that, all you need to do is run

```
npx lerna run start --scope=@mov-ai/app-ide-ce
```

## Build

To build, take advantage of the lerna build to make sure your changes works in a production build:

```
npx lerna run build
```
