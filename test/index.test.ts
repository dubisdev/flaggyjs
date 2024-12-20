import { expect, test, describe } from "vitest";
import { useFlags } from "../lib"

describe("useFlags", () => {
    test("returns an object with flags and FlagsContainer", () => {
        const { flags, FlagsContainer } = useFlags(["READ", "WRITE", "DELETE"] as const)

        expect(flags).toBeDefined()
        expect(FlagsContainer).toBeDefined()
    })

    test("throws an error if invalid output is received", () => {
        expect(() => useFlags({ "test": "test" } as any)).toThrow()
    })

    test("throws an error if empty flags array is provided", () => {
        expect(() => useFlags([] as const)).toThrow()
    })

    test("returns a flags object with the correct keys", () => {
        const { flags } = useFlags(["READ", "WRITE", "DELETE"] as const)

        const output = Object.keys(flags).toSorted()
        const expected = ["READ", "WRITE", "DELETE"].toSorted()

        expect(output).toEqual(expected)
    })

    test("returns a FlagsContainer class", () => {
        const { FlagsContainer } = useFlags(["READ", "WRITE", "DELETE"] as const)

        const instance = new FlagsContainer()

        expect(instance).toBeDefined()
    })
})

describe("FlagsContainer", () => {
    const { flags, FlagsContainer } = useFlags(["READ", "WRITE", "DELETE"] as const)
    const container = new FlagsContainer()

    test("returns false if flag is not set", () => {
        expect(container.hasFlag(flags.READ)).toBe(false)
    })

    test("can add flag", () => {
        container.addFlag(flags.READ)

        expect(container.hasFlag(flags.READ)).toBe(true)
    })

    test("can remove flag", () => {
        container.removeFlag(flags.READ)

        expect(container.hasFlag(flags.READ)).toBe(false)
    })

    test("can add multiple flags", () => {
        container.addFlags(flags.READ, flags.WRITE)

        expect(container.hasFlag(flags.READ)).toBe(true)
        expect(container.hasFlag(flags.WRITE)).toBe(true)
    })

    test("fails if provided an invalid flag", () => {
        expect(() => container.addFlag("INVALID" as any)).toThrow()
        expect(() => container.hasFlag("INVALID" as any)).toThrow()
        expect(() => container.removeFlag("INVALID" as any)).toThrow()
        expect(() => container.addFlags("INVALID1" as any, "INVALID2" as any)).toThrow()
    })
})

