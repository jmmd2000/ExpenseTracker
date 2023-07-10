interface TableRowChipProps {
  label: string;
  color: string;
}

const TableRowChip: React.FC<TableRowChipProps> = ({ label, color }) => {
  return (
    <span
      className={`text-xs align-middle relative top-[-0.5em] mr-1 bg-${color}-300 text-${color}-800 rounded p-[2px]`}
    >
      {label}
    </span>
  );
};

export default TableRowChip;
