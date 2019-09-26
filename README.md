# fuse-starter-typescript

Help you get started with typescript

## Getting started

Clone this project

## Lerna Tips

### Installation

You'll need to have node > 8 installed. Then, install Lerna with the following command
```npm i -g lerna```

### Initializing your project

Run lerna init to start. This has already been done in this project

```lerna init```

Additionally, we have three packages in ```packages/```: frontend, shared and backend. These were initialized using the npm command in the following seciont

### NPM initialization

Run a slightly modified npm command, in the packages/PACKAGE_NAME_HERE, for example in this project we have ```packages/backend```

```npm init --scope=fuse-starter-typescript -y```

This will generate a package with the name ```@fuse-starter-typescript/backend```

### Bootstrap

To run Lerna bootstrap, which will look at your packages' dependencies and attempt to centralize them in the root node_modules run:

```lerna bootstrap --hoist --no-ci```

This is especially useful after npm installing a module manually in one of your package's directories.

### Installing dependencies

To install a npm dependency globally run

```lerna add YOUR_DEPENDENCY_HERE```

To install a npm dependency in only one package run

```lerna add YOUR_DEPENDENCY_HERE --scope=@fuse-starter-typescript/backend```

To link one of your packages to another run

```lerna add @fuse-starter-typescript/shared --scope=@fuse-starter-typescript/backend``
