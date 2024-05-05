#!/bin/bash

source .env.production
gsutil cp -r ./build/* gs://$BUCKET_NAME/
