import styled from "styled-components";
import ProjectList from "../../BusinessProfile/ProjectList/ProjectsList";

export default function OnbaordingDetailsStep2({ handleSignUpSubmit }) {
  return (
    <div>
      <h1 className="title-head primary-font primary-color mt-3 mt-xl-0">
        Add Projects
      </h1>
      <SectionContainer>
        <ProjectList details={false} edit={true} />
      </SectionContainer>
    </div>
  );
}

const SectionContainer = styled.div`
  border: 2px solid #cccccc;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: white;
  margin-bottom: 30px;
  label {
    font-size: clamp(12px, 1.2vw, 14px);
    margin-bottom: 0.3rem;
  }
  .inputField {
    background: #ffffff;
    border: 2px solid #cccccc;
    box-sizing: border-box;
    border-radius: 6px;
    overflow: hidden;
    width: 100%;
    padding: 0.5rem;
    &:focus {
      outline: none;
      border: 2px solid var(--primary-color);
    }
  }
`;
