import Link from "next/link";

type Props = {
  href: string;
  label: string;
};
export default function Button({ href, label }: Props) {
  return (
    <button className="w-full rounded-xl bg-white px-2 py-3 text-3xl font-bold text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
      <Link href={href}>
        <p>{label}</p>
      </Link>
    </button>
  );
}
