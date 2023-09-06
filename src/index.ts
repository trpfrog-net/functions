import functions from '@google-cloud/functions-framework'

functions.http('trpfrogNetFunctions', (req, res) => {
  res.send('Hello, World')
})
