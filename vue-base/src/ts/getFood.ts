export function getFood(amount: number) {
  let arr = []
  for (let i = 0; i < amount; i++) {
    arr.push(`food ${i}`)
  }
  return arr
}