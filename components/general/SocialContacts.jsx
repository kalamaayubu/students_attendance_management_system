import {
  FaWhatsapp,
  FaTelegram,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa"; // Import the needed icons from react-icons

const SocialLinks = () => (
  <div className="flex gap-4 max-w-[350px] dark:text-white p-3">
    {/* WhatsApp Link */}
    <a
      href="https://wa.me/+254795753289"
      target="_blank"
      rel="noopener noreferrer"
      title="WhatsApp"
      aria-label="WhatsApp"
    >
      <FaWhatsapp className="cursor-pointer hover:text-green-600" />
    </a>

    {/* Telegram Link */}
    <a
      href="https://t.me/kalamaayubu"
      target="_blank"
      rel="noopener noreferrer"
      title="Telegram"
      aria-label="Telegram"
    >
      <FaTelegram className="cursor-pointer hover:text-blue-500" />
    </a>

    {/* Twitter Link */}
    <a
      href="https://x.com/KalamaAyubu"
      target="_blank"
      rel="noopener noreferrer"
      title="On X (twitter)"
      aria-label="On X (twitter)"
    >
      <FaTwitter className="cursor-pointer hover:text-black" />
    </a>

    {/* Email Icon */}
    <a
      href="mailto:kalamaayubu913@gmail.com"
      target="_blank"
      rel="noopener noreferrer"
      title="Drop an email"
      aria-label="Drop an email"
    >
      <FaEnvelope className="cursor-pointer hover:text-blue-950" />
    </a>

    {/* LinkedIn Icon */}
    <a
      href="https://www.linkedin.com/in/johana-kalama-8083ba2b5"
      target="_blank"
      rel="noopener noreferrer"
      title="On linkedin"
      aria-label="On linkedin"
    >
      <FaLinkedin className="cursor-pointer hover:text-blue-600" />
    </a>
  </div>
);

export default SocialLinks;
