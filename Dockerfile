FROM node:lts-gallium

WORKDIR /usr/src/app/.docker/

# From: https://github.com/GoogleChrome/puppeteer/issues/1345#issuecomment-343554457
# Install necessary apt packages for puppeteer bundled chromium work
RUN apt-get update && apt-get install --no-install-recommends -y \
  ca-certificates \
  fontconfig \
  fonts-liberation \
  gconf-service \
  libappindicator1 \
  libasound2 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgcc1 \
  libgconf-2-4 \
  libgdk-pixbuf2.0-0 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  lib\x11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  locales \
  lsb-release \
  unzip \
  wget \
  xdg-utils \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /src/*.deb
