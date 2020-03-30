# pikobar-jabarprov-go-id
> Web Pikobar (Pusat Informasi dan Koordinasi COVID-19 Jawa Barat), dapat diakses di https://pikobar.jabarprov.go.id

## Firebase Setup
1. Masuk dengan Google Account, lalu buka https://console.firebase.google.com/.
2. Buat project baru. Enable Analytics jika ingin mengerjakan fitur yang berhubungan dengan Analytics.
3. Di Firebase Console, pada sidebar group `Develop`, pilih `Firestore`, lalu pilih `Create database`. Pilih `Start in production mode`, lalu pilih location yang diinginkan untuk Cloud Firestore.
4. Di Firebase Console sidebar, pada menu :gear:, pilih `Project settings`. Pilih tab `Service accounts`, lalu pilih `Generate new private key`.
5. Copy file JSON yang di-download ke direktori `/seed`, lalu rename menjadi `service_account.json`.
6. Import data dari file `firestore.json` ke Firebase project
```bash
$ node json2firestore
```

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Pedoman Kontributor

Jabar Digital Service mengucapkan terima kasih kepada publik yang ingin berkontribusi untuk Pikobar :pray:.

Sebagai panduan, kami mempunyai [panduan umum untuk kontributor](https://github.com/jabardigitalservice/pikobar-relawan-readme/blob/master/README.md) dan [panduan kontributor untuk repositori ini](CONTRIBUTING.md).
