import { Container } from "semantic-ui-react"
import EventDashboard from "../features/events/dashboard/EventDashboard"
import NavBar from "./nav/NavBar"
import { useState } from "react";

export default function App() {

  const [formOpen, setFormOpen] = useState(false);
  

  return (
    <>
      <NavBar  setFormOpen={setFormOpen}/>
      <Container className="main">
        <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen}/>
      </Container>
    </>
  )
}