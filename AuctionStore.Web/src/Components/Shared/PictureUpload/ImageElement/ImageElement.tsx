import React from "react";
import { IImageElementProps } from "./IImageElementProps";
import { makeStyles } from "@material-ui/styles";
import { IconButton } from "@material-ui/core";
import { Delete, Check, Clear } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  main: {
    position: "relative",
  },
  pictureThumbnail: {
    display: "inline-grid",
    maxWidth: "150px",
    maxHeight: "90px",
    justifyContent: "center",
    alignContent: "center",
    padding: "10px",
  },
  icons: {
    display: "flex",
    position: "absolute",
    top: "2%",
    right: "10%",
    width: "20px",
    height: "auto",
    "& .MuiIconButton-root": {
      padding: "0px",
    },
  },
}));

const ImageElement: React.FC<IImageElementProps> = ({
  file,
  onDelete,
  onDeleteMainPhoto,
  onSetMainPhoto,
  selectedPhoto,
}) => {
  const classes = useStyles();

  const handleOnDelete = (e : React.MouseEvent) => {
    onDelete(file);
    e.stopPropagation()
  };
  const handleSetMainPhoto = (e : React.MouseEvent) : void => {
    onSetMainPhoto(file);
    e.stopPropagation()
  };

  const handleDeleteMainPhoto = (e : React.MouseEvent): void => {
    onDeleteMainPhoto(file);
    e.stopPropagation()
  };

  return (
    <div className={classes.main}>
      <img
        src={(file.data as string) ?? ""}
        alt=""
        className={classes.pictureThumbnail}
      />
      <div className={classes.icons}>
        {selectedPhoto === "" && (
          <IconButton onClick={handleSetMainPhoto}>
            <Check style={{ color: "red" }} />
          </IconButton>
        )}
        {selectedPhoto === file.data && (
          <IconButton
            onClick={handleDeleteMainPhoto}
            hidden={selectedPhoto !== "" && selectedPhoto !== file.data}
          >
            <Clear style={{ color: "red" }} />
          </IconButton>
        )}

        <IconButton onClick={handleOnDelete}>
          <Delete style={{ color: "red" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default ImageElement;
