// import { FaInstagramSquare } from "react-icons/fa";
// import { FaWhatsappSquare } from "react-icons/fa";
// import { FaEnvelopeSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyFooter = () => {
  const email = "giulia.lanari96@gmail.com";
  const subject = "Contact us";

  const whatsappNumber = "3333335214";

  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  return (
    <footer className="mt-5">
      <div className="d-flex footer py-4">
        <div className="font">
          <Link to="https://www.instagram.com/mett_and_giu_market/" target="_blank" rel="noopener noreferrer">
            {/* <FaInstagramSquare className="text-white" /> */}
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new" />
          </Link>
        </div>
        <div className="font">
          <Link to={mailtoLink} target="_blank" rel="noopener noreferrer">
            {/* <FaEnvelopeSquare className="text-white" /> */}
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/gmail-new.png" alt="gmail-new" />
          </Link>
        </div>
        <div className="font">
          <Link to={whatsappLink} target="_blank" rel="noopener noreferrer">
            {/* <FaWhatsappSquare className="text-white" /> */}
            <img width="48" height="48" src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="whatsapp--v1" />
          </Link>
        </div>
      </div>
      <div className="copy-right py-4">&copy; 2024 Lanari Giulia </div>
    </footer>
  );
};

export default MyFooter;
