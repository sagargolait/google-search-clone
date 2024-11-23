import { GoogleLogo } from "@/components/google-logo";
import { TopNav } from "@/components/top-nav";
import { Footer } from "@/components/footer";
import GoogleSearch from "@/components/search/google-search";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <TopNav />

      <div className="flex-grow flex flex-col items-center justify-center px-6 -mt-20">
        <GoogleLogo className="mb-8" />
        <GoogleSearch />

        <div className="mt-8 space-x-4">
          <button className="px-4 py-2 text-sm text-[#e8eaed] bg-[#303134] border hover:border-[#5f6368] rounded hover:shadow-[0_1px_3px_rgba(23,23,23,0.24)]">
            Google Search
          </button>
          <button className="px-4 py-2 text-sm text-[#e8eaed] bg-[#303134] border hover:border-[#5f6368] rounded hover:shadow-[0_1px_3px_rgba(23,23,23,0.24)]">
            I&apos;m Feeling Lucky
          </button>
        </div>

        <div className="mt-6 text-sm">
          <span className="text-primary">Google offered in: </span>
          <a href="#" className="text-blue-600 hover:underline ml-1">
            हिन्दी
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
