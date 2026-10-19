import { createContext, useCallback, useContext, useState } from "react";
import { BookingDialog } from "@/components/site/BookingDialog";

export type BookingOptions = {
  service?: string;
  doctor?: string;
  formType?: "appointment" | "callback";
};

type Ctx = {
  open: (opts?: BookingOptions | string) => void;
};

const BookingCtx = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [options, setOptions] = useState<BookingOptions>({});

  const open = useCallback((opts?: BookingOptions | string) => {
    if (typeof opts === "string") {
      setOptions({ service: opts, formType: "appointment" });
    } else if (opts) {
      setOptions(opts);
    } else {
      setOptions({ formType: "appointment" });
    }
    setOpen(true);
  }, []);

  return (
    <BookingCtx.Provider value={{ open }}>
      {children}
      <BookingDialog
        open={isOpen}
        onOpenChange={setOpen}
        initialService={options.service}
        initialDoctor={options.doctor}
        initialType={options.formType}
      />
    </BookingCtx.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingCtx);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}
