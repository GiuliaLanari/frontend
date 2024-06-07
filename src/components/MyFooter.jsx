import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaEnvelopeSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyFooter = () => {
  return (
    <footer className="mt-5">
      <div className="d-flex footer ">
        <div className="font">
          <Link to="https://www.instagram.com/mett_and_giu_market/" target="_blank" rel="noopener noreferrer">
            <FaInstagramSquare className="text-white" />
          </Link>
        </div>
        <div className="font">
          <FaWhatsappSquare className="text-white" />
        </div>
        <div className="font">
          <FaEnvelopeSquare className="text-white" />
        </div>
      </div>
      <div className="copy-right">&copy;2024 Lanari Giulia</div>
    </footer>
  );
};

export default MyFooter;
