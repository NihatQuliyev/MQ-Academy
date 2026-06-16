# MQ Akademiyası — Rəsmi Veb Sayt

> Keyfiyyətli təhsil üçün etibarlı tərəfdaşınız. Bakı, Azərbaycan.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-336791?logo=postgresql)](https://www.postgresql.org/)

---

## Haqqında

Bu layihə **MQ Akademiyası**nın tam funksional veb saytıdır. İctimai (public) hissə ilə birlikdə tam admin idarəetmə panelini əhatə edir. Azərbaycan və İngilis dillərini dəstəkləyir.

---

## Xüsusiyyətlər

### İctimai Sayt
| Səhifə | Açıqlama |
|--------|----------|
| Ana səhifə | Hero, proqramlar, niyə MQ, son xəbərlər, CTA |
| Haqqımızda | Akademiyanın missiyası və tarixi |
| Vizyon | Gələcəyə baxış |
| Proqramlar | 8 fərqli tədris proqramı (İbtidai, Abituriyent, IELTS, Magistr və s.) |
| İmtahan təqvimi | Sınaq imtahanlarının tarixləri, filiallar, mövzular |
| Nəticələr | Tələbə kodu ilə nəticə axtarışı (bal, düzgün/yanlış cavablar) |
| Vakansiyalar | Açıq iş elanları və CV müraciət forması |
| Əlaqə | Əlaqə forması (birbaşa email bildirişi ilə) |
| Xəbərlər | Blog postları |

### Admin Panel (`/admin`)
| Bölmə | Açıqlama |
|-------|----------|
| Dashboard | Statistika, son postlar, yaxın imtahanlar |
| Postlar | Xəbər/elan əlavə et, redaktə et, sil |
| Vakansiyalar | İş elanı idarəetməsi |
| Müraciətlər | Vakansiyalara daxil olan CV-lər |
| İmtahanlar | Tarix, filial, mövzu, tip idarəetməsi |
| Nəticələr | Excel fayl yükləmə → avtomatik emal → bazaya yazma |
| Mesajlar | Saytdan gələn əlaqə/müraciət mesajları |
| Mövzular | İmtahan mövzu bölmələri (sinif, qrup, dil üzrə) |
| Ayarlar | Admin şifrə dəyişdirmə |

### Digər
- **AZ / EN** dil dəstəyi (bütün UI tam tərcümə olunub)
- Tam **mobil responsive** dizayn (hamburger menu, adaptiv grid)
- **Vercel Blob** ilə şəkil və CV fayl yükləmə
- **Excel** ilə toplu nəticə import (xlsx)
- NextAuth.js ilə təhlükəsiz admin girişi

---

## Texnologiyalar

- **Framework:** Next.js 14 (App Router)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS
- **ORM:** Prisma
- **Databaza:** PostgreSQL (Supabase / Neon tövsiyə olunur)
- **Auth:** NextAuth.js (credentials provider)
- **Fayl yükləmə:** Vercel Blob
- **Excel:** xlsx (SheetJS)
- **Deploy:** Vercel

---

## Excel Nəticə Şablonu

Nəticə yükləmək üçün Excel faylı bu sütun ardıcıllığında olmalıdır:

| Tələbə kodu | Ad Soyad | Filial | C1 | C2 | C3 | ... |
|-------------|----------|--------|----|----|----|-----|
| MQ-2026-0500 | Tələbə Adı | Xırdalan | A | B | C | ... |

Admin paneldən → **Nəticələr** → **Excel yüklə** bölməsindən import edin.

---

## Müəllif Hüququ

© 2026 **MQ Akademiyası**. Bütün hüquqlar qorunur.

Bu layihənin mənbə kodu **Elchin Huseynli** və **Nihat Quliyev** tərəfindən hazırlanmışdır.  
İcazəsiz kopyalanması, paylaşılması və ya kommersiya məqsədilə istifadəsi qadağandır.

---

*MQ Akademiyası — Bakı, Azərbaycan*
