import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const Star = ({ stars, place, displayNum = true }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar
            className="icon"
            style={{ color: "orange", fontSize: "1rem" }}
          />
        ) : stars >= number ? (
          <FaStarHalfAlt
            className="icon"
            style={{ color: "orange", fontSize: "1rem" }}
          />
        ) : (
          <AiOutlineStar
            className="icon"
            style={{ color: "orange", fontSize: "1.2rem" }}
          />
        )}
      </span>
    );
  });

  return (
    <section
      className={`d-flex align-items-center ${
        place === "center" ? "justify-content-center" : ""
      } `}
    >
      <div
        className={`d-flex gap-2 align-items-center justify-content-center flex-start`}
      >
        {displayNum && <span className="mx-1 mt-1">{stars}</span>}
        <span>{ratingStar}</span>
      </div>
    </section>
  );
};

export default Star;
