import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppEvent, FirestoreAppEvent } from "../../lib/types";

type State = {
  events: AppEvent[];
  selectedEvent: AppEvent | null;
  formOpen: boolean;
};

const initialState: State = {
  events: [],
  selectedEvent: null,
  formOpen: false,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvents: {
      reducer: (state, action: PayloadAction<AppEvent[]>) => {
        state.events = action.payload;
      },
      prepare: (events: FirestoreAppEvent[]) => {
        const mapped = events.map((e) => {
          return {
            ...e,
            date: e.date.toDate().toISOString(),
          };
        });
        return { payload: mapped };
      },
    },
    createEvent: (state, action: PayloadAction<AppEvent>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<AppEvent>) => {
      state.events = state.events.map((event) =>
        event.id === action.payload.id ? action.payload : event
      );
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
    selectEvent: {
      reducer: (state, action: PayloadAction<AppEvent>) => {
        state.selectedEvent = action.payload;
      },
      prepare: (event: FirestoreAppEvent) => {
        return {
          payload: {
            ...event,
            date: event.date.toDate().toISOString(),
          },
        };
      },
    },
  },
});

export const { setEvents, createEvent, updateEvent, deleteEvent, selectEvent } =
  eventSlice.actions;
