import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HUGGINGFACE_TOKEN)

export interface GeneratedImage {
  base64: string
  success: boolean
}

export async function generateTrpFrogImage(
  prompt: string,
): Promise<GeneratedImage> {
  const responseBlob = await hf.textToImage(
    {
      model: 'Prgckwb/trpfrog-diffusion',
      inputs: prompt,
    },
    {
      use_cache: false,
      wait_for_model: true,
      retry_on_error: true,
    },
  )
  const arrayBuffer = await responseBlob.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')

  // if sensitive image is generated, huggingface returns a black image.
  // Base64 of this image contains "ooooAKKKKACiiigA" pattern.
  const invalidImagePattern = /(ooooAKKKKACiiigA){10,}/

  return {
    base64,
    success: !invalidImagePattern.test(base64),
  }
}
