export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r  bg-[#0a0a0a]   text-gray-400 py-6 text-center shadow-inner border-t border-slate-700 ">
      <p className="text-sm md:text-base">
        © {new Date().getFullYear()}{" "}
        <span className="text-blue-400 font-semibold">Shahzaib Lodhi</span>.  
        All rights reserved.
      </p>
    </footer>
  );
}

