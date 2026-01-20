#!/bin/bash
# Script to set up and start the Jekyll project
set -e

# Install dependencies
bundle install

# Serve the site locally
bundle exec jekyll serve
