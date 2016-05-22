export function randomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

const colors = ['red', 'green', 'blue', 'yellow', 'purple']
export function randomButtonColor() {
  return randomArrayElement(colors)
}

const words = ['red', 'green', 'blue', 'yellow', 'purple']
export function randomButtonText() {
  return randomArrayElement(words)
}
