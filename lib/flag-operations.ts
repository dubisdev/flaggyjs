export const hasFlag = (current: number, flag: number) => (current & flag) === flag

export const addFlag = (current: number, flag: number) => current | flag

export const removeFlag = (current: number, flag: number) => current & ~flag

export const addFlags = (current: number, ...flags: number[]) => flags.reduce((acc, current) => acc | current, current)
