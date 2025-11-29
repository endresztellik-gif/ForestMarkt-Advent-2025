import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const PHOTOS_DIR = './public/photos'
const OUTPUT_DIR = './public/photos-optimized'

async function optimizeImages() {
  console.log('🖼️  Képek optimalizálása...\n')

  // Output mappa létrehozása
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true })
  }

  // Képek beolvasása
  const files = await readdir(PHOTOS_DIR)
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f))

  console.log(`📁 ${imageFiles.length} kép található\n`)

  for (const file of imageFiles) {
    const inputPath = path.join(PHOTOS_DIR, file)
    const outputPath = path.join(OUTPUT_DIR, file.replace(/\.(jpg|jpeg|png)$/i, '.jpg'))

    try {
      const info = await sharp(inputPath)
        .resize(1200, 900, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({
          quality: 80,
          progressive: true
        })
        .toFile(outputPath)

      const originalSize = (await sharp(inputPath).metadata()).size || 0
      const savings = originalSize > 0
        ? Math.round((1 - info.size / originalSize) * 100)
        : 0

      console.log(`✅ ${file} → ${(info.size / 1024).toFixed(0)} KB (${savings}% méretcsökkenés)`)
    } catch (err) {
      console.error(`❌ Hiba: ${file}:`, err.message)
    }
  }

  console.log('\n✨ Képek optimalizálva!')
  console.log(`📂 Kimenet: ${OUTPUT_DIR}`)
  console.log('\n⚠️  Cseréld ki a régi képeket az optimalizáltakkal:')
  console.log('   rm -rf public/photos && mv public/photos-optimized public/photos')
}

optimizeImages()
