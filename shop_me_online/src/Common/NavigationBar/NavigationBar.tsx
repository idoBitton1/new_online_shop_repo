import React, { useEffect, useState } from "react";
import useStyles from "./NavigationBarStyles";

//redux
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionsCreators } from '../../state';

//material ui
import { Button, SelectChangeEvent } from "@mui/material";

//interface
import { Product } from "../../Pages/Home/Home";

//icons
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { GiConverseShoe, GiDress, GiShorts, GiMonclerJacket, GiLabCoat } from 'react-icons/gi';
import { FaTshirt } from 'react-icons/fa';
import { BsFillHandbagFill } from 'react-icons/bs';
import { FiltersDialog } from "./FiltersDialog/FiltersDialog";

interface CategoryStyle {
    icon: JSX.Element,
    category_name: string
}

export interface Filters {
    category: string
    color: string,
    season: string
}

interface MyProps {
    products: Product[],
}

export const NavigationBar: React.FC<MyProps> = ({ products }) => {
    //styles
    const { classes } = useStyles();

    //state
    const [open_dialog, setOpenDialog] = useState<boolean>(false);
    //all filters settings are held in this object
    const [filters, setFilters] = useState<Filters>({
        category: "any_category",
        color: "any_color",
        season: "any_season"
    });

    //redux actions
    const dispatch = useDispatch();
    const { setFilterProducts, filterFilterProducts } = bindActionCreators(actionsCreators, dispatch);
  
    //const arrays
    //colors array
    const colors_array: string[] = [ "any", "black", "blue", "green" ];

    //categories array
    const categories_array: CategoryStyle[] = [
        {
            icon: <GiConverseShoe className={classes.category_icon} />,
            category_name: "shoes"
        },
        {
            icon: <FaTshirt className={classes.category_icon} />,
            category_name: "shirts"
        },
        {
            icon: <GiShorts className={classes.category_icon} />,
            category_name: "shorts"
        },
        {
            icon: <GiMonclerJacket className={classes.category_icon} />,
            category_name: "jackets"
        },
        {
            icon: <GiLabCoat className={classes.category_icon} />,
            category_name: "coats"
        },
        {
            icon: <GiDress className={classes.category_icon} />,
            category_name: "dresses"
        },
        {
            icon: <BsFillHandbagFill className={classes.category_icon} />,
            category_name: "bags"
        }
    ];

    //sort the categories array
    categories_array.sort((a, b) => {
        if (a.category_name < b.category_name)
            return -1;
        else if (a.category_name > b.category_name)
            return 1;
        else
            return 0;
    });

    //click handle for category filter change
    const handleCategoryChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setFilters((prev) => {
            if (prev.category === event.currentTarget.value as string)
                return {
                    category: "any_category",
                    color: prev.color,
                    season: prev.season
                }
            else
                return {
                    category: event.currentTarget.value as string,
                    color: prev.color,
                    season: prev.season
                }
        });
    }

    //click handle for color filter change
    const handleColorChange = (event: SelectChangeEvent) => {
        setFilters((prev) => {
            return {
                category: prev.category,
                color: event.target.value as string,
                season: prev.season
            }
        });
    }

    //click handle for season filter change
    const handleSeasonChange = (event: SelectChangeEvent) => {
        setFilters((prev) => {
            return {
                category: prev.category,
                color: prev.color,
                season: event.target.value as string
            }
        });
    }

    //filter when category is changed
    useEffect(() => {
        filterProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.category])

    //toggle the filter dialog
    const toggleFiltersDialog = () => {
        setOpenDialog((prev) => !prev);
    }

    //filter on click
    const handleFilterClick = () => {
        filterProducts();

        toggleFiltersDialog();
    }

    //disable all filters and return filtered_products to the original
    const disableFilters = () => {
        setFilters({
            category: "any_category",
            color: "any_color",
            season: "any_season"
        });

        setFilterProducts(products);
    }

    //filter the products array by the filters object,
    //and everytime a filter is changed, refilter the products 
    //array and place the filtered array in the filtered_array
    const filterProducts = () => {
        setFilterProducts(products)

        filterFilterProducts(filters)
    }

    return (
        <>
            <div className={classes.navigation_bar}>
                <div className={classes.filter_btns}>
                    {categories_array.map((item, i) => {
                        return (
                            <Button key={i}
                            className={`${classes.category_style} ${item.category_name === filters.category ? 'active' : 'inactive'}`}
                            value={item.category_name}
                            onClick={handleCategoryChange}>
                                {item.icon}
                                {item.category_name}
                            </Button>
                        )
                    })}
                </div>

                <div>
                    <button onClick={toggleFiltersDialog} className={classes.filter_btn}>
                        {<FilterListIcon className={classes.filter_btn_icon} />} Filters
                    </button>
                    <button onClick={disableFilters} className={classes.filter_btn}>
                        {<FilterListOffIcon className={classes.filter_btn_icon} />} Unfilter
                    </button>
                </div>
            </div>

            <FiltersDialog 
            filters={filters}
            open_dialog={open_dialog}
            colors_array={colors_array}                                                        
            handleFilterClick={handleFilterClick}
            handleColorChange={handleColorChange}
            handleSeasonChange={handleSeasonChange}
            toggleFiltersDialog={toggleFiltersDialog} 
            />
        </>
    );
}