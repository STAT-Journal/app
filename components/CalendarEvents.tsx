//FILE : CalendarEvents.tsx
//PROJECT : Capstone
//PROGRAMMER : Justin Langevin
//FIRST VERSION : 03/17/2024
//DESCRIPTION : This File is used to get callendar events for the current day or the week
//
import * as Calendar from "expo-calendar";
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { CalendarEventsStyles } from "@/styles/styles";

interface Event {
  id: string;
  title: string;
  startDate: Date;
  // Add more properties as needed
}

const CalendarEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch events for today when component mounts
  useEffect(() => {
    (async () => {
      // Request calendar permissions
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        // Get all calendars
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT,
        );
        const calendarIds = calendars.map((calendar) => calendar.id);

        // Create start and end date for today for the getEventsAsync
        const today = new Date();
        const startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        );
        const endDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1,
        );

        // Fetch events for today
        try {
          const fetchedEvents = await Calendar.getEventsAsync(
            calendarIds,
            startDate,
            endDate,
          );
          setEvents(fetchedEvents as Event[]);
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, []);

  // Function to fetch events for the current day for the getEventsAsync
  async function handleGetEventsForDay() {
    let calendars;
    try {
      calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    } catch (e) {
      console.log(e);
      return;
    }
    const calendarIds = calendars.map((calendar) => calendar.id);

    const today = new Date();
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const endDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );

    // Fetch events for today
    try {
      if (calendarIds.length > 0) {
        const fetchedEvents = await Calendar.getEventsAsync(
          calendarIds,
          startDate,
          endDate,
        );
        if (fetchedEvents.length > 0) {
          console.log("Events for the Day:", fetchedEvents);
          setEvents(fetchedEvents as Event[]); //Asserting the type
        } else {
          console.log("No events for the Day");
          setEvents([]);
        }
      }
    } catch (e) {
      console.log(e);
    }

    // Update state with fetched events or set to empty array if no events
  }

  // Function to fetch events for the current week
  async function handleGetEventsForWeek() {
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT,
    );
    const calendarIds = calendars.map((calendar) => calendar.id);
    if (calendarIds.length === 0) {
      console.log("No calendars found");
    } else {
      const today = new Date();
      const startDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      const endDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7,
      );

      // Fetch events for the week
      const fetchedEvents = await Calendar.getEventsAsync(
        calendarIds,
        startDate,
        endDate,
      );

      // Update state with fetched events or set to empty array if no events
      if (fetchedEvents.length > 0) {
        console.log("Events for Week:", fetchedEvents);
        setEvents(fetchedEvents as Event[]); // Asserting the type
      } else {
        console.log("No events for the Week");
        setEvents([]);
      }
    }
  }

  // Render component
  return (
    <View style={CalendarEventsStyles.container}>
      {/* Buttons to fetch events */}
      <View style={CalendarEventsStyles.buttonContainer}>
        <Button title="Get Events for Today" onPress={handleGetEventsForDay} />
        <Button title="Get Events for Week" onPress={handleGetEventsForWeek} />
      </View>
      {/* Display fetched events */}
      <View style={CalendarEventsStyles.eventsContainer}>
        <Text style={CalendarEventsStyles.eventsTitle}>Events: </Text>
        {events.map((event) => (
          <Text key={event.id} style={CalendarEventsStyles.eventText}>
            {event.title} - {event.startDate.toString()}
          </Text>
        ))}
        {/* Display message if there are no events */}
        {events.length === 0 && (
          <Text style={CalendarEventsStyles.noEventsText}>No events to display</Text>
        )}
      </View>
    </View>
  );
};

// Styles


export default CalendarEvents;
