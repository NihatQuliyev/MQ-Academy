import Link from "next/link";

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  image?: string | null;
}

export default function PostCard({ id, title, category, date, image }: PostCardProps) {
  return (
    <Link href={`/posts/${id}`} className="group relative block rounded-2xl overflow-hidden no-underline aspect-square bg-orange-tint">

      {/* Şəkil */}
      {image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )}

      {/* Kateqoriya badge */}
      <span className="absolute top-4 left-4 bg-orange text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
        {category}
      </span>

      {/* Aşağıdan qaranlıq gradient + başlıq */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-white font-extrabold text-lg leading-snug line-clamp-3 mb-1.5">
          {title}
        </h3>
        <p className="text-white/60 text-xs">
          {date}
        </p>
      </div>
    </Link>
  );
}
