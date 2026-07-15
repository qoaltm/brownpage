// General, widely-taught coffee knowledge, presented as a practical guide,
// not lab-grade specification. Numbers are typical ranges, not fixed rules.

// A practical, 3-tier flavor wheel (category > subcategory > specific note).
// Vocabulary follows the terms widely used across the specialty coffee
// industry for cupping/tasting. The diagram itself (layout, colors, code)
// is original, built for Kopitaim, not a reproduction of any single
// publisher's chart.
export const flavorWheel = [
  {
    key: "fruity", label: "Fruity", color: "#D0463A",
    desc: "Nada buah, dari beri sampai jeruk. Biasanya lebih terasa di light roast dan proses natural/anaerobic.",
    sub: [
      { key: "berry", label: "Berry", desc: "Kelompok rasa beri, manis-asam, biasanya muncul di proses natural atau anaerobic.", notes: ["Blackberry", "Raspberry", "Blueberry", "Strawberry"] },
      { key: "driedfruit", label: "Dried Fruit", desc: "Rasa buah kering yang pekat dan manis, umum di kopi dengan proses penjemuran panjang.", notes: ["Raisin", "Prune", "Fig"] },
      { key: "otherfruit", label: "Other Fruit", desc: "Kelompok buah-buahan segar di luar beri dan sitrus.", notes: ["Cherry", "Pineapple", "Grape", "Apple", "Peach", "Coconut"] },
      { key: "citrus", label: "Citrus Fruit", desc: "Rasa asam cerah khas jeruk-jerukan, umum di kopi washed ketinggian tinggi.", notes: ["Lemon", "Lime", "Grapefruit", "Orange"] },
    ],
  },
  {
    key: "floral", label: "Floral", color: "#B2549E",
    desc: "Aroma bunga dan teh, umum di kopi ketinggian tinggi dengan proses washed.",
    sub: [
      { key: "flowers", label: "Floral", desc: "Aroma bunga yang halus, biasanya tercium lebih kuat di aroma daripada di rasa.", notes: ["Chamomile", "Rose", "Jasmine"] },
      { key: "tea", label: "Black Tea", desc: "Karakter mirip teh hitam, tannic dan lembut.", notes: ["Black Tea"] },
    ],
  },
  {
    key: "sweet", label: "Sweet", color: "#D9A85C",
    desc: "Rasa manis, tanda ekstraksi dan kematangan biji yang baik.",
    sub: [
      { key: "brownsugar", label: "Brown Sugar", desc: "Rasa manis karamel yang gelap dan pekat.", notes: ["Molasses", "Maple Syrup", "Caramelized", "Honey"] },
      { key: "vanilla", label: "Vanilla", desc: "Manis creamy yang aromatik.", notes: ["Vanilla"] },
      { key: "overallsweet", label: "Overall Sweet", desc: "Kesan manis menyeluruh yang menyatu dengan aroma kopi.", notes: ["Sweet Aromatics"] },
    ],
  },
  {
    key: "nuttycocoa", label: "Nutty / Cocoa", color: "#8A6240",
    desc: "Kacang dan cokelat, umum muncul di roast medium ke atas.",
    sub: [
      { key: "nutty", label: "Nutty", desc: "Rasa gurih seperti kacang-kacangan panggang.", notes: ["Peanuts", "Hazelnut", "Almond"] },
      { key: "cocoa", label: "Cocoa", desc: "Rasa cokelat, dari manis susu sampai pahit pekat.", notes: ["Chocolate", "Dark Chocolate"] },
    ],
  },
  {
    key: "spices", label: "Spices", color: "#A9762C",
    desc: "Rempah, sering muncul di proses giling basah dan roast lebih gelap.",
    sub: [
      { key: "brownspice", label: "Brown Spice", desc: "Rempah hangat yang sering muncul di roast lebih gelap.", notes: ["Cinnamon", "Nutmeg", "Clove", "Anise"] },
      { key: "pungent", label: "Pungent", desc: "Rasa tajam menggigit seperti rempah pedas.", notes: ["Pepper"] },
    ],
  },
  {
    key: "roasted", label: "Roasted", color: "#5B4636",
    desc: "Karakter sangrai, makin dominan seiring roast makin gelap.",
    sub: [
      { key: "cereal", label: "Cereal", desc: "Rasa sereal panggang yang gurih dan hangat.", notes: ["Malt", "Grain"] },
      { key: "burnt", label: "Burnt", desc: "Karakter sangrai gelap, dari hangat sampai gosong.", notes: ["Brown, Roast", "Smoky", "Ashy", "Acrid"] },
      { key: "tobacco", label: "Tobacco", desc: "Rasa earthy menyerupai tembakau kering.", notes: ["Pipe Tobacco"] },
    ],
  },
  {
    key: "sourfermented", label: "Sour / Fermented", color: "#98A02E",
    desc: "Asam dan fermentasi, dari proses natural/anaerobic yang panjang. Bisa jadi karakter positif atau off-note.",
    sub: [
      { key: "sour", label: "Sour", desc: "Kelompok rasa asam spesifik yang muncul dari proses kimiawi pada biji.", notes: ["Sour Aromatics", "Acetic Acid", "Butyric Acid", "Citric Acid", "Malic Acid"] },
      { key: "alcohol", label: "Alcohol / Fermented", desc: "Karakter fermentasi kuat, bisa jadi ciri khas atau tanda over-ferment.", notes: ["Winey", "Whiskey", "Fermented", "Overripe"] },
    ],
  },
  {
    key: "greenveg", label: "Green / Vegetative", color: "#4C6B4F",
    desc: "Sayur dan hijau, biasanya tanda under-extraction atau biji kurang matang.",
    sub: [
      { key: "green", label: "Green / Vegetative", desc: "Rasa hijau dan segar, sering muncul di light roast atau biji kurang matang.", notes: ["Under-ripe", "Peapod", "Fresh", "Dark Green", "Vegetative", "Hay-like", "Herb-like"] },
      { key: "beany", label: "Beany", desc: "Rasa mentah menyerupai biji kopi yang belum disangrai.", notes: ["Beany"] },
      { key: "oliveoil", label: "Olive Oil", desc: "Rasa berminyak dan earthy.", notes: ["Olive Oil", "Raw"] },
    ],
  },
  {
    key: "other", label: "Other", color: "#4A8FA6",
    desc: "Kategori campuran, dari aroma kertas/apak sampai catatan kimiawi yang biasanya jadi tanda cacat (defect).",
    sub: [
      { key: "papery", label: "Papery / Musty", desc: "Rasa apek dan kering, biasanya tanda kopi kehilangan kesegaran.", notes: ["Stale", "Cardboard", "Papery", "Musty/Dusty", "Musty/Earthy", "Moldy/Damp", "Woody"] },
      { key: "chemical", label: "Chemical", desc: "Aroma kimiawi yang hampir selalu jadi tanda cacat (defect).", notes: ["Rubber", "Skunky", "Petroleum", "Medicinal"] },
    ],
  },
];

// Deskripsi singkat untuk tiap catatan rasa spesifik (leaf notes) di roda rasa.
export const noteDescriptions = {
  "Blackberry": "Manis-asam pekat, mengingatkan pada beri hitam matang.",
  "Raspberry": "Asam cerah dengan sedikit rasa tajam khas beri merah.",
  "Blueberry": "Manis lembut dengan sedikit rasa earthy khas blueberry.",
  "Strawberry": "Manis segar dan aromatik seperti stroberi matang.",
  "Raisin": "Manis pekat dan sedikit kenyal seperti kismis.",
  "Prune": "Manis gelap dan lembap seperti buah plum kering.",
  "Fig": "Manis earthy dengan tekstur creamy seperti buah ara.",
  "Cherry": "Manis-asam ringan dengan sedikit rasa kayu seperti ceri.",
  "Pineapple": "Asam manis segar dan sedikit tajam seperti nanas.",
  "Grape": "Manis ringan dengan aroma segar seperti anggur.",
  "Apple": "Renyah dan segar dengan asam ringan seperti apel.",
  "Peach": "Manis lembut dan juicy seperti buah persik.",
  "Coconut": "Creamy dan sedikit manis seperti kelapa segar.",
  "Lemon": "Asam tajam dan segar khas jeruk lemon.",
  "Lime": "Asam tajam dengan sedikit rasa pahit seperti jeruk nipis.",
  "Grapefruit": "Asam pahit ringan khas jeruk bali.",
  "Orange": "Asam manis cerah seperti jeruk manis.",
  "Chamomile": "Aroma bunga lembut dan menenangkan seperti teh chamomile.",
  "Rose": "Aroma bunga manis dan elegan seperti mawar.",
  "Jasmine": "Aroma bunga ringan dan wangi seperti melati.",
  "Black Tea": "Karakter tannic lembut mirip seduhan teh hitam.",
  "Molasses": "Manis pekat dan sedikit pahit seperti gula tebu mentah.",
  "Maple Syrup": "Manis lembut dengan sedikit rasa kayu seperti sirup maple.",
  "Caramelized": "Manis karamel dari gula yang dipanaskan.",
  "Honey": "Manis lembut dan halus seperti madu.",
  "Vanilla": "Manis creamy dan aromatik seperti vanila.",
  "Sweet Aromatics": "Kesan manis menyeluruh yang tercium di aroma, bukan rasa tertentu.",
  "Peanuts": "Gurih dan sedikit berminyak seperti kacang tanah panggang.",
  "Hazelnut": "Gurih manis dan creamy seperti hazelnut panggang.",
  "Almond": "Gurih ringan dan sedikit manis seperti kacang almond.",
  "Chocolate": "Manis gurih seperti cokelat susu.",
  "Dark Chocolate": "Pahit pekat dan kaya seperti cokelat hitam.",
  "Cinnamon": "Hangat dan sedikit manis seperti kayu manis.",
  "Nutmeg": "Hangat dan earthy seperti pala.",
  "Clove": "Tajam dan hangat seperti cengkeh.",
  "Anise": "Manis dan sedikit licorice seperti adas manis.",
  "Pepper": "Tajam dan menggigit di tenggorokan seperti lada.",
  "Malt": "Manis gurih seperti malt sereal panggang.",
  "Grain": "Earthy dan gurih seperti biji-bijian mentah.",
  "Brown, Roast": "Rasa sangrai umum, hangat dan sedikit pahit.",
  "Smoky": "Aroma asap dari proses sangrai yang lebih gelap.",
  "Ashy": "Rasa abu kering, tanda sangrai sudah cukup gelap.",
  "Acrid": "Pahit tajam dan menyengat, tanda sangrai berlebihan.",
  "Pipe Tobacco": "Earthy dan sedikit manis seperti tembakau pipa kering.",
  "Sour Aromatics": "Kesan asam yang tercium di aroma sebelum diminum.",
  "Acetic Acid": "Asam tajam seperti cuka, biasanya dari fermentasi.",
  "Butyric Acid": "Asam dengan sedikit bau mentega tengik.",
  "Citric Acid": "Asam cerah dan segar seperti jeruk.",
  "Malic Acid": "Asam segar dan renyah seperti apel hijau.",
  "Winey": "Karakter fermentasi kompleks seperti anggur merah.",
  "Whiskey": "Hangat dan sedikit smoky seperti whiskey.",
  "Fermented": "Asam tajam dan funky, tanda fermentasi kuat.",
  "Overripe": "Manis berlebih dan sedikit busuk, tanda buah kelewat matang.",
  "Under-ripe": "Rasa hijau tajam, tanda biji dipanen sebelum matang.",
  "Peapod": "Segar dan hijau seperti kulit kacang polong.",
  "Fresh": "Kesan segar dan hijau ringan, belum matang penuh.",
  "Dark Green": "Hijau pekat dan earthy seperti daun gelap.",
  "Vegetative": "Rasa sayur mentah secara umum.",
  "Hay-like": "Kering dan earthy seperti rumput kering atau jerami.",
  "Herb-like": "Aromatik hijau seperti daun herba segar.",
  "Beany": "Rasa mentah seperti biji kopi hijau yang belum disangrai.",
  "Olive Oil": "Berminyak dan earthy seperti minyak zaitun.",
  "Raw": "Rasa mentah dan belum matang secara umum.",
  "Stale": "Hambar dan datar, tanda kopi sudah lama teroksidasi.",
  "Cardboard": "Rasa kertas kering, tanda kopi kehilangan kesegaran.",
  "Papery": "Kering dan hambar seperti kertas.",
  "Musty/Dusty": "Apek dan berdebu, biasanya dari penyimpanan kurang baik.",
  "Musty/Earthy": "Lembap dan earthy seperti tanah basah.",
  "Moldy/Damp": "Bau lembap menyerupai jamur, tanda proses atau simpan kurang bersih.",
  "Woody": "Kering dan earthy seperti kayu.",
  "Rubber": "Bau karet, biasanya tanda cacat pada biji robusta kering.",
  "Skunky": "Bau tajam menyengat seperti sigung, tanda cacat kuat.",
  "Petroleum": "Bau kimiawi seperti minyak bumi, tanda cacat serius.",
  "Medicinal": "Bau seperti obat-obatan, biasanya off-note yang tidak diinginkan.",
};

export const beanSpecies = [
  {
    key: "arabika",
    name: "Arabika",
    portion: "~60-70% produksi dunia",
    altitude: "600-2.000+ mdpl",
    caffeine: "±1,2-1,5%",
    shape: "Biji lonjong dengan garis tengah (center cut) berbentuk S melengkung.",
    profile: "Lebih kompleks, asam cerah, aroma bervariasi (buah, bunga, manis).",
    note: "Lebih rentan hama dan butuh dataran tinggi/sejuk. Harga umumnya lebih mahal.",
  },
  {
    key: "robusta",
    name: "Robusta",
    portion: "~30-40% produksi dunia",
    altitude: "0-800 mdpl",
    caffeine: "±2,2-2,7%",
    shape: "Biji lebih bulat dan kecil dengan garis tengah lurus.",
    profile: "Body tebal, pahit, earthy/kacang, asam rendah.",
    note: "Tahan hama dan penyakit. Sering jadi basis espresso blend dan kopi instan.",
  },
  {
    key: "liberika",
    name: "Liberika",
    portion: "<2% produksi dunia",
    altitude: "0-500 mdpl",
    caffeine: "Sedang, lebih rendah dari robusta",
    shape: "Biji besar dan bentuknya tidak beraturan, salah satu yang terbesar di antara jenis kopi.",
    profile: "Aroma khas kayu/asap dan sedikit fruity.",
    note: "Ditanam terbatas di Malaysia, Filipina, dan sebagian Indonesia (mis. Jambi).",
  },
  {
    key: "excelsa",
    name: "Excelsa",
    portion: "Sangat kecil, niche",
    altitude: "Rendah-menengah",
    caffeine: "Sedang",
    shape: "Biji memanjang menyerupai arabika, namun sedikit lebih ramping dan tidak simetris.",
    profile: "Asam tajam, sedikit fruity-tart, kadang dipakai untuk menambah kompleksitas blend.",
    note: "Secara taksonomi kini sering digolongkan sebagai varian dari Liberika.",
  },
];

export const processingMethods = [
  {
    key: "washed",
    name: "Washed / Full Wash",
    desc: "Kulit dan daging buah dikupas sebelum fermentasi, lendir dicuci bersih sebelum dijemur.",
    flavor: "Bersih, karakter asal biji lebih terasa, asam cerah.",
  },
  {
    key: "natural",
    name: "Natural / Dry Process",
    desc: "Buah utuh dijemur dengan kulit dan daging buahnya masih menempel.",
    flavor: "Manis tebal, body berat, sering muncul rasa buah/fermentasi kuat.",
  },
  {
    key: "honey",
    name: "Honey Process",
    desc: "Kulit dikupas tapi sebagian/semua lendir (mucilage) dibiarkan menempel saat dijemur. Ada varian yellow/red/black honey tergantung berapa banyak lendir tersisa dan lama penjemuran.",
    flavor: "Di antara washed dan natural: manis, body medium, asam lembut.",
  },
  {
    key: "gilingbasah",
    name: "Giling Basah (Wet-Hulled)",
    desc: "Khas Indonesia (Sumatra, dll). Kulit tanduk dikupas saat biji masih agak basah, lalu dikeringkan.",
    flavor: "Body tebal, earthy, rempah, asam rendah. Ciri khas kopi Sumatra.",
  },
  {
    key: "anaerobic",
    name: "Anaerobic / Eksperimental",
    desc: "Fermentasi dalam wadah tertutup minim oksigen, kadang ditambah ragi/kultur tertentu.",
    flavor: "Sangat intens, bisa sangat fruity, winey, atau funky tergantung teknik.",
  },
];

export const roastLevels = [
  { key: "light", name: "Light Roast", color: "#C9A56B", desc: "Asam cerah, karakter asal biji paling terasa, body ringan.", example: "City / Half City roast" },
  { key: "medium", name: "Medium Roast", color: "#9C6B3E", desc: "Seimbang antara asam dan manis, mulai muncul rasa karamel/kacang.", example: "City+ / Full City roast" },
  { key: "mediumdark", name: "Medium-Dark Roast", color: "#6B4526", desc: "Body lebih tebal, manis karamel kuat, asam mulai berkurang.", example: "Full City+ / Vienna roast" },
  { key: "dark", name: "Dark Roast", color: "#2E1B10", desc: "Pahit dan smoky dominan, rasa asal biji hampir hilang tertutup rasa sangrai.", example: "French / Italian roast" },
];

export const grindGuide = [
  { key: "extrafine", label: "Sangat halus", grain: 1, use: "Turkish coffee / ibrik" },
  { key: "fine", label: "Halus", grain: 3, use: "Espresso, Moka Pot" },
  { key: "mediumfine", label: "Sedang-halus", grain: 5, use: "Pour-over (V60, Kalita Wave), AeroPress" },
  { key: "medium", label: "Sedang", grain: 6, use: "Drip machine, siphon" },
  { key: "mediumcoarse", label: "Sedang-kasar", grain: 8, use: "Chemex, Clever Dripper" },
  { key: "coarse", label: "Kasar", grain: 9, use: "French Press, percolator" },
  { key: "extracoarse", label: "Sangat kasar", grain: 10, use: "Cold Brew, cupping" },
];
