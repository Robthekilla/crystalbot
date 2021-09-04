// Add an s incase the value is different than 1
export default function SingleMultiple(value: number, text: string, invert?: boolean) {
    if (!invert) return value && value === 1 ? text : text + 's'
    else return value && value === 1 ? text + 's' : text
}
