# MQ Akademiyası — Veb Sayt

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Prisma · SQLite · NextAuth

---

## Quraşdırma — 5 addım

### 1. Asılılıqları quraşdırın
```bash
cd mq-akademiya
npm install
```

### 2. Prisma client yaradın
```bash
npx prisma generate
```

### 3. Databazanı qurun
```bash
npx prisma db push
```

### 4. Nümunə məlumatları yükləyin
```bash
npm run db:seed
```

### 5. Layihəni başladın
```bash
npm run dev
```

Brauzer: [http://localhost:3000](http://localhost:3000)

---

## Admin Panel

URL: [http://localhost:3000/admin](http://localhost:3000/admin)

**Giriş məlumatları:**
- İstifadəçi: `admin`
- Şifrə: `mq2026admin`

> `.env` faylında dəyişdirə bilərsiniz

---

## Test nəticə kodları (Nəticələr səhifəsi)

| Kod | Ad |
|---|---|
| `MQ-2026-0473` | Aysu Məmmədli |
| `MQ-2026-0474` | Rəvan Hüseynov |
| `MQ-2026-0475` | Nigar Quliyeva |
| `MQ-2026-0476` | Elnur Şıxəliyev |
| `MQ-2026-0477` | Səbinə Əliyeva |

---

## Excel Şablonu (Nəticə yükləmək üçün)

Sütunlar bu ardıcıllıqla olmalıdır:

| Tələbə kodu | Ad Soyad | Filial | C1 | C2 | C3 | ... |
|---|---|---|---|---|---|---|
| MQ-2026-0500 | Tələbə Adı | Xırdalan | A | B | C | ... |

---

## Funksiyanallıqlar

| Hissə | Nə edir |
|---|---|
| **Public site** | Akademiya, Tədris, İmtahanlar, Nəticələr, Əlaqə, Vakansiya |
| **Nəticə axtarış** | Tələbə kodu → ümumi bal + hər sualda cavab vs düzgün cavab |
| **Admin: Postlar** | CRUD — xəbər/elan əlavə, redaktə, sil |
| **Admin: Vakansiyalar** | CRUD — iş elanı idarəetməsi |
| **Admin: İmtahanlar** | CRUD — tarix, mövzu, filial, tip əlavə etmək |
| **Admin: Nəticələr** | Excel upload → avtomatik emal → bazaya yazma |

---

## Şifrəli SQLite (İsteğe bağlı)

Standart SQLite şifrəsizdir. Şifrəli versiya üçün:

```bash
npm uninstall @prisma/client
npm install @prisma/client better-sqlite3-sqlcipher
```

`prisma/schema.prisma`-da:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./db.sqlite?key=SİZİN_ŞİFRƏNİZ"
}
```

---

## Deployment (Vercel)

```bash
npm install -g vercel
vercel
```

`.env` dəyərlərini Vercel dashboard-da da əlavə edin.
