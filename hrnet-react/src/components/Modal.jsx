
import ReactDOM from "react-dom";
import PropTypes from "prop-types"; // Ajout pour la validation des props
import "./Modal.css"; // Assure-toi d'avoir un fichier CSS pour le style

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>×</button>
                {children}
            </div>
        </div>,
        document.body
    );
};

// ✅ Validation des props
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,  // isOpen doit être un booléen obligatoire
    onClose: PropTypes.func.isRequired, // onClose doit être une fonction obligatoire
    children: PropTypes.node.isRequired // children doit être un élément React obligatoire
};

export default Modal;
