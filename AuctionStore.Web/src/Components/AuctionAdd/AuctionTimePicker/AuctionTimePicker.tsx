import React, { useState } from "react";
import {
  Paper,
  Tab,
  Tabs,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IAuctionTimePickerProps } from "./IAuctionTimePickerProps";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  TimePicker,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import MomentUtils from "@date-io/moment";
import { makeStyles } from "@material-ui/core/styles";
import "moment/locale/pl";

const useStyles = makeStyles({
  pickersContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    margin: "0 20px",
  },
  picker: {
    width: "45%",
  },
});

type FormTime = {
  startTime : MaterialUiPickersDate;
  endTime :MaterialUiPickersDate;
  duration :MaterialUiPickersDate;
} 

const AuctionTimePicker: React.FC<IAuctionTimePickerProps> = ({
  auction,
  setAuction,
  margin,
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { setValue } = useFormContext();
  const { t } = useTranslation();
  const [times, setTimes] = useState<FormTime>({
    duration : null,
    endTime : null,
    startTime: null
  })

  const classes = useStyles();

  const handleChangeAuctionType = (
    _e: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setSelectedTab(newValue);
    setValue("isTimeAuction", newValue === 1);
    setValue('timeStampDuration','');
    setValue('timeStampEnd','');
    setValue('timeStampStart','');

    setTimes({
      duration : null,
      endTime : null,
      startTime: null
    })
    
    setAuction((prev) => {
      return {
        ...prev,
        isTimeAuction: newValue === 0,
      };
    });
  };

  const handleStartDateChange = (date: MaterialUiPickersDate) => {
    setTimes(prev => {
      return {
        ...prev,
        startTime : date
      }
    });
    setValue("timeStampStart", date?.unix());
  };

  const handleEndDateChange = (date: MaterialUiPickersDate) => {
    setTimes(prev => {
      return {
        ...prev,
        endTime : date
      }
    });
    setValue("timeStampEnd", date?.unix());
  };

  const handleDuration = (date: MaterialUiPickersDate) => {
    setTimes(prev => {
      return {
        ...prev,
        duration : date
      }
    });
    debugger;
    setValue("timeStampDuration",((date?.minutes() ?? 0) * 60 +( date?.seconds() ?? 0)));
  };
  const getSecondLabel = (): string => {
    return selectedTab === 0 ? t("endtime") : t("duration");
  };

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
            label={t("auctionTime")}
            id={`nav-tab-${0}`}
            aria-controls={`nav-tabpanel-${0}`}
          />
          <Tab
            label={t("auctionQuick")}
            id={`nav-tab-${1}`}
            aria-controls={`nav-tabpanel-${1}`}
          />
        </Tabs>

        <div className={classes.pickersContainer}>
          <MuiPickersUtilsProvider
            utils={MomentUtils}
            libInstance={moment}
            locale={"pl"}
          >
            <KeyboardDateTimePicker
              autoOk={true}
              minDate={moment()}
              format="DD/MM/yyyy HH:MM"
              disablePast
              value={times.startTime}
              label={t("startTime")}
              okLabel={t("save")}
              cancelLabel={t("cancel")}
              onChange={handleStartDateChange}
              className={classes.picker}
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider
            utils={MomentUtils}
            libInstance={moment}
            locale={"pl"}
          >
            {selectedTab === 0 ? (
              <KeyboardDateTimePicker
                autoOk={true}
                minDate={moment(times.startTime)}
                format="DD/MM/yyyy HH:MM"
                disablePast
                value={times.endTime}
                label={getSecondLabel()}
                okLabel={t("save")}
                cancelLabel={t("cancel")}
                onChange={handleEndDateChange}
                className={classes.picker}
              />
            ) : (
              <TimePicker
                autoOk={true}
                format="mm:ss"
                value={times.duration}
                ampm={false}
                views={["minutes", "seconds"]}
                label={getSecondLabel()}
                okLabel={t("save")}
                cancelLabel={t("cancel")}
                onChange={handleDuration}
                className={classes.picker}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <AccessTime />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </MuiPickersUtilsProvider>
        </div>
      </Paper>
    </>
  );
};

export default AuctionTimePicker;
