import React from "react";
import useStyles from "./ConnectedUserDDStyles";
import { useNavigate } from "react-router-dom";

//redux
import { useDispatch, useSelector } from 'react-redux';
import { actionsCreators, ReduxState } from "../../../../state";
import { bindActionCreators } from 'redux';

//icons
import { BsCart2, BsTruck } from 'react-icons/bs';
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';

interface MyProps {
    toggleDropDown: () => void
}

export const ConnectedUserDD: React.FC<MyProps> = ({ toggleDropDown }) => {
    //styles
    const { classes } = useStyles();

    //navigate
    const navigate = useNavigate();

    //redux state
    const user = useSelector((redux_state: ReduxState) => redux_state.user);

    //redux actions
    const dispatch = useDispatch();
    const { logout, setCart } = bindActionCreators(actionsCreators, dispatch);

    return (
        <>
            <li className={classes.dropdown_item} onClick={() => navigate('/profile')}>
                <AiOutlineUser className={classes.dropdown_item_icon} />
                <h3>Profile</h3>
            </li>
            {
                user.token?.is_manager
                ?
                <>
                <li className={classes.dropdown_item} onClick={() => navigate('/shipOrders')}>
                    <BsTruck className={classes.dropdown_item_icon} />
                    <h3>Ship orders</h3>
                </li>
                <li className={classes.dropdown_item} onClick={() => navigate('/manageProducts')}>
                    <BsTruck className={classes.dropdown_item_icon} />
                    <h3>Update stock</h3>
                </li>
                </>
                :
                <>
                <li className={classes.dropdown_item} onClick={() => navigate('/cart')}>
                <BsCart2 className={classes.dropdown_item_icon} />
                <h3>Cart</h3>
                </li>
                <li className={classes.dropdown_item} onClick={() => navigate('/wishlist')}>
                    <AiOutlineHeart className={classes.dropdown_item_icon} />
                    <h3>Wishlist</h3>
                </li>
                </>
            }
            <li className={classes.dropdown_item} onClick={() => {
                logout(); //disconnect the user
                setCart([]); //refresh the cart
                navigate('/'); //return to the home page
                toggleDropDown();
                window.location.reload();
            }}>
                <CiLogout className={classes.dropdown_item_icon} />
                <h3>Log out</h3>
            </li>
        </>
    )
}