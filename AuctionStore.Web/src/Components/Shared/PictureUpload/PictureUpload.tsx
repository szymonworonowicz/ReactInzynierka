import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IPictureUploadProps } from "./IPictureUploadProps";
import { useTranslation } from "react-i18next";
import { useToast } from "../../../shared/hooks/useToast";
import { DropzoneAreaBase, FileObject } from "material-ui-dropzone";
import { convertBytesToMbsOrKbs } from "../../../Helpers/constans";
import { IFileEntityId } from "./Interfaces";
import ImageElement from "./ImageElement/ImageElement";
import { ImageService } from "../../../Services/Image/Image.service";
import { IAuctionPhoto } from "../../../Interfaces/Auctions";
import Popper from "../../../shared/Popper/Popper";
import ImageCropModal from './ImageCropModal/ImageCropModal'

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "90px",
    fontSize: "18px",
    position: "relative",
    display: "flex",
    height: "15vh",
    alignItems: "center",
    "& .MuiDropzoneArea-textContainer": {
      display: "none",
    },
    "& .MuiDropzonePreviewList-imageContainer": {
      padding: "0px",
      "& >button": {
        display: "none",
      },
    },
  },
  container: {
    "& > div": {
      flexGrow: "0",
      maxWidth: "12.5%",
      flexBasis: "12.5%",
      padding: "0px",
    },
  },
}));

const PictureUpload: React.FC<IPictureUploadProps> = ({
  fileEntity,
  setFileEntity,
  storeFileConfig,
}) => {
  const [files, setFiles] = useState<Array<IFileEntityId>>([]);
  const [selectedFiles, setSelectedFiles] = useState<Array<FileObject>>([]);
  const [mainPhotoSelected, setMainPhotoSelected] = useState<string>("");

  const { t } = useTranslation();
  const classes = useStyles();
  const toast = useToast();

  const handleChange = async (files: FileObject[]) => {
    debugger;
    if (files.length) {
      const filteredFiles: Array<FileObject> = files.filter(
        (file) => !selectedFiles.find((f) => f.data === file.data)
      );
      if (filteredFiles.length === 0) {
        toast(t("cannot add"), "success");
        return;
      }
      await handleUploadPhoto(filteredFiles)
    }
  };

  const handleUploadPhoto = useCallback(async (newFiles : Array<FileObject>): Promise<void> => {
    if (true) {
      let loadedFiles: Array<IFileEntityId> = [];
      let fileEntities: Array<IAuctionPhoto> = [];
      debugger;
      await Promise.all(
        newFiles.map(async (file) => {
          const fileResponse = await ImageService.saveImage(file.file);
          if (fileResponse) {
            loadedFiles = [
              ...loadedFiles,
              {
                file: file,
                id: fileResponse.id,
              },
            ];

            fileEntities = [
              ...fileEntities,
              {
                photoId: fileResponse.id,
                isMain: false,
              },
            ];
          }
        })
      );
      setSelectedFiles((prev) => [...prev, ...newFiles]);
      setFiles(loadedFiles);
      setFileEntity(fileEntities);
    }
  }, [ setFileEntity]);

  const handleDeletePhoto = async (file: FileObject): Promise<void> => {
    debugger;

    try {
      const index = files.findIndex(
        (x) =>
          x.file.file.lastModified === file.file.lastModified &&
          x.file.file.name === file.file.name
      );
      const fileId = files[index]?.id ?? "";
      await ImageService.deleteImage(fileId);
      setFileEntity((prev) => {
        let local = prev;
        const idx = local.findIndex((x) => x.photoId === fileId);
        if (idx !== -1) {
          local.splice(idx, 1);
        }

        return [...local];
      });
      setFiles((prev) => {
        let local = prev;
        local.splice(index, 1);
        return [...local];
      });
    } catch (error) {}

    const index = selectedFiles.findIndex(
      (x) =>
        x.file.lastModified === file.file.lastModified &&
        x.file.name === file.file.name
    );

    setSelectedFiles((prev) => {
      let local = prev;
      local.splice(index, 1);
      return [...local];
    });

    if (file.data === mainPhotoSelected) {
      setMainPhotoSelected("");
    }
  };

  const handleSetMainPhoto = (file: FileObject): void => {
    const index = files.findIndex((x) => x.file.data === file.data);
    files[index].isMain = true;
    setMainPhotoSelected(file.data as string);
    setFileEntity((prev) => {
      const local = prev;
      const id = files[index].id;
      const idx = fileEntity?.findIndex((x) => x.photoId === id) ?? -1;
      if (idx !== -1) {
        let obj = local[idx];
        obj.isMain = true;
        local.splice(idx, 1, obj);
      }

      return [...local];
    });
  };

  const handleDeleteMainPhoto = (file: FileObject): void => {
    const index = files.findIndex((x) => x.file.data === file.data);
    files[index].isMain = false;
    setMainPhotoSelected("");
    setFileEntity((prev) => {
      const local = prev;
      const id = files[index].id;
      const idx = fileEntity?.findIndex((x) => x.photoId === id) ?? -1;
      if (idx !== -1) {
        let obj = local[idx];
        obj.isMain = false;
        local.splice(idx, 1, obj);
      }

      return [...local];
    });
  };


  return (
    <>
      {/* <Popper 
        open={!isCropped && newFiles.length!==0}
        title={t('crop_image')}
        maxWidth='lg'
        onAgree={handleFinishCrop}
        showCancel = {false}
        body={getImageCropComponent()}
        onCancel={handleCropClose}
      /> */}
      <DropzoneAreaBase
        dropzoneClass={classes.root}
        dropzoneText={t("uploadImages")}
        // onChange={onChange}
        onAdd={handleChange}
        onDelete={handleDeletePhoto}
        filesLimit={storeFileConfig.maxPhotos}
        acceptedFiles={["image/*"]}
        // useChipsForPreview={false}
        // showPreviews={false}

        clearOnUnmount={true}
        alertSnackbarProps={{
          anchorOrigin: { vertical: "top", horizontal: "center" },
        }}
        previewGridClasses={{
          container: classes.container,
        }}
        getFileLimitExceedMessage={(filesLimit) => t("maxFiles") + filesLimit}
        getFileRemovedMessage={(fileName) =>
          t("common.form.dropzone.fileRemovedMessage") + fileName
        }
        getDropRejectMessage={(rejectedFile, acceptedFiles, maxFileSize) => {
          let message =
            t("common.form.dropzone.fileRejectedMessage") +
            rejectedFile.name +
            " ";
          if (!acceptedFiles.includes(rejectedFile.type)) {
            message += t("fileTypeNotSupported");
          }
          if (rejectedFile.size > maxFileSize) {
            message +=
              t("fileExceededMaxSize") + convertBytesToMbsOrKbs(maxFileSize);
          }
          return message;
        }}
        fileObjects={selectedFiles}
        getPreviewIcon={(item) => {
          return (
            <ImageElement
              file={item}
              onDelete={handleDeletePhoto}
              onSetMainPhoto={handleSetMainPhoto}
              onDeleteMainPhoto={handleDeleteMainPhoto}
              selectedPhoto={mainPhotoSelected}
            />
          );
        }}
        children={<div></div>}
      />
    </>
  );
};

export default PictureUpload;
