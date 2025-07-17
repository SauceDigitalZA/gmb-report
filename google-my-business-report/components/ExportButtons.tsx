import React from 'react';
import { ICONS } from '../constants';

interface ExportButtonsProps {
  onExportPDF: () => void;
  onExportExcel: () => void;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ onExportPDF, onExportExcel }) => {
  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={onExportExcel}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-on-muted bg-surface border border-muted rounded-md hover:bg-muted hover:text-on-surface transition-colors duration-200"
      >
        {ICONS.excel}
        <span>Excel</span>
      </button>
      <button 
        onClick={onExportPDF}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-on-muted bg-surface border border-muted rounded-md hover:bg-muted hover:text-on-surface transition-colors duration-200"
      >
        {ICONS.pdf}
        <span>PDF</span>
      </button>
    </div>
  );
};

export default ExportButtons;
