import functions from '@google-cloud/functions-framework'
import { requestUpdate } from './trpfrog-diffusion/index.js'
import { z } from 'zod'

functions.http('trpfrog-diffusion-update-request', (req, res) => {
  const token = z.string().safeParse(req.header('X-Authorization'))
  if (!token.success || token.data !== process.env.TRPFROG_FUNCTIONS_SECRET) {
    res.status(401).send('Unauthorized')
    return
  }

  if (req.method === 'GET') {
    const unverifiedCallbackUrl = req.header('X-Callback-Url')
    if (unverifiedCallbackUrl == null) {
      res.status(400).send('X-Callback-Url header is required')
      return
    }

    const callbackUrl = z.string().url().safeParse(unverifiedCallbackUrl)
    if (!callbackUrl.success) {
      res.status(400).send('X-Callback-Url header is invalid')
      return
    }

    requestUpdate(callbackUrl.data).catch(console.error)
    res.status(202).send('Accepted')
  } else {
    res.status(405).send('Method Not Allowed')
  }
})
