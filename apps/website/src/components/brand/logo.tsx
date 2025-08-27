import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <h2 className="text-xl font-bold">Mongolytics</h2>
    </Link>
  );
}
