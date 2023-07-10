import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

interface DateRangePickerProps {
  rangeCallback: React.Dispatch<React.SetStateAction<number>>;
  startDateCallback: React.Dispatch<React.SetStateAction<Date | undefined>>;
  endDateCallback: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  rangeCallback,
  startDateCallback,
  endDateCallback,
}) => {
  const [clicked, setClicked] = useState(true);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleDropdown = (value: string) => {
    // Range dropdown takes precedence over date picker
    rangeCallback(parseInt(value));
    startDateCallback(undefined);
    endDateCallback(undefined);
  };

  return (
    <div
      className={`absolute -top-5 -right-5 bg-slate-800 p-3 rounded-lg drop-shadow-md cursor-pointer hover:drop-shadow-2xl text-white flex flex-col justify-center items-center transition-all duration-200 z-30 `}
    >
      <select
        name="date-range"
        id="date-range"
        className="bg-slate-700 text-white p-[2px] rounded-lg"
        defaultValue={"30"}
        onChange={(e) => handleDropdown(e.target.value)}
      >
        <option value="7">Last 7 days</option>
        <option value="30">Last 30 days</option>
        <option value="90">Last 90 days</option>
        <option value="365">Last 365 days</option>
        <option value="999999">All time</option>
      </select>
      <hr className="mt-1 mb-1" />
      {clicked ? (
        <ExpandMoreIcon
          className="w-full bg-slate-600 rounded-lg"
          onClick={handleClick}
        />
      ) : (
        <>
          <ExpandLessIcon
            className="w-full bg-slate-600 rounded-lg"
            onClick={handleClick}
          />
          <label htmlFor="start">Start date</label>
          <input
            type="date"
            name="start"
            id="start"
            className="bg-slate-700 text-white p-[2px] rounded-lg"
            onChange={(e) => {
              startDateCallback(new Date(e.target.value));
            }}
          />
          <label htmlFor="end">End date</label>
          <input
            type="date"
            name="end"
            id="end"
            className="bg-slate-700 text-white p-[2px] rounded-lg"
            onChange={(e) => {
              endDateCallback(new Date(e.target.value));
            }}
          />
        </>
      )}
    </div>
  );
};

export default DateRangePicker;
