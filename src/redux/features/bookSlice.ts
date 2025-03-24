import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookState = {
      bookItems: BookingItem[];
}

const initialState:BookState = {bookItems: []};

export const bookSlice = createSlice({
      name: "book",
      initialState,
      reducers: {
            addBooking: (state, action:PayloadAction<BookingItem>) => {
                  const remainingItems = state.bookItems.filter((obj) => {
                        return (obj.bookDate !== action.payload.bookDate)||(obj.venue !== action.payload.venue);
                  });
                  remainingItems.push(action.payload);
                  state.bookItems = remainingItems;
            },
            removeBooking: (state, action:PayloadAction<BookingItem>) => {
                  const remainingItems = state.bookItems.filter((obj) => {
                        return (obj.bookDate !== action.payload.bookDate)||(obj.nameLastname !== action.payload.nameLastname)||(obj.tel !== action.payload.tel)||(obj.venue !== action.payload.venue);
                  });
                  state.bookItems = remainingItems;
            }
      }
});

export const {addBooking, removeBooking} = bookSlice.actions;
export default bookSlice.reducer;