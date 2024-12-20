import { addFlag, addFlags, hasFlag, removeFlag } from "./flag-operations.js"
import { validateFlagsList } from "./input-validators.js"

type FlagIdArray = readonly string[]

export const useFlags = <T extends FlagIdArray>(flagsList: T) => {
    type FlagId = T[number]

    /**
     * A flag ID object is a enum-like object that maps the flag ID to itself
     * @example { READ: "READ", WRITE: "WRITE", DELETE: "DELETE" }
     */
    type FlagIdObject = { [K in FlagId]: K };

    /**
     * A store that maps the flag ID to its corresponding bit value
     */
    type FlagValuesStore = Record<FlagId, number>

    // Validate the flags list
    const flagIds = validateFlagsList(flagsList) as FlagId[]

    // Create a map of flag values & their corresponding bit values
    const flagValues = flagIds.reduce((acc, current, index) => {
        acc[current] = 1 << index
        return acc
    }, {} as FlagValuesStore)


    const flagsObject = Object.freeze(
        Object.fromEntries(flagIds.map(flag => [flag, flag])) as FlagIdObject
    )

    const validateFlag = (flag: string, flagsObject: FlagIdObject) => {
        if (flag in flagsObject) return

        throw new Error("Invalid flag provided")
    }

    class FlagsContainer {
        /**
         * Current value of the flags
         */
        #currentValue: number = 0

        constructor(initialFlags?: FlagId[]) {
            if (initialFlags) {
                initialFlags.forEach((f) => validateFlag(f, flagsObject))
                this.#currentValue = addFlags(this.#currentValue, ...initialFlags.map(flag => flagValues[flag]))
            }

            Object.freeze(this)
        }

        readonly hasFlag = (flag: FlagId) => {
            validateFlag(flag, flagsObject)

            return hasFlag(this.#currentValue, flagValues[flag])
        }

        readonly addFlag = (flag: FlagId) => {
            validateFlag(flag, flagsObject)

            this.#currentValue = addFlag(this.#currentValue, flagValues[flag])
        }

        readonly removeFlag = (flag: FlagId) => {
            validateFlag(flag, flagsObject)

            this.#currentValue = removeFlag(this.#currentValue, flagValues[flag])
        }

        readonly addFlags = (...flags: FlagId[]) => {
            flags.forEach((f) => validateFlag(f, flagsObject))

            this.#currentValue = addFlags(this.#currentValue, ...flags.map(flag => flagValues[flag]))
        }
    }

    return { flags: flagsObject, FlagsContainer }
}
