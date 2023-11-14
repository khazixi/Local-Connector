export const blobToB64 = async (b: Blob) => {
  const buf = Buffer.from(await b.arrayBuffer())
  return buf.toString('base64')
}

// const abuf = await Bun.file('ga.jpg').arrayBuffer()
// const buf = Buffer.from(abuf)
// const nbuf = new Uint8Array(abuf)
// const decoder = new TextDecoder()
// console.log(Buffer.from(nbuf).toString('base64'))

// console.log(buf.toString('base64'))
// console.log('')
// console.log(btoa(decoder.decode(nbuf)))
// console.log
//   btoa(buf.reduce((data: string, byte: number) => data + String.fromCharCode(byte), ""))
// )
