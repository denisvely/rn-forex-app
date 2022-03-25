import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Typography from "../Typography/Typography";
import { getCurrencySymbol, formatCurrency } from "./helpers";
import { getUser, getSettings } from "../../store/app";

const FormattedTypographyWithCurrency = ({
  text,
  numberwithcommas,
  name,
  style,
}) => {
  if (!text || text === "-") {
    return <Typography text={text} name={name} style={{ ...style }} />;
  }
  const user = useSelector((state) => getUser(state));
  const settings = useSelector((state) => getSettings(state));

  const currency = getCurrencySymbol(user);

  const formattedValue = formatCurrency(
    currency,
    text,
    numberwithcommas,
    settings
  );

  return <Typography text={formattedValue} name={name} style={{ ...style }} />;
};

FormattedTypographyWithCurrency.propTypes = {
  text: PropTypes.any,
  numberwithcommas: PropTypes.bool,
  name: PropTypes.string,
  style: PropTypes.object,
};

export default FormattedTypographyWithCurrency;
