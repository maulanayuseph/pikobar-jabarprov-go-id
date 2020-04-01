# Pedoman Umum Kontributor

1. Pastikan Anda sudah membaca [Pedoman Umum Relawan Pikobar COVID-19](https://github.com/jabardigitalservice/pikobar-relawan-readme/blob/master/README.md).
2. Jika ada usulan dan saran terkait pengembangan fitur Pikobar, silakan [buat issue baru](https://github.com/jabardigitalservice/pikobar-jabarprov-go-id/issues/new) untuk mendiskusikan usulan tersebut.
3. Jika tidak punya usulan baru, Anda dapat melihat daftar issue yang ada [di
sini](https://github.com/jabardigitalservice/pikobar-jabarprov-go-id/issues). Silakan terlibat di dalam diskusi.
4. Fork project ini dan lakukan modifikasi.
5. [Buat Pull Request](https://github.com/jabardigitalservice/pikobar-jabarprov-go-id/pulls) dengan memberikan deskripsi yang jelas terkait modifikasi yang dilakukan.

# Pedoman dalam Memulai Development:
1. `git checkout -t origin/development`
2. `git pull origin development`
3. `git branch <branch-name>`
4. nama branch dan commit message  dianjurkan mengikuti [format ini](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716),. Contoh nama branch: `feat/dashboard`, `refactor/chart-component` . Contoh commit message: `fix: slugify infographics using kebab-case` .
 `git push -u origin <branch-name>` 

# Pedoman dalam Membuat Pull Request (PR):
1. Sebelum membuat PR, jalankan perintah `npm run generate && npm run start` lalu buka dev server di `HOST:PORT` masing-masing (default  di `localhost:8083`). Ini untuk memastikan tidak ada hal-hal ganjil yang muncul pada mode production , misalnya: CSS yang hilang akibat plugin `PurgeCSS` pada webpack.
2. Buat PR, dengan base: `development` dan compare: `<branch-name>` .
3. Jika PR terkait issue, dianjurkan menggunakan [closing message](https://help.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue). 
4. Setiap kali PR dibuat, Netlify akan meng-generate Deploy Preview.
5. Branch akan di-merge setelah melalui proses review.