import React from "react";
import useStyles from "./FiltersDialogStyles";

//material-ui
import { Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";

//icons
import CircleIcon from '@mui/icons-material/Circle';

//interface
import { Filters } from "../NavigationBar";

interface MyProps {
    filters: Filters,
    open_dialog: boolean,
    colors_array: string[],
    handleFilterClick: () => void
    toggleFiltersDialog: () => void,   
    handleColorChange: (event: SelectChangeEvent) => void,
    handleSeasonChange: (event: SelectChangeEvent) => void,   
}

export const FiltersDialog: React.FC<MyProps> = ({open_dialog, toggleFiltersDialog, colors_array, filters, handleColorChange, handleSeasonChange, handleFilterClick}) => {
    //styles
    const { classes } = useStyles();

    return (
        <Dialog open={open_dialog} onClose={toggleFiltersDialog}>
            <DialogTitle>
                <Typography gutterBottom className={classes.main_headline}>
                    Filters
                </Typography>              
            </DialogTitle>

            <DialogContent>
                <div>
                    <FormControl variant="standard" className={classes.color_select}>
                        <InputLabel>Color</InputLabel>
                        <Select
                        label="Color"
                        id="color_select"
                        value={filters.color}
                        onChange={handleColorChange}>
                            {
                                colors_array.map((colorI, i) => {
                                    if (colorI === "any")
                                        return (
                                            <MenuItem key={i} value={"any_color"}>any</MenuItem>
                                        );
                                    else
                                        return (
                                            <MenuItem key={i} value={colorI}>{colorI}{<CircleIcon className={classes.icon} sx={{ color: colorI }} />}</MenuItem>
                                        );
                                })
                            }
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" className={classes.season_select}>
                        <InputLabel>Season</InputLabel>
                        <Select
                        label="Season"
                        id="season_select"
                        value={filters.season}                      
                        onChange={handleSeasonChange}>
                            <MenuItem value={"any_season"}>any</MenuItem>
                            <MenuItem value={"spring"}>spring</MenuItem>
                            <MenuItem value={"summer"}>summer</MenuItem>
                            <MenuItem value={"autumn"}>autumn</MenuItem>
                            <MenuItem value={"winter"}>winter</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <Button variant="contained"
                onClick={handleFilterClick}
                className={classes.filter_btn}>
                    Filter
                </Button>
            </DialogContent>
        </Dialog>
    );
}