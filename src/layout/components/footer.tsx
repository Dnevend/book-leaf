import { Logo } from "@/components/global";

const Footer = () => {
  return (
    <footer className="text-gray-500 bg-white px-4 py-5 max-w-screen-xl w-full mx-auto md:px-8">
      <div className="items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0">
          &copy; 2024 BookLeaf All rights reserved.
        </div>

        <Logo size="sm" />
      </div>
    </footer>
  );
};

export default Footer;
