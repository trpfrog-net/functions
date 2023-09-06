import { generateTrpFrogImage } from './generateTrpFrogImage.js'
import { fetchRandomWords } from './fetchRandomWords.js'
import { generateRandomTrpFrogPrompt } from './generateRandomPrompt.js'

export interface TrpFrogImageGenerationResult {
  generatedTime: number
  prompt: string
  translated: string
  base64: string
}

export async function generateNew(options?: {
  numberOfRetries?: number
}): Promise<TrpFrogImageGenerationResult> {
  let base64 = ''
  let prompt = ''
  let translated = ''
  const numberOfRetries = options?.numberOfRetries ?? 1
  for (const _ of Array.from(Array(numberOfRetries))) {
    try {
      const randomWords = await fetchRandomWords(10)
      const promptRes = await generateRandomTrpFrogPrompt(randomWords)
      prompt = promptRes.prompt
      translated = promptRes.translated
      const result = await generateTrpFrogImage(prompt)
      if (!result.success) {
        continue
      }
      base64 = result.base64
    } catch (e) {
      console.error(e)
      continue
    }
    break
  }

  if (base64 === '') {
    throw new Error('Failed to generate image')
  }

  return {
    generatedTime: Date.now(),
    prompt,
    translated,
    base64,
  }
}
