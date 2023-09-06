#!/usr/bin/env bash

SECRET_ENV="HUGGINGFACE_TOKEN=HuggingFace:latest"
SECRET_ENV="$SECRET_ENV,OPENAI_API_KEY=OpenAIAPIKey:latest"
SECRET_ENV="$SECRET_ENV,TRPFROG_FUNCTIONS_SECRET=TrpFrogFunctionSecret:latest"

gcloud functions deploy update-trpfrog-diffusion \
  --no-gen2 \
  --entry-point='trpfrog-diffusion-update-request' \
  --runtime=nodejs18 \
  --trigger-http \
  --allow-unauthenticated \
  --region=asia-northeast1 \
  --project=trpfrog-net \
  --timeout=360 \
  --clear-env-vars \
  --set-secrets $SECRET_ENV
