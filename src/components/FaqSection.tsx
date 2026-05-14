import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Apakah saya butuh wallet kripto untuk berlangganan?",
    a: "Ya, Anda butuh wallet Solana seperti Phantom. Tidak perlu kartu kredit atau rekening bank — cukup connect wallet dan bayar dengan SOL.",
  },
  {
    q: "Apakah pembayaran aman?",
    a: "Setiap transaksi tercatat di blockchain Solana dan dapat diverifikasi siapa saja melalui Solana Explorer. Tidak ada data sensitif yang kami simpan selain alamat wallet publik Anda.",
  },
  {
    q: "Berapa lama paket aktif setelah bayar?",
    a: "Begitu transaksi terkonfirmasi (rata-rata < 2 detik), invoice akan tersimpan dan tim kami otomatis mengaktifkan paket Anda dalam waktu 1×24 jam kerja.",
  },
  {
    q: "Bagaimana jika sinyal bermasalah?",
    a: "Hubungi admin via tombol WhatsApp di pojok kanan bawah. Tim teknis kami standby 24/7.",
  },
  {
    q: "Apakah ada biaya pemasangan?",
    a: "Untuk area cakupan utama, pemasangan GRATIS untuk pelanggan paket Pro Gamer dan Enterprise. Paket Starter dikenakan biaya instalasi sekali bayar.",
  },
  {
    q: "Bisakah saya upgrade paket?",
    a: "Bisa kapan saja. Cukup pilih paket baru dan lakukan pembayaran ulang — sisa kuota paket lama akan otomatis dihitung sebagai kredit.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Pertanyaan <span className="text-gradient">populer</span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          Belum ketemu jawabannya? Chat admin via WhatsApp.
        </p>
      </div>
      <Accordion type="single" collapsible className="mt-10 space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="glass rounded-xl border-0 px-5"
          >
            <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
