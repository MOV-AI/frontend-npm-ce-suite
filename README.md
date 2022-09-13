# MOV.AI FRONT-END COMMUNITY EDITION SUITE

This repository is a mono-repo including the libraries and app used for the MOV.AI Flow™

This repo contains five packages or projects:

- `@mov-ai/fe-lib-core` (a library of Javascript classes)
- `@mov-ai/fe-lib-react` (a library of React components)
- `@mov-ai/fe-lib-code-editor` (a library of React components, exposing a Monaco Code Editor)
- `@mov-ai/fe-lib-ide` (a library of React components using the Remix framework which depends on `fe-lib-core`, `fe-lib-react` and `fe-lib-code-editor`)
- `@mov-ai/app-ide-ce` (an app written in React that consumes the `fe-lib-ide` and also directly the `fe-lib-core`, `fe-lib-react` to build an MOV.AI Flow™)

## Known issues

The current setup, is able to the following:

- Install dependencies
- Use local packages
- Hot-reload
- Build libraries and app
- Compiles app successfully

Currently you're not able to see the app due to the following error:

```
Uncaught Error: Minified React error #321; visit https://reactjs.org/docs/error-decoder.html?invariant=321 for the full message or use the non-minified dev environment for full errors and additional helpful warnings.
```

This error is given because we have different React versions installed (Invalid Hooks) given as soon as we try to use something from the `lib-react` or `lib-ide` that we have locally.
