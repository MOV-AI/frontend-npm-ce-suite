# MOVAI-CE Suite

![Movai](https://www.mov.ai/wp-content/uploads/2021/06/MOV.AI-logo-3.png)

MOVAI-CE Suite is a monorepo containing all the public libraries to use in the community and enterprise editions of MOV.AI.

## Build and run instructions

Follow the Readme file to build and run Nx projects

[a relative link](README Nx.md)

## Current status

This public Nx monorepo has some libs that will be published and will be consumed by other github private repo (a simple react app, in this case).
The community edition (CE) application (inside this repo) is working fine.
However, when in local development mode, there is an issue trying to link the libraries in other projects. Somehow the dependencies of the libraries are not resolved.

An issue was raised here: https://github.com/nrwl/nx/issues/11518
