import React, { useMemo, useState, useEffect, useCallback } from "react";
import { IRemainingTimeCounterProps } from "./IRemainingTimeCounterProps";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";

const RemainingCounterProps: React.FC<IRemainingTimeCounterProps> = ({
  data,
}) => {
  const { t } = useTranslation();

  const remaining = useMemo(() => {
    if (data.timeStampEnd && data.timeStampStart) {
      return Math.abs(moment().unix() - data.timeStampEnd);
    }
    return Math.abs(moment(data.timeStampDuration).seconds() - 1);
  }, [data.timeStampDuration, data.timeStampEnd, data.timeStampStart]);

  const [remainingTime, setRemainingTime] = useState<number>(remaining);

  let index: NodeJS.Timeout | undefined;

  index = setInterval(() => {
    setRemainingTime((prev) => prev - 1);
  }, 1000);

  useEffect(() => {
    return () => clearInterval(index as NodeJS.Timeout);
  }, [index]);

  const getRemainingTime = useCallback(() => {
    const duration = moment.duration(remainingTime, "seconds");
    return `${("00" + duration.hours()).slice(-2)}:${(
      "00" + duration.minutes()
    ).slice(-2)}:${("00" + duration.seconds()).slice(-2)}`;
  }, [remainingTime]);
  return (
    <Typography variant="h5">
      {t("remainingTime")}: {getRemainingTime()}
    </Typography>
  );
};
export default RemainingCounterProps;
