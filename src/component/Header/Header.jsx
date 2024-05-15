import { MdMyLocation } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useState } from "react";

function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
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
        <div className="dateDropDown">2024/06/06</div>
        <span className="seperator"></span>
      </div>
      <div className="headerSearchItem">
        <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
          {options.adult} adult &bull; {options.children} children &bull;{" "}
          {options.room} &bull;
        </div>
        {openOptions && (
          <GuestOptionList handleOptions={handleOptions} options={options} />
        )}
        <span className="seperator"></span>
      </div>
      <div className="headerSearchItem">
        <button className="headerSearchBtn">
          <HiSearch className="headerIcon" />
        </button>
      </div>
    </div>
  );
}
export default Header;

function GuestOptionList({ options, handleOptions }) {
  return (
    <div className="guestOptions">
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
