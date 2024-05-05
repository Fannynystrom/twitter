import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import CreateTweet from "../components/CreateTweet"; 
import { UserProvider } from "../context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";

describe("CreateTweet", () => {
    it("submits tweet form with content", async () => {
      // Mocka addTweet-funktionen
      const mockAddTweet = jest.fn();
  
      render(
        <Router>
          <UserProvider>
            <CreateTweet addTweet={mockAddTweet} />
          </UserProvider>
        </Router>
      );
  
      // Simulera användarinteraktion
      const tweetInput = screen.getByPlaceholderText("Skriv din woof här");
      const tweetButton = screen.getByText("Woof");
  
      fireEvent.change(tweetInput, { target: { value: "Detta är ett testtweet" } });
      fireEvent.click(tweetButton);
  
      // Vänta på att tweet-processen ska slutföras
      await waitFor(() => {
        // Verifiera att addTweet-funktionen kallas med rätt argument
        expect(mockAddTweet).toHaveBeenCalledWith("Detta är ett testtweet", undefined);
      });
    });
  });
    
// Testet syftar till att verifiera att när användaren skriver in ett
// tweet och klickar på tweet - knappen, så anropas
// addTweet - funktionen med rätt tweet - innehåll och användaridentitet.
// Funktionalitet:
// Rendera komponenten: Testet renderar CreateTweet-komponenten inuti en Router och en UserProvider, för att replikera den verkliga miljön där komponenten används.
// Simulera användarinteraktion: Testet simulerar användarinteraktion genom att fylla i tweet-innehållet i textrutan och klicka på tweet-knappen.
// Vänta på att tweet-processen ska slutföras: Testet väntar på att den asynkrona processen med att lägga till ett tweet ska slutföras.
//  Detta säkerställer att alla asynkrona operationer som att lägga till ett tweet har genomförts innan testet fortsätter.
// Verifiera att addTweet-funktionen kallas korrekt: Testet verifierar att när användaren klickar på tweet-knappen, så anropas
// addTweet - funktionen med rätt tweet - innehåll och användaridentitet.

// Det lilla testet för CreateTweet - komponenten 
// verifierar att när användaren skriver ett tweet och klickar på tweet - knappen,
//     så anropas rätt funktion med det skrivna tweetet.Det är ett sätt att se till 
//     att den viktigaste delen av komponentens funktionalitet, att lägga till ett tweet,
//     fungerar korrekt.










