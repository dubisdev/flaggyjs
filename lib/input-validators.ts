const checkFlagListItem = (input: unknown): input is string => {
    if (typeof input !== "string") throw new Error("Input must be a string")
    return true
}

export const validateFlagsList = (flagsList: unknown): readonly string[] => {
    if (!Array.isArray(flagsList)) throw new Error("Permissions must be an array")
    if (flagsList.length === 0) throw new Error("Permissions array must not be empty")
    if (flagsList.length > 32) throw new Error("Permissions array must not be longer than 32 items")

    const stringFlags = flagsList.filter(checkFlagListItem)

    const uniqueFlags = new Set(stringFlags)

    return Object.freeze(Array.from(uniqueFlags))
}
