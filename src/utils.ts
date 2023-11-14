export const blobToB64 = async (b: Blob) => {
  const buf = Buffer.from(await b.arrayBuffer())
  return buf.toString('base64')
}
