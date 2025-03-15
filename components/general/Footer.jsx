import SocialLinks from "./SocialContacts";

const Footer = () => {
  return (
    <footer className="w-full mt-20">
      <div></div>
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 to-pink-500" />
      <div className="mt-1 flex justify-between items-center px-4">
        <p>
          &copy; {new Date().getFullYear()} jsDreamers. All rights reserved.
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;
