import fetch from 'node-fetch'
import { generateNew } from './generateNew.js'

export async function requestUpdate(callbackUrl: string): Promise<void> {
  const body = await generateNew({ numberOfRetries: 3 })
  await fetch(callbackUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
