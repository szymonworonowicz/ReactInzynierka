import React, { useState, useCallback, useEffect } from "react";
import {
  Grid,
  FormControl,
  Input,
  InputLabel,
  TextField,
  Button
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { CategoriesApi } from "../../Services/Categories/Category.service";
import { NewsletterService } from "../../Services/Newsletter/Newsletter.service";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import { INewsletterInfo,ICategory } from "../../Interfaces/Newsletter";
import { useToast } from "../../shared/hooks/useToast";
import { useHistory } from "react-router-dom";
import { LottieContext } from "../../Context/LottieContext";

const useStyles = makeStyles({

    element : {
        margin:'10px'
    },
    submit:{
        display:'flex',
        margin:'10px',
        justifyContent:'flex-end'
    }
});

const NewsletterForm: React.FC = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const {isOpen, setLottieOpen} = React.useContext(LottieContext);
    const [data, setData] = useState<INewsletterInfo>({
    email: "",
    subcategories: [],
  });

  const classes = useStyles();
  const { t } = useTranslation();
  const toast = useToast();
  const history = useHistory();

  const getCategories = useCallback(async () => {
  }, []);
  
  useEffect(() => {
    setLottieOpen(true);
    CategoriesApi.getAll()
      .then(response => {
        let arr: Array<ICategory> = [];
        response.forEach((category) => {
            category.subCategories.forEach(subcategory => {
              
              arr = [...arr, {
                    id : subcategory.id,
                    categoryName : category.name,
                    name: subcategory.name
                }];
              })
        });
      
        setCategories(arr);
      })
      .finally(() => {
        setLottieOpen(false);
      })

  }, [getCategories, setLottieOpen]);
  
  const handleEmailChange = (e: React.ChangeEvent<{ value: string }>): void => {
    const { value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        email: value,
      };
    });
  };

  const handleOptionLabel = (option : ICategory): string => {
      return option.name;
  }

  const handleGroupOptions = (option : ICategory) : string => {
      return option.categoryName
  }

  const handleCategoriesChange = (_e: React.ChangeEvent<{}>, newValue : ICategory[]) : void => {
      const ids = newValue.map(x => x.id);
      setData(prev => {
          return {
              ...prev,
              subcategories: [...ids]
          }
      })
  };

  const handleNewsletterSave = () : void => {
    NewsletterService.sendNewsletter(data)
      .then(response => {
        if (response) {
          toast(t('added_to_newsletter'),'success');
          setTimeout(() => {
            history.push('/');
          },5000);
        }
        else {
          toast(t('added_to_newsletter_failure'),'error');
    
        }
      })
  }

  if (isOpen) {
    return <></>
  }

  return (
    <Grid container spacing={1} alignItems="center" justifyContent="center">
      <Grid item xs={12} className={classes.element}>
        <FormControl fullWidth>
          <InputLabel htmlFor="email">{t("email")}</InputLabel>
          <Input
            id="email"
            autoFocus
            fullWidth
            value={data.email}
            onChange={handleEmailChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} className={classes.element}>
          <Autocomplete 
            multiple
            options={categories}
            getOptionLabel={handleOptionLabel}
            groupBy={handleGroupOptions}
            onChange={handleCategoriesChange}
            renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label={t('categories')}
                  placeholder={t('select_categories')}
                />
              )}
          />
      </Grid>
      <Grid item xs={12} className={classes.submit}>
          <Button
            variant='contained'
            onClick={handleNewsletterSave}
          >
              {t('add_newsletter')}
          
          </Button>
      </Grid>
    </Grid>
  );
};

export default NewsletterForm;
