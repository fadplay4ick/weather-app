import sharp from 'sharp'

const SIZES = [192, 512]

for (const size of SIZES) {
  await sharp('public/icon.svg', { density: 384 })
    .resize(size, size)
    .png()
    .toFile(`public/icon-${size}.png`)
}