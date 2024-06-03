import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaEnvelopeSquare } from "react-icons/fa";

const MyFooter = () => {
  return (
    <footer className="mt-5">
      <div className="d-flex footer ">
        <div className="font">
          <FaInstagramSquare className="text-white" />
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
