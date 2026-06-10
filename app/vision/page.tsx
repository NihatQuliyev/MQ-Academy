export default function VisionPage() {
  return (
    <>
      <section className="px-6 md:px-12 pt-20 pb-16">
        <div className="section-num">Missiya & Vizyon</div>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-none tracking-tighter text-ink max-w-4xl">
          Niyə var olduğumuz, <span className="text-orange">nəyə doğru</span> getdiyimiz.
        </h1>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Mission */}
          <div className="bg-white border border-ink/[0.08] rounded-3xl p-6 md:p-11 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.svg" alt="MQ" className="w-7 h-7 rounded-full bg-orange-tint object-contain p-0.5" />
              <span className="text-xs font-semibold text-orange uppercase tracking-widest">Missiyamız</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-5 leading-tight tracking-tight">
              Hər bir şagirdin daxilindəki <span className="text-orange">potensialı</span> kəşf etmək.
            </h2>
            <p className="text-base text-ink-3 leading-relaxed">
              Şagirdlərimizə yalnız imtahanda deyil, həyatda da uğur qazanmağa kömək edəcək keyfiyyətli
              və əlçatan təhsil verməkdir. MQ Akademiyası olaraq, fərdi yanaşma və müasir metodlarla
              tələbələrimizə oxumağı sevdirmək, onları gələcəyin savadlı, sərbəst düşünən və uğurlu
              fərdləri kimi yetişdirməyi özümüzə borc bilirik.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-3xl p-6 md:p-11 relative overflow-hidden" style={{ background: "#2C1A0E" }}>
            <div className="absolute top-0 right-0 w-72 h-72 opacity-20 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(238,106,26,0.5), transparent 70%)" }} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-7 h-7 rounded-full bg-orange text-white flex items-center justify-center text-xs font-bold">V</div>
                <span className="text-xs font-semibold text-orange-2 uppercase tracking-widest">Vizyonumuz</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-5 leading-tight">
                Ölkənin ən çox <span className="text-orange-2">güvənilən</span> təhsil mərkəzinə çevrilmək.
              </h2>
              <p className="text-base text-white/75 leading-relaxed">
                Yüksək nəticələri, peşəkar komandası və yenilikçi təhsil modelləri ilə sevilən və lider
                mərkəzlərindən birinə çevrilməkdir. Filiallarımızın şəbəkəsini daha da genişləndirməyi,
                təhsil texnologiyalarını daim yeniləməyi və hər bir tələbəmizin qlobal dünyada
                rəqabətədavamlı biliklərə sahib olmasını təmin etməyi hədəfləyirik.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
