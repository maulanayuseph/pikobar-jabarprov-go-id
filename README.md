# PIKOBAR WEB
[![Netlify Status](https://api.netlify.com/api/v1/badges/b5ef963e-c5e3-45e7-999e-634950ac3b27/deploy-status)](https://app.netlify.com/sites/jabarprov-covid19/deploys)

> Web Pikobar (Pusat Informasi dan Koordinasi COVID-19 Jawa Barat), dapat diakses di https://pikobar.jabarprov.go.id


## Index
- [Firebase Setup](#firebase-setup)
  - [Environment Variable Setup](#environment-variable-setup)
  - [Firestore Setup](#firestore-setup)
- [Build Setup](#build-setup)
- [Pedoman Kontributor](#pedoman-kontributor)

## Firebase Setup
Pikobar menggunakan [Firebase](https://firebase.google.com/) sebagai _backend_.

### Environment Variable Setup
#### Service Account
1. Masuk dengan Google Account, lalu buka https://console.firebase.google.com/.
2. Buat projek baru. Aktifkan opsi Enable Analytics.
3. Pada _sidebar_, lihat grup `Develop`. Pilih `Database`. Pilih `Create database`. Pilih `Start in production mode`, lalu pilih _location_ yang diinginkan untuk Cloud Firestore.
![Create Database](https://user-images.githubusercontent.com/4391973/77878823-69d3ec80-7283-11ea-8a83-62857b58f229.png)
4. Pada _sidebar_, klik ikon menu :gear:. Pilih `Project settings`. Pilih tab `Service accounts`. Klik `Generate new private key`. _Service account credentials_ akan diunduh dalam bentuk JSON.
![Generate service account private key](https://user-images.githubusercontent.com/4391973/77879531-d7344d00-7284-11ea-880c-bedab6e508bd.png)
5. Ubah nama _file_ JSON dari langkah (4) menjadi `config.firebase.service-account.js`.
6. Buka _file_ tersebut lalu ganti isinya menjadi seperti ini. Catatan: sesuaikan nilai dari `<VALUE>`.
    ```javascript
    module.exports = {
      type: '<VALUE>',
      project_id: '<VALUE>',
      private_key_id: '<VALUE>',
      private_key: '<VALUE>',
      client_email: '<VALUE>',
      client_id: '<VALUE>',
      auth_uri: '<VALUE>',
      token_uri: '<VALUE>',
      auth_provider_x509_cert_url: '<VALUE>',
      client_x509_cert_url: '<VALUE>'
    }
    ```
7. Simpan file pada langkah (6) ke dalam _root folder_ project, yakni sejajar dengan `package.json`.

#### Firebase SDK
1. Pada _sidebar_, pilih `Project Overview`.
2. Jika projek masih kosong, pilih ikon berlambang `</>`.
3. Jika sudah terdapat aplikasi lain dalam projek, pilih `Add app`, lalu pilih `Web`.
![Add app](https://user-images.githubusercontent.com/4391973/78126183-53bd5c00-743c-11ea-9fdb-8bb7ae0d4aa2.png)
4. Salin nilai variabel `firebaseConfig` ke dalam file bernama `config.firebase.sdk.js`.
![firebaseConfig variable](https://user-images.githubusercontent.com/4391973/78128616-6a65b200-7440-11ea-854d-775a15094f80.png)
5. Taruh _file_ dari langkah (4) pada _root folder_ projek, yakni sejajar dengan `package.json`.
6. Buka _file_ tersebut, lalu ganti isinya menjadi seperti ini. Catatan: sesuaikan nilai dari `<VALUE>`.
    ```javascript
    module.exports = {
      apiKey: '<VALUE>',
      authDomain: '<VALUE>',
      databaseURL: '<VALUE>',
      projectId: '<VALUE>',
      storageBucket: '<VALUE>',
      messagingSenderId: '<VALUE>',
      appId: '<VALUE>',
      measurementId: '<VALUE>',
      publicVapidKey: '<VALUE>'
    }
    ```
7. Untuk mendapatkan nilai dari `publicVapidKey`, klik menu :gear: pada _sidebar_. Pilih `Project settings`. Pilih tab `Cloud Messaging`.
8. Pada bagian `Web configuration > Web Push certificates`, klik `Generate Key Pair`. Salin nilai yang muncul ke dalam variabel `publicVapidKey` pada _file_ di langkah (6). 
![Cloud Messaging generate key pair](https://user-images.githubusercontent.com/4391973/78129695-2ecbe780-7442-11ea-9197-7e55bd284380.png)

#### Membuat file `.env`
1. Pada langkah ini, Anda telah mempunyai file bernama `config.firebase.service-account.js` dan `config.firebase.sdk.js` pada _root folder_ projek Anda.
2. Buka terminal, lalu arahkan ke folder projek Anda.
3. Jalankah perintah berikut.
    ```bash
    $ npm run write:env
    ```
4. Pastikan perintah tersebut menghasilkan `.env` yang berkesesuaian dengan `.env.example`.

### Firestore Setup
1. Di Firebase Console, pada sidebar group `Develop`, pilih `Database`, lalu pilih tab `Rules`. Salin isi file `migration/firestore.rules` ke area yang disediakan. Lalu pilih `Publish`.
![Update Firestore Rules](https://user-images.githubusercontent.com/4391973/78131722-bb2bd980-7445-11ea-929d-26c5ee21012a.png)
2. Buka terminal, lalu arahkan ke folder projek Anda.
3. Jalankan perintah berikut.
    ```bash
    $ npm run migrate
    ```
4. Proses ini dapat memakan waktu 5-10 menit.
5. Suksesnya perintah akan ditandai dengan `log` bertuliskan `Firestore data successfully imported`.

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
