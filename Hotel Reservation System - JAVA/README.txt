This program is created by Alicja Kosak


PolarBear Hotel Reservation System

1. Overview:

    This Java program simulates a hotel reservation system for the PolarBear hotel. 
    Users can perform various actions through the menu. The program checks user inputs, 
    and does not crash when unexpected value is entered.


2. Information about the hotel:

    - there are 40-80 rooms available (the program draws random even number between them)
    - first half are single rooms (100 eur per night), second half double rooms (150 eur per night)
    - user receive a discount on the invoice (0%, 10%, 20% chosen randomly by the program)
    - each reservation gets unique reservation number between 10000-99999


3. Actions Available through the menu:

    - Make a New Reservation: Create a new reservation.
    - See Your Reservation: View existing reservations, and search by the reservation name or number.
    - Cancel Your Reservation: Cancel a reservation by name or reservation number.
    - Prices: Display room prices.
    - Save Your Reservations on a File: Save all reservations to a file named `hotelReservations.txt`.


4. Functionality:

    - "Make a New Reservation":  
        When all single and double rooms are taken, the program does not let the user create more reservations. 
        Also when all single/double rooms are taken the program let the user book only the remaining type.
        User may choose the room number on their own, or let the program choose for them.
        Program gives also a random discount on the invoice. (0%, 10%, 20%)
        The program check if given name is not empty, and cotains only letters
    
    - "Cancellation"/"Searching for reservation":
        Reservations can be canceled/found either by name or reservation number.
        When there are no reservations, the program informoms of it and does not proceed with the cancelation/searchng.
        If there are several reservations on the same name, the program asks the user to find them by the reservation number.

    - "File Saving": 
        Reservations are stored in an array and then saved to a file.
        The program checks for existing reservation files and creates a new file if none exists.
        Ehen the user creates/deletes a reservation, and then saves on a file, the information updates, 
        so on a file there are active reservations.


5. Using the Program:

    - Upon running, the program prompts users to select actions by entering the corresponding number.
    - Users can navigate through the menu and perform actions based on their choice.
    - Follow on-screen instructions to input data (e.g., name, room type, number of nights).


6. Comments:

    - It is recommended to have more lines of terminal visible, becase some communicats are long.