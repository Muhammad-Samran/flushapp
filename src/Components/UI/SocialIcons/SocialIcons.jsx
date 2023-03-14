import React from "react";
import styled from "styled-components";

import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function SocialIcons({ links }) {
  return (
    <div>
      <Span>
        <Link href={links?.facebook} target="_blank">
          <FontAwesomeIcon icon={faFacebook} />
        </Link>
      </Span>
      <Span>
        <Link href={links?.twitter}>
          <FontAwesomeIcon icon={faTwitter} />
        </Link>
      </Span>
      <Span>
        <Link href={links?.instagram}>
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
      </Span>
      <Span>
        <Link href={links?.linkedin}>
          <FontAwesomeIcon icon={faLinkedin} />
        </Link>
      </Span>
      <Span>
        <Link href={links?.youtube}>
          <FontAwesomeIcon icon={faYoutube} />
        </Link>
      </Span>
    </div>
  );
}
const Link = styled.a`
  cursor: pointer;
`;
const Span = styled.span`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;

  margin-right: 0.5rem;
  a {
    color: #3f464e !important;
  }
`;
export default SocialIcons;
