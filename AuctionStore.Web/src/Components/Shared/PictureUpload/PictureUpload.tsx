import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { IPictureUploadProps } from "./IPictureUploadProps";
import { useTranslation } from "react-i18next";
import { useToast } from "../../../shared/hooks/useToast";
import { DropzoneAreaBase, FileObject } from "material-ui-dropzone";
import { convertBytesToMbsOrKbs } from "../../../Helpers/constans";
import { IFileEntity, IFileEntityId, IFileId } from "./Interfaces";
import {ImageService} from '../../../Services/Image/Image.service';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "90px",
    fontSize: "18px",
  },
  picturePreviewContainer: {
    display: "flex",
    border: "2px solid lightGray",
    height: "90px",
    width: "100%",
    // margin: '20px 0',
    justifyContent: "space-between",
  },
  pictureThumbnail: {
    display: "inline-grid",
    maxWidth: "150px",
    maxHeight: "90px",
    justifyContent: "center",
    alignContent: "center",

    padding: "10px",
  },
  pictureName: {
    display: "inline-grid",
    wordBreak: "break-all",
    fontSize: "20px",
    justifyContent: "center",
    alignContent: "center",
    marginRight: "20px",
  },
  deletePictureIcon: {
    display: "inline-grid",
    borderLeft: "2px solid lightGray",
    minWidth: "45px",
  },
}));

const PictureUpload: React.FC<IPictureUploadProps> = ({
  fileEntity,
  setFileEntity,
  storeFileConfig,
}) => {
  const [files, setFiles] = useState<Array<IFileEntityId>>([]);
  const [selectedFiles, setSelectedFiles] = useState<Array<FileObject>>([]);

  const { t } = useTranslation();
  const classes = useStyles();
  const toast = useToast();

  const onChange = async (files: FileObject[]) => {
    try {
      if (files.length) {
        let loadedFiles: Array<IFileEntityId> = [];
        let fileEntities : Array<IFileEntity> = [];
        const newFiles : Array<FileObject> = files.filter(file => !selectedFiles.find(f => f.data === file.data)); 
        if(newFiles.length === 0) {
          toast(t('cannot add'), 'success');
          return;
        }
        await Promise.all(
          newFiles.map(async(file) => {
            const fileResponse = await ImageService.saveImage(file.file);
            if (fileResponse) {
              loadedFiles = [...loadedFiles, {
                file: file,
                id : fileResponse.id
              }]; 
              
              fileEntities = [
                ...fileEntities,
                { fileId: fileResponse.id, fileName: file.file.name, deleteFile: false },
              ]
            }
          })
        )
        setFiles(loadedFiles);
        setFileEntity(fileEntities);
        setSelectedFiles(prev => [...prev, ...newFiles])
      }
    } catch (error) {}
  };

  const handleDeletePhoto = async (file : FileObject, index:number) : Promise<void> => {
    const filetoDelete = files.find(x => x.file.data === file.data);
    const fileId = filetoDelete?.id ?? '';
    try {
      await ImageService.deleteImage(fileId);
      setFiles(prev => {
        let local = prev;
        local.splice(index,1);
        return [...local];
      })
    } catch (error) {
      
    } 

    setSelectedFiles(prev => {
      let local = prev;
      local.splice(index,1);
      return [...local];
    })
    
  };
  return (
    <>
        <Grid
          container
          style={{ width: "100%", color: "#BABABA", fontSize: "18px" }}
        >
          <DropzoneAreaBase
          dropzoneClass={classes.root}
          dropzoneText={t("uploadImages")}
          // onChange={onChange}
          onAdd={onChange}
          onDelete={handleDeletePhoto}
          filesLimit={storeFileConfig.maxPhotos}
          acceptedFiles={['image/*']}
          useChipsForPreview={false}
          clearOnUnmount={true}

          alertSnackbarProps={{
            anchorOrigin: { vertical: "top", horizontal: "center" },
          }}
          getFileLimitExceedMessage={(filesLimit) => t("maxFiles") + filesLimit}
          getFileRemovedMessage={(fileName) => t("common.form.dropzone.fileRemovedMessage") + fileName}
          getDropRejectMessage={(
            rejectedFile,
            acceptedFiles,
            maxFileSize
          ) => {
            let message = t("common.form.dropzone.fileRejectedMessage") +
              rejectedFile.name +
              " ";
            if (!acceptedFiles.includes(rejectedFile.type)) {
              message += t("fileTypeNotSupported");
            }
            if (rejectedFile.size > maxFileSize) {
              message +=
                t("fileExceededMaxSize") +
                convertBytesToMbsOrKbs(maxFileSize);
            }
            return message;
          } }
          fileObjects={selectedFiles}          
          />
        </Grid>

    </>
  );
};

export default PictureUpload;
