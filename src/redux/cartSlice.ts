import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
		subtotal: number;
		deliveryFee: number,
		grandTotal: number
}

function calculateTotals(state :CartState) {
		state.subtotal = subtotal(state.items);
		state.deliveryFee = state.subtotal > 100 ? 0 : 10;
		state.grandTotal = (state.subtotal + state.deliveryFee)+ ((state.subtotal + state.deliveryFee)*0.13)
}

function subtotal(allItems: Record<string, CartItem>): number {
		return Object.values(allItems).reduce((sum, item) => {
				return sum + Number(item.price) * item.quantity;
		}, 0);
}

const initialState: CartState = {
		items: {},
		subtotal: 0,
		deliveryFee: 0,
		grandTotal: 0
};

const cartSlice = createSlice({
		name: "cart",
		initialState,
		reducers: {
				addToCart: (
					state,
					action: PayloadAction<{
							item: IGrocery;
							quantity: number
					}>
				) => {
						const {item, quantity} = action.payload;
						const id = item._id;

						if (!state.items[id]) {
								state.items[id] = {...item, quantity};
						} else {
								state.items[id].quantity = quantity;
						}
						calculateTotals(state)
				},
				removeParticularItem: (state, action) => {

						delete state.items[action.payload];
						calculateTotals(state)

				},
				calculateSubtotal: (state) => {
						calculateTotals(state);
				}


		}
});

export const {addToCart, removeParticularItem,calculateSubtotal} = cartSlice.actions;
export default cartSlice.reducer;