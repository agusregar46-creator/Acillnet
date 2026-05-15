type Props = {
  open: boolean;
  onClose: () => void;
};

export function ManualPayment({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0f172a] p-6">
        <h2 className="text-2xl font-bold">
          Pembayaran Manual
        </h2>

        <p className="mt-3 text-sm text-muted-foreground">
          Silakan transfer menggunakan salah satu metode berikut.
        </p>

        <div className="mt-6 space-y-4">
          {/* QRIS */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold">
              QRIS
            </h3>

            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ACILLNET"
              alt="QRIS"
              className="mt-4 rounded-xl"
            />
          </div>

          {/* DANA */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold">
              DANA
            </h3>

            <p className="mt-2 text-muted-foreground">
              082324063763
            </p>
          </div>

          {/* BANK */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold">
              Bank BCA
            </h3>

            <p className="mt-2 text-muted-foreground">
              1234567890
            </p>

            <p className="text-sm text-muted-foreground">
              a/n Agus Regar Saputra
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-white px-5 py-3 font-semibold text-black"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}