
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center" 
        onClick={onClose}
    >
      <div 
        className="bg-surface rounded-lg shadow-2xl w-full max-w-lg m-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-muted">
          <h3 className="text-xl font-bold text-on-surface">{title}</h3>
          <button onClick={onClose} className="text-on-muted hover:text-on-surface">&times;</button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
