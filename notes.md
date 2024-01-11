## Add SSL

https://derekcolley.medium.com/vue-js-develop-with-https-2b95ad120a72

1. Add this to /etc/hosts file

```file
127.0.0.1 dev.local
```

2. `ping dev.local` to check connection

## Install mkcert

https://github.com/FiloSottile/mkcert

```bash
   curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
   chmod +x mkcert-v*-linux-amd64
   sudo cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert
```

### Update Vite Config

```json
import { readFileSync } from "fs";
 server: {
    host: "dev.local",
    port: 8080,
    // disableHostCheck: true,
    https: {
      key: readFileSync("./certs/dev.local+4-key.pem"),
      cert: readFileSync("./certs/dev.local+4.pem"),
      //ca: readFileSync('./certs/my-ca.crt')
    },
    proxy: {
      "^/api": {
        target: "http://localhost:1337",
        changeOrigin: true,
      },
    },
  },
```
