import React from "react";
import { ITabPanel } from "./ITabPanel";

const TabPanel: React.FC<ITabPanel> = ({ children, value, index }) => {
  return (
    <>
      {value === index && (
        <div
          role="tabpanel"
          id={`nav-tabpanel-${index}`}
          aria-labelledby={`nav-tab-${index}`}
        >
            {children}
        </div>
      )}
    </>
  );
};

export default TabPanel;
