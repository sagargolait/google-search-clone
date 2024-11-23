export function Footer() {
  return (
    <footer className="bg-background mt-auto">
      <div className="px-6 py-3 border-b border-[#313335]">
        <span className="text-[e8e8e8] text-sm">India</span>
      </div>

      <div className="px-6 py-3 flex flex-col justify-evenly sm:flex-row lg:justify-between ">
        <div className="flex flex-wrap justify-evenly px-5 gap-x-6 gap-y-2">
          <a href="#" className="text-[e8e8e8] text-sm hover:underline">
            About
          </a>
          <a href="#" className="text-[e8e8e8] text-sm hover:underline">
            Advertising
          </a>
          <a href="#" className="text-[e8e8e8] text-sm hover:underline">
            Business
          </a>
          <a href="#" className="text-[e8e8e8] text-sm hover:underline">
            How Search works
          </a>
        </div>

        <div className="flex flex-wrap justify-evenly gap-x-6 gap-y-2 mt-3 sm:mt-0">
          <a href="#" className="text-[e8e8e8] text-sm hover:underline">
            Privacy
          </a>
          <a href="#" className="text-[e8e8e8] text-sm hover:underline">
            Terms
          </a>
          <a href="#" className="text-[e8e8e8] text-sm hover:underline">
            Settings
          </a>
        </div>
      </div>
    </footer>
  );
}
