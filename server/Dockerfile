FROM node:18-alpine AS deps

WORKDIR /app

COPY package.json ./
RUN npm install --only=production --legacy-peer-deps


FROM node:18-alpine AS production

RUN addgroup -g 1001 -S cinemagrp && \
    adduser  -u 1001 -S cinemaapp -G cinemagrp

WORKDIR /app

COPY --from=deps --chown=cinemaapp:cinemagrp /app/node_modules ./node_modules
COPY --chown=cinemaapp:cinemagrp . .

RUN mkdir -p /app/uploads && chown cinemaapp:cinemagrp /app/uploads

VOLUME ["/app/uploads"]

USER cinemaapp

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=45s --retries=3 \
    CMD node -e "\
      const http = require('http'); \
      http.get('http://localhost:8080/movies', (r) => { \
        process.exit(r.statusCode >= 500 ? 1 : 0); \
      }).on('error', () => process.exit(1));"

ENV NODE_ENV=production

CMD ["node", "src/index.js"]
