import { useState } from "react";
import { useQuery } from "react-query";
//components
import Drawer from "@material-ui/core/Drawer";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
//styles
import { Wrapper, StyledButton } from "./App.styles";
import CartItem from "./CartItem/CartItem";

//types
export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => {
    return await (await fetch("https://fakestoreapi.com/products")).json();
};

const App = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[])

    const { data, isLoading, error } = useQuery<CartItemType[]>(
        "products",
        getProducts
    );

    const getTotalItems = (items: CartItemType[]) => {
        return items.reduce((acc: number, item) => acc + item.amount, 0)
    };

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prev => {
            //Is the item already in the cart?
            const isItemInCart = prev.find(item => item.id === clickedItem.id);

            if(isItemInCart) {
                return prev.map(item => item.id === clickedItem.id ? {...item, amount: item.amount + 1} : item)
            }

            //The item is added first time
            return [...prev, {...clickedItem, amount: 1}]
        })
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev =>
            prev.reduce((acc, item) => {
                if(item.id === id){
                    if(item.amount === 1) return acc;
                    return [...acc, {...item, amount: item.amount - 1}]
                }
                else{
                    return [...acc, item];
                }
            }, [] as CartItemType[])
        );
    };

    if (isLoading) return <LinearProgress/>;

    if (error) return <div>Something went wrong...</div>;

    return (
        <Wrapper>
            <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                <DialogTitle disableTypography >
                    <IconButton onClick={() => setCartOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
               <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}></Cart>
            </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
            <Badge badgeContent={getTotalItems(cartItems)} color="error">
                <AddShoppingCartIcon fontSize="large"/>
            </Badge>
        </StyledButton>
            <Grid container spacing={3}>
                {data?.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4}>
                        <Item item={item} handleAddToCart={handleAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    );
};

export default App;
