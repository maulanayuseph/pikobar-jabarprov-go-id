# pikobar-jabarprov-go-id
> Web Pikobar (Pusat Informasi dan Koordinasi COVID-19 Jawa Barat), dapat diakses di https://pikobar.jabarprov.go.id

## Index
- [Firebase Setup](#firebase-setup)
  - [Firestore Setup](#firestore-setup)
  - [Environment Variable Setup](#environment-variable-setup)
- [Build Setup](#build-setup)
- [Pedoman Kontributor](#pedoman-kontributor)

## Firebase Setup
Pikobar menggunakan [Firebase](https://firebase.google.com/) sebagai backend.

### Firestore Setup
1. Masuk dengan Google Account, lalu buka https://console.firebase.google.com/.
2. Buat project baru dan enable Analytics.
3. Di Firebase Console, pada sidebar group `Develop`, pilih `Database`, lalu pilih `Create database`. Pilih `Start in production mode`, lalu pilih location yang diinginkan untuk Cloud Firestore.
![Create Database](https://user-images.githubusercontent.com/4391973/77878823-69d3ec80-7283-11ea-8a83-62857b58f229.png)
4. Di Firebase Console sidebar, pada menu :gear:, pilih `Project settings`. Pilih tab `Service accounts`, lalu pilih `Generate new private key`. Service account credentials akan di-download dalam bentuk JSON.
![Generate service account private key](https://user-images.githubusercontent.com/4391973/77879531-d7344d00-7284-11ea-880c-bedab6e508bd.png)
5. Jalankan command berikut, dengan menyertakan credentials yang di-download pada step 4.
```bash
$ CREDENTIALS=/path/to/service_account.json npm run migrate
```

### Environment Variable Setup
1. Copy file `.env.example` menjadi sebuah file baru yang bernama  `.env`
```bash
cp .env.example .env
```
2. Masukkan value yang ada di dalam service account credentials ke dalam file `.env`, untuk env variable dengan prefix `FIREBASE_ADMIN_*` (misalnya, attribute `private_key_id` pada credentials dimasukkan ke env variable `FIREBASE_ADMIN_PRIVATE_KEY_ID`).
3.

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
