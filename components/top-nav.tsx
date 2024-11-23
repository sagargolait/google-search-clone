import Link from "next/link";
import { Grip } from "lucide-react";

export function TopNav() {
  return (
    <nav className="flex justify-between items-center w-full p-4 space-x-4 z-10">
      <div className="flex gap-3 items-center">
        <Link
          className="text-sm text-white cursor-pointer hover:underline"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-sm text-white cursor-pointer hover:underline"
          href="#"
        >
          Store
        </Link>
      </div>
      <div className="flex gap-3  items-center">
        <Link href="#">
          <span className="text-sm text-white cursor-pointer hover:underline">
            Gmail
          </span>
        </Link>
        <Link href="#">
          <span className="text-sm text-white cursor-pointer hover:underline">
            Images
          </span>
        </Link>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Grip className="w-5 h-5 text-gray-600" />
        </button>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Sign in
        </button>
      </div>
    </nav>
  );
}
