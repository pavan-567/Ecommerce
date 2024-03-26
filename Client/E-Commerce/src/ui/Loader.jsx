import { useSelector } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: ${(props) => props.height && "100dvh"};
`;

function Loader({ height = "" }) {
  console.log(height);
  const mode = useSelector((store) => store.user.mode);
  return (
    <StyledDiv height={height}>
      <ScaleLoader
        color={mode === "dark" ? "#fbbf24" : "black"}
        height={100}
        width={10}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="clocker"
      />
    </StyledDiv>
  );
}

export default Loader;
