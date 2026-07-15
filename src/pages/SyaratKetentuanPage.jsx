import PageHeader from "../components/PageHeader";

function Section({ title, children }) {
  return (
    <section className="py-8 border-b border-garis last:border-b-0">
      <h2 className="font-display font-bold text-lg mb-3">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-tintasoft max-w-[70ch]">{children}</div>
    </section>
  );
}

export default function SyaratKetentuanPage() {
  return (
    <div className="max-w-[1180px] mx-auto px-7">
      <PageHeader
        eyebrow="Legal"
        title="Syarat dan Ketentuan"
        lede="Terakhir diperbarui 15 Juli 2026. Dengan mengakses dan memakai Brownpage, kamu dianggap telah membaca dan menyetujui syarat dan ketentuan berikut."
      />

      <Section title="Tentang Brownpage">
        <p>
          Brownpage adalah alat bantu gratis berbasis web untuk barista dan penikmat kopi rumahan,
          berisi referensi seduh manual, kalkulator rasio, jadwal tuang, dan rekomendasi tools. Brownpage
          bukan toko fisik, bukan platform e-commerce, dan tidak memproses transaksi jual beli apa pun
          secara langsung di dalam website ini.
        </p>
      </Section>

      <Section title="Penggunaan cookie">
        <p>
          Website ini dapat memakai cookie untuk keperluan teknis dasar dan statistik penggunaan, misalnya
          mengingat preferensi tampilan atau menganalisis halaman mana yang paling sering diakses. Dengan
          terus memakai Brownpage, kamu menyetujui penggunaan cookie yang diperlukan untuk operasional
          website.
        </p>
      </Section>

      <Section title="Hak kekayaan intelektual">
        <p>
          Kecuali dinyatakan lain, seluruh konten di Brownpage (tulisan, diagram, ilustrasi, tata letak,
          dan kode) adalah milik Brownpage dan dilindungi hak cipta. Kamu boleh mengakses dan memakainya
          untuk kebutuhan pribadi, dengan batasan sebagai berikut. Kamu dilarang:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Menyalin atau menerbitkan ulang materi dari Brownpage secara komersial</li>
          <li>Menjual, menyewakan, atau mensublisensikan materi dari Brownpage</li>
          <li>Mendistribusikan ulang konten Brownpage seolah milik pihak lain</li>
        </ul>
      </Section>

      <Section title="Tautan afiliasi">
        <p>
          Beberapa halaman, terutama halaman Tools, berisi tautan afiliasi menuju toko atau marketplace
          pihak ketiga. Brownpage bisa mendapat komisi kecil dari pembelian lewat tautan tersebut, tanpa
          menambah biaya apa pun untukmu. Brownpage tidak mengelola, tidak menjual, dan tidak bertanggung
          jawab atas transaksi, pengiriman, atau kebijakan toko pihak ketiga tersebut.
        </p>
      </Section>

      <Section title="Batasan tanggung jawab">
        <p>
          Rasio, jadwal tuang, dan estimasi kekuatan seduh di Brownpage bersifat panduan umum yang
          diadaptasi dari teknik yang telah dipublikasikan secara luas oleh komunitas kopi, bukan
          pengukuran presisi seperti TDS atau EY. Brownpage tidak menjamin hasil seduh tertentu dan
          menyarankan kamu selalu menyesuaikan dengan biji kopi, alat, dan selera masing-masing.
        </p>
        <p>
          Brownpage berupaya menjaga informasi tetap akurat dan terkini, tetapi tidak menjamin
          kelengkapan atau ketersediaan website secara terus-menerus.
        </p>
      </Section>

      <Section title="Perubahan syarat dan ketentuan">
        <p>
          Brownpage berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya.
          Versi terbaru akan selalu tersedia di halaman ini.
        </p>
      </Section>

      <Section title="Kontak">
        <p>
          Ada pertanyaan, masukan, atau laporan terkait syarat dan ketentuan ini? Hubungi Brownpage lewat{" "}
          <span className="text-tinta font-bold">+62 823 2380 9948</span>.
        </p>
      </Section>
    </div>
  );
}
