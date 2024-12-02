import Image from "next/image";

const NavBar = () => {
  return (
    <div className="w-full h-full px-2 py-10 flex flex-col justify-start items-start space-y-40 border-r border-[#cecece]">
      {/* Logo Section */}
      <div className="w-full h-fit flex flex-row justify-center items-start">
        <Image
          className="dark:invert"
          src="/logo.svg"
          alt="Logo"
          width={150}
          height={30}
          priority
        />
      </div>

      {/* Navigation Items */}
      <div className="w-full flex flex-col justify-center items-center space-y-5">
        {/* Search Bar */}
        <div className="w-full bg-[#F2F2F2] py-2 px-4 rounded-full flex flex-row justify-start space-x-3 transition-all duration-200 ease-[cubic-bezier(0.25, 1, 0.5, 1)] hover:bg-[#E6E6E6]">
          <Image
            className="dark:invert"
            src="/search.svg"
            alt="Search"
            width={24}
            height={24}
          />
          <p className="text-black/50 text-lg transition-colors duration-200 ease-[cubic-bezier(0.25, 1, 0.5, 1)] hover:text-black">
            Search
          </p>
        </div>

        {/* Home */}
        <div className="w-full py-2 px-4 rounded-full flex flex-row justify-start items-center space-x-3 transition-all duration-200 ease-[cubic-bezier(0.25, 1, 0.5, 1)] hover:bg-gray-200 hover:cursor-pointer group transition-all duration-300 ">
          <Image
            className="dark:invert group-hover:opacity-50"
            src="/home.svg"
            alt="Home"
            width={24}
            height={24}
          />
          <p className="text-lg group-hover:text-gray-600">Home</p>
        </div>

        {/* Smile */}
        <div className="w-full py-2 px-4 rounded-full flex flex-row justify-start items-center space-x-3 transition-all duration-200 ease-[cubic-bezier(0.25, 1, 0.5, 1)] hover:bg-gray-200 hover:cursor-pointer group transition-all duration-300 ">
          <Image
            className="dark:invert group-hover:opacity-50"
            src="/smile.svg"
            alt="Smile"
            width={24}
            height={24}
          />
          <p className="text-lg  group-hover:text-gray-600">Smile</p>
        </div>

        {/* Speaker */}
        <div className="w-full py-2 px-4 rounded-full flex flex-row justify-start items-center space-x-3 transition-all duration-200 ease-[cubic-bezier(0.25, 1, 0.5, 1)] hover:bg-gray-200 hover:cursor-pointer group transition-all duration-300 ">
          <Image
            className="dark:invert group-hover:opacity-50"
            src="/speaker.svg"
            alt="Speaker"
            width={24}
            height={24}
          />
          <p className="text-lg  group-hover:text-gray-600">Washing Machine</p>
        </div>

        {/* More */}
        <div className="w-full py-2 px-4 rounded-full flex flex-row justify-start items-center space-x-3 transition-all duration-200 ease-[cubic-bezier(0.25, 1, 0.5, 1)] hover:bg-gray-200 hover:cursor-pointer group transition-all duration-300 ">
          <Image
            className="dark:invert group-hover:opacity-50"
            src="/menu.svg"
            alt="Menu"
            width={24}
            height={24}
          />
          <p className="text-lg  group-hover:text-gray-600">More</p>
        </div>

        {/* Colorful Button */}
        <a
          className="w-full py-3 px-4 rounded-2xl flex flex-row justify-start items-center space-x-3 bg-purple-500 text-white transition-all duration-200 ease-[cubic-bezier(0.25, 1, 0.5, 1)] hover:bg-purple-700"
          href="https://portfolio-2024-2025-lake.vercel.app/"
          target="_blank"
        >
          <p className="text-lg">
            Project by <span className="underline">@adtimokhin</span>
          </p>
        </a>
      </div>
    </div>
  );
};

export default NavBar;
