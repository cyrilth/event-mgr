import { useEffect } from "react";
import { events } from "../../../lib/data/sampleData";
import EventForm from "../form/EventForm";
import EventCard from "./EventCard";
import { AnimatePresence, motion } from "motion/react";
import Counter from "../../counter/counter";
import { useAppDispatch, useAppSelector } from "../../../lib/stores/store";
import { setEvents } from "../eventSlice";

export default function EventDashboard() {
  const dispatch = useAppDispatch();
  const {
    events: appEvents, //renameing events to appEvents to avoid confusion with the events data
    selectedEvent,
    formOpen,
  } = useAppSelector((state) => state.event);

  useEffect(() => {
    dispatch(setEvents(events));

    return () => {
      // Cleanup if needed
      dispatch(setEvents([]));
    };
  }, [dispatch]);

  return (
    <div className="flex flex-row w-full gap-6">
      <div className="w-3/5">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.3, type: "easeInOut" }}
          >
            <div className="flex flex-col gap-4">
              {appEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-2/5 overflow-hidden">
        {formOpen ? (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.3, type: "easeInOut" }}
            >
              <EventForm key={selectedEvent?.id || "new"} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="counter"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.3, type: "easeInOut" }}
            >
              <Counter />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
