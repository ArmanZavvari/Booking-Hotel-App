import { MdMyLocation } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useState, useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { createSearchParams, useNavigate } from "react-router-dom";

function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const navigate = useNavigate();

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <div className="header ">
      <div className="headerSearchItem">
        <MdMyLocation className="headerIcon locationIcon" />
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          type="text"
          placeholder="where to go"
          className="headerSearchInput"
          name="destination"
          id="destination"
        />
        <span className="seperator"></span>
      </div>
      <div className="headerSearchItem">
        <HiCalendar className="headerIcon dataIcon" />
        <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
          {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
            date[0].endDate,
            "MM/dd/yyyy"
          )} `}
        </div>
        {openDate && (
          <DateRange
            ranges={date}
            onChange={(item) => setDate([item.selection])}
            className="date"
            minDate={new Date()}
            moveRangeOnFirstSelection={true}
          />
        )}
        <span className="seperator"></span>
      </div>
      <div className="headerSearchItem">
        <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
          {options.adult} adult &bull; {options.children} children &bull;{" "}
          {options.room} &bull;
        </div>
        {openOptions && (
          <GuestOptionList
            setOpenOptions={setOpenOptions}
            handleOptions={handleOptions}
            options={options}
          />
        )}
        <span className="seperator"></span>
      </div>
      <div className="headerSearchItem">
        <button className="headerSearchBtn" onClick={handleSearch}>
          <HiSearch className="headerIcon" />
        </button>
      </div>
    </div>
  );
}
export default Header;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionRef = useRef();
  useOutsideClick(optionRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div className="guestOptions" ref={optionRef}>
      <OptionItem
        handleOptions={handleOptions}
        type="adult"
        options={options}
        minLimit={1}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="children"
        options={options}
        minLimit={0}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="room"
        options={options}
        minLimit={1}
      />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handleOptions(type, "dec")}
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          onClick={() => handleOptions(type, "inc")}
          className="optionCounterBtn"
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
