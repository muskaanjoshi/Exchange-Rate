import React from "react";

const Footer = props => {
  return (
    <div>
      <p>
         {props.footerText} 
      </p>
    </div>
  );
};

Footer.defaultProps = {
  footerText: " “ Expect the best. Prepare for the worst. Capitalize on what comes. ” "
};

export default Footer;
