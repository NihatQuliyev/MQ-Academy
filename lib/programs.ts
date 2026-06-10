export type ProgramIconKey = "pen" | "trend" | "award" | "globe" | "book" | "clip" | "monitor" | "sun";

export interface Program {
  slug: string;
  icon: ProgramIconKey;
  title: string;
  desc: string;
  hero: string;
  age?: string;
  duration?: string;
  schedule?: string;
  badges: string[];
  about: string[];
  subjects: { name: string; icon: string }[];
  features: { title: string; desc: string }[];
  targets: string[];
}

export const programs: Program[] = [
  {
    slug: "ibtidai-sinif",
    icon: "pen",
    title: "İbtidai sinif hazırlığı",
    desc: "Dünyagörüşün artırılması, məntiqi təfəkkürün inkişafı və məktəb dərslərinin mənimsənilməsi.",
    hero: "Uşağınızı məktəbə hazırlayırıq — həm bilik, həm xarakter.",
    age: "5–7 yaş",
    duration: "9 ay (sentyabr–may)",
    schedule: "Həftədə 3 gün · 60 dəq",
    badges: ["5–7 yaş", "Oyunla öyrənmə", "Kiçik qruplar"],
    about: [
      "MQ Akademiyasının ibtidai sinif proqramı uşaqları yalnız dərs üçün deyil, həyat üçün hazırlayır. Müasir pedaqoji metodlarla hər uşağın fərdi inkişaf tempi nəzərə alınır.",
      "Məntiqi düşüncə, kreativ yanaşma və sosial bacarıqlar — bunlar akademik biliklərlə paralel inkişaf etdirilir. Uşaqlar məktəbə hazır, özgüvənli və maraqla dolu gedəcək.",
    ],
    subjects: [
      { name: "Riyaziyyat", icon: "🔢" },
      { name: "Azərbaycan dili", icon: "🅰️" },
      { name: "Dünyagörüşü", icon: "🌍" },
      { name: "Məntiqi düşüncə", icon: "🧩" },
      { name: "Oxu və yazı", icon: "📖" },
      { name: "Yaradıcılıq", icon: "🎨" },
    ],
    features: [
      { title: "Fərdi yanaşma", desc: "Hər uşağın inkişaf tempinə uyğun tədris planı hazırlanır." },
      { title: "Oyunla öyrənmə", desc: "Dərslər interaktiv, əyləncəli metodlarla keçirilir." },
      { title: "Kiçik qruplar", desc: "Maksimum 8 nəfərlik qruplar — hər uşağa diqqət." },
      { title: "Valideyn əlaqəsi", desc: "Aylıq hesabat və valideynlərlə daimi ünsiyyət." },
    ],
    targets: [
      "Rəqəmləri, hərfləri asanlıqla tanıyır",
      "Məntiqi tapşırıqları həll edir",
      "Özünü cəmiyyətdə rahat hiss edir",
      "Məktəbə psixoloji hazırdır",
    ],
  },
  {
    slug: "tekmillesdirme",
    icon: "trend",
    title: "Təkmilləşdirmə (5–8)",
    desc: "Məktəb proqramının dərindən öyrənilməsi, zəif fənlərin gücləndirilməsi və baza biliklərin formalaşdırılması.",
    hero: "Zəif fəndən güclü fənə — addım-addım.",
    age: "5–8 sinif",
    duration: "9 ay (sentyabr–may)",
    schedule: "Həftədə 2–3 gün · 90 dəq",
    badges: ["5–8 sinif", "Fərdi proqram", "Bütün fənlər"],
    about: [
      "5–8-ci sinif şagirdləri üçün hazırlanmış bu proqram məktəb kurikulumunu dərinləşdirir. Hər şagirdin zəif olduğu fənlər aşkar edilir və xüsusi diqqət göstərilir.",
      "Güclü baza biliklər olmadan yuxarı siniflərdə uğur mümkün deyil. Biz bu əsası birlikdə qururuq — səbrlə, ardıcıllıqla, nəticə istiqamətli.",
    ],
    subjects: [
      { name: "Riyaziyyat", icon: "📐" },
      { name: "Fizika", icon: "⚡" },
      { name: "Kimya", icon: "🧪" },
      { name: "Azərbaycan dili", icon: "📝" },
      { name: "İngilis dili", icon: "🌐" },
      { name: "Biologiya", icon: "🌿" },
      { name: "Coğrafiya", icon: "🗺️" },
      { name: "Tarix", icon: "🏛️" },
    ],
    features: [
      { title: "Diaqnostik qiymətləndirmə", desc: "İlk həftədə hər şagirdin səviyyəsi müəyyən edilir." },
      { title: "Fərdi plan", desc: "Hər şagird üçün ayrıca tədris cədvəli hazırlanır." },
      { title: "Həftəlik izləmə", desc: "Müntəzəm testlər və ev tapşırıqlarının yoxlanması." },
      { title: "Çalışma bazası", desc: "Geniş sual bankı və məktəb imtahan materialları." },
    ],
    targets: [
      "Məktəb qiymətlərini yüksəldir",
      "Fənni sevir və maraqla öyrənir",
      "Abituriyent hazırlığına möhkəm baza ilə gedir",
      "Özgüvəni artan şagird olur",
    ],
  },
  {
    slug: "abituriyent",
    icon: "award",
    title: "Abituriyent (9–11)",
    desc: "Dövlət İmtahan Mərkəzinin (DİM) proqramına tam uyğun, yüksək nəticə hədəfli universitetə qəbul hazırlığı.",
    hero: "DİM-ə hazırlan, arzuladığın universiteti qazan.",
    age: "9–11 sinif",
    duration: "1–2 il",
    schedule: "Həftədə 4–5 gün · 90 dəq",
    badges: ["DİM proqramı", "Yüksək nəticə", "Hər qrup fənni"],
    about: [
      "MQ Akademiyasının abituriyent proqramı DİM-in rəsmi imtahan formatına tam uyğun hazırlanmışdır. Hər fənn üzrə ixtisaslaşmış müəllimlər şagirdlərə real imtahan şəraitini yaşatmağa kömək edir.",
      "İl ərzində keçirilən mock imtahanlar, zamanla artırılan çətinlik dərəcəsi və intensiv çalışma — bunlar yüksək bala aparan yoldur. Hər şagirdin hədəfi müəyyən edilir və o hədəfə birlikdə çatılır.",
    ],
    subjects: [
      { name: "Riyaziyyat", icon: "📐" },
      { name: "Fizika", icon: "⚡" },
      { name: "Kimya", icon: "🧪" },
      { name: "Biologiya", icon: "🌿" },
      { name: "Coğrafiya", icon: "🗺️" },
      { name: "Tarix", icon: "🏛️" },
      { name: "Azərbaycan dili", icon: "📝" },
      { name: "İngilis dili", icon: "🌐" },
      { name: "İnformatika", icon: "💻" },
    ],
    features: [
      { title: "Mock imtahanlar", desc: "Ayda 1–2 dəfə real DİM şəraitini simulyasiya edən imtahanlar." },
      { title: "Sual analizi", desc: "Keçmiş illərin bütün DİM sualları sistemli şəkildə işlənir." },
      { title: "Zaman idarəetməsi", desc: "Sürət və dəqiqliyi artırmaq üçün xüsusi texnikalar." },
      { title: "Motivasiya dəstəyi", desc: "Psixoloji hazırlıq, stress idarəetməsi və motivasiya sessiyaları." },
    ],
    targets: [
      "Yüksək DİM balı toplayır",
      "Seçdiyi ixtisasa qəbul olur",
      "İmtahan psixologiyasına hazırdır",
      "Vaxtı effektiv idarə edir",
    ],
  },
  {
    slug: "xarici-dil",
    icon: "globe",
    title: "Xarici dil",
    desc: "Danışıq, yazı və dinləmə bacarıqlarının inkişafı. General English və IELTS hazırlığı.",
    hero: "İngilis dilini öyrən — dünyaya açıl.",
    age: "Hər yaş",
    duration: "6–12 ay (səviyyəyə görə)",
    schedule: "Həftədə 3 gün · 90 dəq",
    badges: ["General English", "IELTS", "Hər səviyyə"],
    about: [
      "Başlanğıcdan C1 səviyyəsinə, General English-dən IELTS hazırlığına — MQ Akademiyasında bütün dil ehtiyaclarınız qarşılanır. Dərslərimiz kommunikativ metodoloji əsasında qurulub.",
      "Real həyat situasiyaları, autentik materiallar və intensiv danışıq məşqləri ilə tələbələrimiz qısa müddətdə dil baryerini aşır. IELTS hazırlığı üçün isə xüsusi band score strategiyaları tədris edilir.",
    ],
    subjects: [
      { name: "Speaking", icon: "🗣️" },
      { name: "Listening", icon: "👂" },
      { name: "Reading", icon: "📖" },
      { name: "Writing", icon: "✍️" },
      { name: "Grammar", icon: "📚" },
      { name: "IELTS Hazırlığı", icon: "🎯" },
    ],
    features: [
      { title: "Kommunikativ metod", desc: "Dərsin 60%-i canlı danışıq və müzakirə üzərinde qurulub." },
      { title: "Autentik materiallar", desc: "BBC, TED Talks, Guardian və digər real mənbələrdən materiallar." },
      { title: "IELTS strategiyaları", desc: "Hər task tipi üçün xüsusi yanaşma və nümunə cavablar." },
      { title: "Səviyyə testləri", desc: "Hər 6 həftədən bir rəsmi progress testi keçirilir." },
    ],
    targets: [
      "Sərbəst ünsiyyət qura bilir",
      "IELTS-də hədəf bandı alır",
      "Yazılı ingilis dili bacarığı güclənir",
      "Dil öyrənməyə müsbət münasibət yaranır",
    ],
  },
  {
    slug: "magistr",
    icon: "book",
    title: "Magistr hazırlığı",
    desc: "Universitet məzunlarının magistratura pilləsinə peşəkar səviyyədə hazırlığı.",
    hero: "Karyeranın növbəti mərhələsi — magistratura.",
    age: "Bakalavr məzunları",
    duration: "6–9 ay",
    schedule: "Həftədə 3–4 gün · 90 dəq",
    badges: ["Magistratura", "Peşəkar hazırlıq", "Bütün ixtisaslar"],
    about: [
      "Magistratura imtahanı ciddi hazırlıq tələb edir. MQ Akademiyası bu prosesdə sizə tam dəstək verir — imtahan formatından tutmuş mövzuların dərindən işlənməsinə qədər.",
      "Xüsusi fənn biliklərini, imtahan strategiyalarını və zaman idarəetməsini birlikdə məşq edəcəyik. Məzunlarımız hər il uğurla magistraturaya qəbul olunur.",
    ],
    subjects: [
      { name: "İxtisas fənni", icon: "🎓" },
      { name: "Xarici dil", icon: "🌐" },
      { name: "Ümumi bilik", icon: "🧠" },
      { name: "Test strategiyası", icon: "📋" },
      { name: "Müsahibə hazırlığı", icon: "🗣️" },
      { name: "Elmi yazı", icon: "📄" },
    ],
    features: [
      { title: "İmtahan analizi", desc: "Keçmiş illərin magistr imtahan sualları ətraflı işlənir." },
      { title: "İxtisas dərinliyi", desc: "Seçilmiş ixtisas üzrə dərin fənn biliklərinin inkişafı." },
      { title: "Mock imtahanlar", desc: "Real imtahan şəraitini simulyasiya edən məşq imtahanları." },
      { title: "Müsahibə hazırlığı", desc: "Universitetin müsahibə mərhələsinə xüsusi hazırlıq." },
    ],
    targets: [
      "Magistratura imtahanında yüksək bal alır",
      "İxtisas fənlərini dərindən bilir",
      "Müsahibəyə hazırdır",
      "Arzuladığı universitetə qəbul olur",
    ],
  },
  {
    slug: "miq",
    icon: "clip",
    title: "MİQ — Müəllimlərin İmtahanı",
    desc: "Müəllimlərin işə qəbul imtahanlarına peşəkar səviyyədə hazırlığı.",
    hero: "MİQ-i keç, peşəkar müəllim kimi çalış.",
    age: "Pedaqoji ixtisas sahibləri",
    duration: "4–6 ay",
    schedule: "Həftədə 3 gün · 90 dəq",
    badges: ["MİQ formatı", "Pedaqogika", "Fənn bilikləri"],
    about: [
      "MİQ imtahanı müəllimlik sertifikatı almaq istəyən hər kəs üçün məcburidir. MQ Akademiyasında bu imtahana peşəkar hazırlıq — həm ümumi pedaqoji bilikler, həm də ixtisas fənni üzrə.",
      "İmtahanın bütün bölmələri — test hissəsi, praktiki tapşırıqlar — sistemli şəkildə işlənir. Keçmiş illərin sualları analiz edilir, zəif nöqtələr müəyyən edilib gücləndirilir.",
    ],
    subjects: [
      { name: "Pedaqogika", icon: "🏫" },
      { name: "Psixologiya", icon: "🧠" },
      { name: "İxtisas fənni", icon: "📚" },
      { name: "Azərbaycan tarixi", icon: "🏛️" },
      { name: "Test strategiyası", icon: "📋" },
      { name: "Kurikulum", icon: "📋" },
    ],
    features: [
      { title: "MİQ formatına tam uyğun", desc: "Rəsmi imtahan strukturuna görə qurulmuş tədris planı." },
      { title: "Keçmiş suallar", desc: "Son illərin bütün MİQ sualları sistemli şəkildə işlənir." },
      { title: "Pedaqoji biliklər", desc: "Müasir tədris metodları, sinif idarəetməsi, qiymətləndirmə." },
      { title: "Güclü dəstək", desc: "Hər həftə mini test və nəticə analizi." },
    ],
    targets: [
      "MİQ imtahanından uğurla keçir",
      "Müəllimlik sertifikatı alır",
      "Müasir pedaqoji bilikləri mənimsəyir",
      "Dövlət məktəbinə işə düzəlir",
    ],
  },
  {
    slug: "ofis-proqramlari",
    icon: "monitor",
    title: "Ofis proqramları",
    desc: "Karyerada uğur qazanmaq üçün zəruri kompyuter proqramlarının sıfırdan öyrənilməsi.",
    hero: "Kompyuter bacarıqları — müasir iş dünyasının açarı.",
    age: "Hər yaş",
    duration: "3–6 ay",
    schedule: "Həftədə 3 gün · 90 dəq",
    badges: ["Microsoft Office", "Sıfırdan", "Sertifikat"],
    about: [
      "Müasir iş mühitində kompyuter bacarıqları əsas tələb halına gəlib. MQ Akademiyasında Microsoft Office paketini sıfırdan öyrənib peşəkar səviyyəyə çata bilərsiniz.",
      "Praktiki tapşırıqlar, real iş ssenarilərinin simulyasiyası və addım-addım öyrədim metodu ilə qısa müddətdə iş proseslərini daha sürətli, dəqiq və effektiv yerinə yetirəcəksiniz.",
    ],
    subjects: [
      { name: "Microsoft Word", icon: "📄" },
      { name: "Microsoft Excel", icon: "📊" },
      { name: "Microsoft PowerPoint", icon: "📽️" },
      { name: "Microsoft Outlook", icon: "📧" },
      { name: "Kompyuter əsasları", icon: "💻" },
    ],
    features: [
      { title: "Sıfırdan başlayır", desc: "Heç bir ön bilik tələb olunmur, tamamilə əsasdan öyrənilir." },
      { title: "Praktik yönümlü", desc: "Hər dərsdə real iş tapşırıqları yerinə yetirilir." },
      { title: "Sertifikat", desc: "Kursu bitirən tələbələrə MQ Akademiyası sertifikatı verilir." },
      { title: "Kiçik qruplar", desc: "Maksimum 6 nəfərlik qrupda fərdi diqqət." },
    ],
    targets: [
      "Excel-də cədvəl və hesabat hazırlayır",
      "Word-də peşəkar sənəd tərtib edir",
      "PowerPoint ilə təqdimat hazırlayır",
      "İş müraciətlərində kompyuter bilikləri tələbini ödəyir",
    ],
  },
  {
    slug: "yay-mektepleri",
    icon: "sun",
    title: "Yay məktəbləri",
    desc: "Şagirdlərin yay tətilini həm əyləncəli, həm də intellektual keçirmələri üçün xüsusi inkişaf proqramları.",
    hero: "Yayı boş keçirmə — inkişaf et, əylən, tanış ol.",
    age: "6–16 yaş",
    duration: "4–8 həftə (iyun–avqust)",
    schedule: "Həftə içi · Hər gün · 4 saat",
    badges: ["Yay tətili", "Əyləncə + Bilik", "6–16 yaş"],
    about: [
      "MQ Akademiyasının yay məktəbi şagirdlərə tətili boş keçirməmək üçün ən yaxşı fürsəti verir. Bilik, əylənc və yeni dostlar — hamısı bir yerdə.",
      "Hər yaş qrupu üçün fərqli proqramlar hazırlanmışdır. Sabah dərsləri akademik mövzuları, günorta fəaliyyətlər isə kreativ, idman və komanda oyunlarını əhatə edir.",
    ],
    subjects: [
      { name: "Riyaziyyat", icon: "📐" },
      { name: "İngilis dili", icon: "🌐" },
      { name: "Yaradıcı yazı", icon: "✍️" },
      { name: "Məntiqi oyunlar", icon: "🧩" },
      { name: "İncəsənət", icon: "🎨" },
    ],
    features: [
      { title: "Komanda ruhu", desc: "Qrup fəaliyyətləri ilə sosial bacarıqlar inkişaf edir." },
      { title: "Fərqli proqramlar", desc: "Hər yaş qrupu üçün ayrıca hazırlanmış fəaliyyət planı." },
      { title: "Güvənli mühit", desc: "Nəzarətli, sağlam və stimullaşdırıcı öyrənmə mühiti." },
      { title: "Həftəlik hesabat", desc: "Valideynlərə həftəlik inkişaf xülasəsi göndərilir." },
    ],
    targets: [
      "Tətili məhsuldar keçirir",
      "Yeni dostlar qazanır",
      "Akademik bilikləri möhkəmlədir",
      "Yaradıcı düşüncəsini inkişaf etdirir",
    ],
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
