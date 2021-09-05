import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { Paper, Tabs, Tab } from "@material-ui/core";
import TabPanel from "../Shared/Tabs/TabPanel";
import UserInfo from '../Shared/UserInfo/UserInfo'
import BannedUsers from './BannedUsers/BannedUsers';
import AdminPanel from './AdminPanel/AdminPanel';
import BannedWords from './BannedWords/BannedWords';
import CategoryPanel from './Category/CategoryPanel';

const useStyles = makeStyles({
  root: {
    position: "absolute",
    left: "10%",
    width: "80%",
    flexGrow: 1,
    flexDirection: "row",
  },
  content : {
    height: '80vh',
    marginTop: '10px',
    position: 'relative'
  }
});

const AdminProfile: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleChangeTab = (_e: React.ChangeEvent<{}>, newValue: any) => {
    setSelectedTab(newValue);
  };
  return (
    <div className={classes.root}>
      <div>
        <Paper square>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="icon label tabs example"
          >
            <Tab
              label={t("changeData")}
              id={`nav-tab-${0}`}
              aria-controls={`nav-tabpanel-${0}`}
            />
            <Tab
              label={t("bannedWords")}
              id={`nav-tab-${1}`}
              aria-controls={`nav-tabpanel-${1}`}
            />
            <Tab
              label={t("bannedUsers")}
              id={`nav-tab-${2}`}
              aria-controls={`nav-tabpanel-${2}`}
            />
            <Tab
              label={t("addAdmin")}
              id={`nav-tab-${3}`}
              aria-controls={`nav-tabpanel-${3}`}
            />
             <Tab
              label={t("categories")}
              id={`nav-tab-${4}`}
              aria-controls={`nav-tabpanel-${4}`}
            />
          </Tabs>
        </Paper>
      </div>

      <div className={classes.content}>
        <TabPanel value={selectedTab} index={0}>
          <UserInfo/>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <BannedWords/>
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          <BannedUsers/>
        </TabPanel>
        <TabPanel value={selectedTab} index={3}>
          <AdminPanel/>
        </TabPanel>
        <TabPanel value={selectedTab} index={4}>
          <CategoryPanel/>
        </TabPanel>
      </div>
    </div>
  );
};

export default AdminProfile;
