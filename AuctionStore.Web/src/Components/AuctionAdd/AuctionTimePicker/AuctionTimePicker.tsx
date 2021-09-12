import React, { useState } from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IAuctionTimePickerProps } from "./IAuctionTimePickerProps";
import  moment from "moment";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import MomentUtils from "@date-io/moment";
import "moment/locale/pl"

const AuctionTimePicker: React.FC<IAuctionTimePickerProps> = ({
  auction,
  setAuction,
  margin,
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { setValue } = useFormContext();
  const { t } = useTranslation();
  const [startTime, setStartTime] = useState<Date | undefined>(new Date());

  const handleChangeAuctionType = (
    _e: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setSelectedTab(newValue);
    setValue("isTimeAuction", newValue === 0);
    setAuction((prev) => {
      return {
        ...prev,
        isTimeAuction: newValue === 0,
      };
    });
  };

  const handleStartDateChange = (date : MaterialUiPickersDate) => {
    debugger;
    setStartTime(date?.toDate());
  }

  return (
    <>
      <Paper square>
        <Tabs
          value={selectedTab}
          onChange={handleChangeAuctionType}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab
            label={t("auction_time")}
            id={`nav-tab-${0}`}
            aria-controls={`nav-tabpanel-${0}`}
          />
          <Tab
            label={t("auction_quick")}
            id={`nav-tab-${1}`}
            aria-controls={`nav-tabpanel-${1}`}
          />
        </Tabs>

        <div>
          <MuiPickersUtilsProvider
            libInstance={moment}
            utils={MomentUtils}
            // locale={"pl"}
          >
            <DateTimePicker 
              // autoOk
              // showTodayButton
              // disablePast
              value={startTime}
              format="dd/MM/yyyy"
              onChange={handleStartDateChange}
            />

          </MuiPickersUtilsProvider>
        </div>
      </Paper>
    </>
  );
};

export default AuctionTimePicker;
