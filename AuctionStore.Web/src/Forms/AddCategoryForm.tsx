import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { IAddCategory } from "../Interfaces/Category";
import { CategoriesApi } from "../Services/Categories/Category.service";
import {
  Grid,
  TextField,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { FilterOptionsState } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}));

const AddCategoryForm: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  type ExtendedAddCategory = IAddCategory & { inputValue?: string };
  const filter = createFilterOptions<ExtendedAddCategory>();
  const [categories, setCategories] = useState<Array<ExtendedAddCategory>>([]);
  const [selectedValue, setSelectedValue] =
    useState<ExtendedAddCategory | null>(null);
  const loading = open && categories.length === 0;
  const { register, setValue } = useFormContext();
  const { t } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await CategoriesApi.getCategories();

      if (active) {
        setCategories(response as ExtendedAddCategory[]);
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

  const handleSubcategoryChange = (e: any) => {
    const { value } = e.target;
    setSelectedValue((prev) => {
      return {
        ...prev,
        subCategoryName: value,
      };
    });
    setValue("subCategoryName", value);
  };

  const handleCategoryChange = (_event:React.ChangeEvent<{}>, newValue : string | ExtendedAddCategory | null) => {
    if (typeof newValue === "string") {
      setSelectedValue({
        id: newValue,
      });
      setValue("categoryId", newValue);
      setValue('categoryName','');
    } else if (newValue && newValue.inputValue) {
      setSelectedValue({
        name: newValue.inputValue,
      });
      setValue("categoryName", newValue.inputValue);
      setValue('categoryId','');
    } else {
      let value = newValue as IAddCategory;
      setSelectedValue(value);
      setValue("categoryId", value?.id ?? "");
      setValue('categoryName','');
    }
  }

  const handleFilterOption = (options : Array<ExtendedAddCategory>,params : FilterOptionsState<ExtendedAddCategory> ) : Array<ExtendedAddCategory> => {
    const filtered = filter(options, params);

    if (params.inputValue !== "") {
      filtered.push({
        inputValue: params.inputValue,
        name: `${t("Add")} ${params.inputValue}`,
      });
    }

    return filtered;
  }

  const handleOptionLabel = (option : ExtendedAddCategory): string => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }

    return option.name as string;
  }

  return (
    <form>
      <Grid container spacing={1} justify="center" alignContent="center">
        <input type="hidden" {...register("categoryId", { required: false })} />
        <input
          type="hidden"
          {...register("categoryName", { required: false })}
        />
        <input
          type="hidden"
          {...register("subCategoryName", { required: false })}
        />

        <Grid item xs={12}>
          <Autocomplete
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            options={categories}
            value={selectedValue}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            onChange={handleCategoryChange}
            filterOptions={handleFilterOption}
            getOptionLabel={handleOptionLabel}
            renderOption={(option) => option.name as string}
            freeSolo
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("Category")}
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.margin} fullWidth>
            <InputLabel htmlFor="subCategory">{t("subCategory")}</InputLabel>
            <Input
              id="username"
              autoFocus
              fullWidth
              value={selectedValue?.subCategoryName ?? ""}
              onChange={handleSubcategoryChange}
            />
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddCategoryForm;
