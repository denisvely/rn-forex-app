import React from "react";
import Typography from "../Typography/Typography";

import styles from "./errorStyles";

const Error = ({ text, name, bigPadding, style }) => {
  return (
    <Typography
      text={text}
      name={name}
      style={{ ...styles.error, paddingLeft: bigPadding ? 50 : 8, ...style }}
    />
  );
};

export default Error;
