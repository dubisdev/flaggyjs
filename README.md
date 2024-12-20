# FlaggyJS 🚩 - Manage bitewise flags *wisely*

`FlaggyJS` is a lightweight TypeScript library for managing bitwise flags.
This library provides an efficient way to handle permission systems, feature toggles,
or any context where managing a set of binary flags is needed.

```typescript
// 1. Import the library
import { useFlags } from "flaggyjs";

// 2. Define your flags
const { flags, FlagsContainer } = useFlags(["AMAZING", "SIMPLE", "BORING"] as const);

// 3. Create as many containers as you need
const flaggy = new FlagsContainer();
const documentation = new FlagsContainer([flags.SIMPLE, flags.BORING]); // Initialize with flags 🚀

// 4. Start working with fully Typed flags
flaggy.addFlag(flags.AMAZING); // Add one flag 🚩
flaggy.addFlags(flags.SIMPLE, flags.BORING); // or many flags at once 🚄
flaggy.removeFlag(flags.BORING); // Flaggy is not boring! 🎉

// 🔒 FlaggyJS is type safe
                   // v Argument of type "Too Long" is not assignable... // Fails type checking
documentation.addFlag("Too Long") // ⚠️ Error! => Invalid flag provided  // Also on runtime

// 5. Evaluate your flags when needed
console.log(flaggy.hasFlag(flags.AMAZING)); // true
console.log(documentation.hasFlag(flags.SIMPLE)); // true
console.log(flaggy.hasFlag(flags.BORING)); // false

console.log(flags)
// {
//     AMAZING: "AMAZING",
//     SIMPLE: "SIMPLE",
//     BORING: "BORING"
// }
```

## Features

- 🔒 **Type-safe flag management** [without Enums](https://www.totaltypescript.com/why-i-dont-like-typescript-enums).
- 🤏 **Zero dependencies** - No extra packages are used.
- 🧙‍♂️ **Bitwise operations**: Efficiently manage flags with bitwise operations under the hood.
- 🔎 **Validation**: Ensures invalid flags are caught early.
- 💎 **Immutable flag definitions**: Prevent accidental changes to the flag definitions.

## Installation

```bash
npm install flaggyjs
```

## API

- **`hasFlag(flag: FlagId): boolean`**
  Checks if a flag is currently set.

- **`addFlag(flag: FlagId): void`**
  Adds a flag to the current set.

- **`removeFlag(flag: FlagId): void`**
  Removes a flag from the current set.

- **`addFlags(...flags: FlagId[]): void`**
  Adds multiple flags at once.

## Testing

The package uses [Vitest](https://vitest.dev/) for testing. To run the tests:

```bash
bun run test
```

## Development

### Building

The package uses `tsc` for building TypeScript into JavaScript:

```bash
bun run build
```

### File Structure

- **`index.ts`**: Main source file containing the `useFlags` implementation.
- **`flag-operations.js`**: Contains bitwise operations like `addFlag`, `addFlags`, `hasFlag`, and `removeFlag`.
- **`input-validators.js`**: Handles validation of input flags.
- **`index.test.ts`**: Unit tests for the package.

## Contributing

Contributions are welcome! If you encounter bugs, feel free to open an issue or submit a pull request.

> Made with ❤️‍🔥 by [David Jiménez](https://dubis.dev)
