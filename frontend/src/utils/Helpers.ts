
export const CheckForValueIfExists = (Value: string | number | object, Array: unknown[]) => {
    const Check = Array?.find((value) => {
        return value == Value
    })
    if (Check) {
        return true
    }
    return false
}
