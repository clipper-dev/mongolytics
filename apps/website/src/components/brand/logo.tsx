/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1">
      <img src="/mongolytics_icon.png" alt="Mongolytics Logo" className="h-8" />
      <h2 className="text-xl font-bold"><span className="text-emerald-400">Mongo</span>lytics</h2>
    </Link>
  );
}
 