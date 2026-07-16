import PageHeader from "../components/PageHeader";
import usePageMeta from "../hooks/usePageMeta";

function Section({ title, children }) {
  return (
    <section className="py-8 border-b border-garis last:border-b-0">
      <h2 className="font-display font-bold text-lg mb-3">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-tintasoft max-w-[70ch]">{children}</div>
    </section>
  );
}

export default function KebijakanPrivasiPage() {
  usePageMeta({
    title: "Kebijakan Privasi",
    description: "Informasi apa saja yang Brownpage kumpulkan dan bagaimana informasi tersebut dipakai.",
    path: "/kebijakan-privasi",
  });
  return (
    <div className="max-w-[1180px] mx-auto px-7">
      <PageHeader
        eyebrow="Legal"
        title="Kebijakan Privasi"
        lede="Terakhir diperbarui 15 Juli 2026. Halaman ini menjelaskan informasi apa saja yang Brownpage kumpulkan dan bagaimana informasi tersebut dipakai."
      />

      <Section title="Informasi yang dikumpulkan">
        <p>
          Saat kamu mengunjungi Brownpage, sejumlah informasi teknis dasar bisa terkumpul secara otomatis,
          seperti jenis browser, alamat IP, zona waktu, dan halaman yang kamu buka. Informasi ini disebut
          Informasi Perangkat, dan dipakai murni untuk keperluan teknis serta statistik penggunaan.
        </p>
        <p>
          Brownpage tidak meminta pendaftaran akun, tidak menyimpan data pembayaran, dan tidak memproses
          transaksi apa pun langsung di website ini.
        </p>
      </Section>

      <Section title="Kenapa data ini diproses">
        <p>
          Data yang terkumpul dipakai untuk menjaga website tetap berjalan dengan baik, mengidentifikasi
          kemungkinan penyalahgunaan, dan menyusun statistik penggunaan secara umum. Informasi statistik
          ini tidak digabungkan dengan cara yang bisa mengidentifikasi kamu secara pribadi.
        </p>
      </Section>

      <Section title="Tautan ke website lain">
        <p>
          Beberapa halaman, terutama halaman Tools, berisi tautan afiliasi menuju toko pihak ketiga.
          Brownpage tidak bertanggung jawab atas praktik privasi website pihak ketiga tersebut. Sebaiknya
          kamu membaca kebijakan privasi masing-masing website sebelum memberikan data pribadi di sana.
        </p>
      </Section>

      <Section title="Keamanan informasi">
        <p>
          Brownpage menjaga langkah pengamanan teknis yang wajar untuk melindungi informasi dari akses,
          penggunaan, atau pengungkapan yang tidak sah. Meski begitu, tidak ada transmisi data lewat
          internet yang bisa dijamin sepenuhnya aman.
        </p>
      </Section>

      <Section title="Pengungkapan hukum">
        <p>
          Brownpage dapat mengungkapkan informasi yang dikumpulkan jika diwajibkan oleh hukum, misalnya
          untuk memenuhi proses hukum, melindungi hak Brownpage, atau menanggapi permintaan resmi dari
          pemerintah.
        </p>
      </Section>

      <Section title="Hak kamu atas data pribadi">
        <p>
          Kalau kamu punya pertanyaan tentang data pribadi yang mungkin terkumpul, atau ingin meminta
          penjelasan lebih lanjut soal kebijakan ini, kamu bisa menghubungi Brownpage kapan saja.
        </p>
      </Section>

      <Section title="Kontak">
        <p>
          Ada pertanyaan seputar kebijakan privasi ini? Hubungi Brownpage lewat{" "}
          <span className="text-tinta font-bold">+62 823 2380 9948</span>.
        </p>
      </Section>
    </div>
  );
}
