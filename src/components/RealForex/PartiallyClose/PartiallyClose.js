import React from "react";
import {useTranslation} from "react-i18next";
import Spinner from "../../Spinner/Spinner";

const PartiallyClose = ({spinnerValue, onSpinnerChange}) => {
    const {t} = useTranslation();

    return (
        <Spinner
            spinnerValue={spinnerValue}
            onSpinnerChange={(orderType) => onSpinnerChange(orderType)}
            placeholder={t("common-labels.amount")}
        />
    );
};

export default PartiallyClose;
