## Boilerplate project for building a JS library.

  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>

### The problem.

When developing a JS library, it takes a lot of time to configure it right.

This is a boilerplate I use for quickly getting started with a (relatively) clean project.

### This solution.

**Uses** : 
  - [parcel](https://github.com/parcel-bundler/parcel) for running the demo.
  - [microbundle](https://github.com/developit/microbundle) for building the library and sourcemaps.
  - [jest](https://github.com/facebook/jest/) for testing.
  - [eslint](https://eslint.org/) with [standard](https://standardjs.com/) for code linting.
  - [prettier](https://github.com/prettier/prettier) for code formatting.

### Installation

```bash
  git clone rakannimer/rn-js-library MY_LIBRARY_NAME
  cd MY_LIBRARY_NAME && rm -rf ./.git
  yarn install
```

Ready to go. 👍

### Usage

Comes with the following scripts : 

1. Run demo with live reload.

```bash
  yarn demo 
```

2. Build.

```bash
  yarn build
```

3. Lint.

```bash
  yarn lint
```

4. Run Tests

```bash
  yarn test
```

5. Precommit test run

Before committing all staged js(on) code is linted, prettified and tested.


