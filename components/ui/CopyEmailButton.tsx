"use client";

import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { copyText } from "@/lib/clipboard";

export function CopyEmailButton({ email }: { email: string }) {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <Button
      onClick={async () => setCopied(await copyText(email))}
      aria-label={`${t("copyEmail")}: ${email}`}
    >
      {copied ? <Check /> : <Copy />}
      <span className="font-mono">{email}</span>
      <span aria-live="polite" className="sr-only">
        {copied ? t("copied") : ""}
      </span>
    </Button>
  );
}
