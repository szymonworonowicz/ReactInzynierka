import React, { useEffect, useState } from "react";
import { IAuctionAddCategoryPickerProps } from "./IAuctionAddCategoryPickerProps";
import { CategoriesApi } from "../../../Services/Categories/Category.service";
import { useFormContext } from "react-hook-form";
import { TextField, CircularProgress } from "@material-ui/core/";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@material-ui/lab/Autocomplete";
import { useTranslation } from "react-i18next";

type ICategorySelect = {
  id: string;
  name: string;
  categoryName: string;
};

const AuctionAddCategoryPicker: React.FC<IAuctionAddCategoryPickerProps> = ({
  setAuction,
  auction,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Array<ICategorySelect>>([]);
  const loading = open && categories.length === 0;
  const { t } = useTranslation();
  const { setValue } = useFormContext();
  const [selectedValue, setSelectedValue] = useState<ICategorySelect | null>(null)

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await CategoriesApi.getAll();
      if (active) {
        let categories: Array<ICategorySelect> = [];
        response.forEach((category) => {
          category.subCategories.forEach((subcategory) => {
            categories = [
              ...categories,
              {
                categoryName: category.name,
                id: subcategory.id,
                name: subcategory.name,
              },
            ];
          });
        });
        setCategories([...categories]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, setCategories]);

  useEffect(() => {
    if (!open) {
      setCategories([]);
    }
  }, [open]);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const getInput = (params: AutocompleteRenderInputParams): JSX.Element => {
    return (
      <TextField
        {...params}
        label={t("selectCategory")}
        variant="outlined"
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {loading ? <CircularProgress size={30} color="inherit" /> : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
      />
    );
  };
  const handleGroup = (option : ICategorySelect) : string => {
    return option.categoryName;
  }

  const handleOptionLabel = (option : ICategorySelect) : string =>  {
    return option.name;
  }

  const handleSelectedOption  =(option : ICategorySelect) : boolean => {
    return option.id === auction.subCategoryId

  }

  const handleCategoryChange = (_event: React.ChangeEvent<{}>, selectedValue : ICategorySelect | null)  => {
    debugger;
    setSelectedValue(selectedValue)
    setAuction(prev => {
      return {
        ...prev,
        subCategoryId : selectedValue?.id
      }
    })
    setValue('subCategoryId', selectedValue?.id)
  }

  return (
    <Autocomplete
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      options={categories}
      getOptionSelected={handleSelectedOption}
      groupBy={handleGroup}
      loading={loading}
      value={selectedValue}
      getOptionLabel={handleOptionLabel}
      openOnFocus
      renderInput={(params) => getInput(params)}
      onChange={handleCategoryChange}
    />
  );
};

export default AuctionAddCategoryPicker;
