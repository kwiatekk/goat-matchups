import * as React from 'react';
import { Button } from './button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FocusTrap } from '@headlessui/react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  showCloseButton?: boolean;
}

const dialogVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-4 flex justify-between items-center">{children}</div> 
);

export const DialogTitle: React.FC<{ children: React.ReactNode; id?: string }> = ({ children, id }) => (
  <h2 id={id} className="text-xl font-bold">{children}</h2>
);

export const DialogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-6">{children}</div>
);

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  size = 'medium',
  showCloseButton = true
}) => {
  if (!isOpen) return null;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const initialFocusRef = React.useRef<HTMLButtonElement>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={dialogVariants}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          role="dialog"
          aria-labelledby="dialog-title"
          aria-modal="true" 
        >
          <FocusTrap>
            <motion.div 
              className={`bg-white p-6 rounded-lg shadow-xl ${getSizeClass(size)}`}
              onKeyDown={handleKeyDown}
            >
              <DialogHeader>
                <DialogTitle id="dialog-title">
                  {title}
                </DialogTitle>
                {showCloseButton && (
                  <button 
                    onClick={onClose} 
                    aria-label="Close" 
                    className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <X size={16} />
                  </button>
                )}
              </DialogHeader>
              <DialogContent>{children}</DialogContent>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={onClose} ref={initialFocusRef}>Cancel</Button>
                <Button variant="destructive" onClick={onConfirm}>Confirm</Button>
              </div>
            </motion.div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getSizeClass(size: 'small' | 'medium' | 'large') {
  switch (size) {
    case 'small':
      return 'max-w-sm';
    case 'large':
      return 'max-w-3xl';
    default: 
      return 'max-w-md';
  }
}