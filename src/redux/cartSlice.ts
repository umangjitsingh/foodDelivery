import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IGrocery {
		_id: string;          // REQUIRED
		name: string;
		category: string;
		price: string;
		unit: string;
		image: string;
		createdAt?: Date;
		updatedAt?: Date;
}

interface CartItem extends IGrocery {
		quantity: number;
}

interface CartState {
		items: Record<string, CartItem>;
}

const initialState: CartState = {
		items: {}
};

const cartSlice = createSlice({
		name: "cart",
		initialState,
		reducers: {
				addToCart: (
					state,
					action: PayloadAction<{ item: IGrocery; quantity: number }>
				) => {
						const { item, quantity } = action.payload;
						const id = item._id;

						if (!state.items[id]) {
								state.items[id] = { ...item, quantity };
						} else {
								state.items[id].quantity = quantity;
						}
				}
		}
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;