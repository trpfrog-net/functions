#!/usr/bin/env bash

SECRET_ENV="HUGGINGFACE_TOKEN=HuggingFace:latest"
SECRET_ENV="$SECRET_ENV,OPENAI_API_KEY=OpenAIAPIKey:latest"

gcloud functions deploy trpfrog-diffusion \
  --entry-point='trpfrog-diffusion-update-request' \
  --runtime=nodejs20 \
  --gen2 \
  --trigger-http \
  --region=asia-northeast1 \
  --project=trpfrog-net \
  --timeout=300 \
  --clear-env-vars \
  --set-secrets $SECRET_ENV
