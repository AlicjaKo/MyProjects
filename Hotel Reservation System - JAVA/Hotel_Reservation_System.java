//This program is created by Alicja Kosak 

import java.util.Scanner;
import java.util.Random;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

//main class with the menu structure
public class AlicjaKosak_Project {
    public static void main (String [] args) {
        Scanner scanner = new Scanner(System.in);
        boolean action = true;
      
        Hotel hotel = new Hotel();
        System.out.println("\n\n\nWelcome to PolarBear hotel!");

        while (action){
            
            System.out.println("\n\nChoose an action by pressing a number.\n\n1 - Make a new reservation\n2 - See your reservation\n3 - Cancel your reservation\n4 - Prices\n5 - Save your reservations on a file\n\nPress any other key to close the menu.");
            switch (scanner.nextLine()) {
                case "1":
                    hotel.makeReservation();
                    break;
                case "2":
                    hotel.searchForReservation();
                    break;
                case "3":
                    hotel.cancelReservation();
                    break;
                case "4":
                    hotel.Prices();
                    break;
                case "5":
                    hotel.Save();
                    break;
                default:
                    System.out.println("\nMenu closed.");
                    break;
            }

//if user types antyhing else the menu closes

            System.out.println("\nType \"menu\" if you want to open the menu again. (Press any other key to exit)");
            action = scanner.nextLine().equalsIgnoreCase("menu");

        }
        System.out.println("\nThank you for visiting us!\n");
        scanner.close();
     }
        
}

// class which stotes data, and uses functions
class Hotel {
    Scanner scanner = new Scanner(System.in);
    Random random = new Random();

    int numberofnights, chosenroom, roomRate, min;
    String roomType;
    int bookedrooms = 0;
    int numberofrooms = (random.nextInt(20) * 2) + 40;
    int singleRoomsAvailable = numberofrooms/2;
    int doubleRoomsAvailable = numberofrooms/2;
    String [] roomlist = new String[numberofrooms];


    // this function asks the user if they want single or double room
    void singleOrDouble() {      
        while (true) {
            System.out.println("\nSingle or double room? (type \"single\" or \"double\")");
            roomType=scanner.nextLine();

            if (roomType.equalsIgnoreCase("single")) {
                if (singleRoomsAvailable==0) {
                    System.out.println("\nSorry, all single rooms are booked.");
                }
                else {
                    roomRate = 100;
                    min = 1;
                    break;
                }
            }
            else if (roomType.equalsIgnoreCase("double")) {
                if (doubleRoomsAvailable==0) {
                    System.out.println("\nSorry, all double rooms are booked.");
                }
                else {
                    roomRate = 150;
                    min = numberofrooms/2 + 1;
                    break;
                }
            }
            else {
                System.out.println("\nInvalid input.");
            }
        }
    }

    //program randomly chooses a number accordingly to the room type and it checks if the room was already taken
    void randomRoomNumber() {
        boolean roomTaken = true;

        while (roomTaken) {
            if (roomType.equals("single")) {
                chosenroom = random.nextInt(numberofrooms/2) + 1;
                if (roomlist[chosenroom - 1] == null) {
                    System.out.println("\nYour room number is: " + (chosenroom));
                    roomTaken = false;
                }   
            }
            else {
                chosenroom = random.nextInt(numberofrooms/2)+(numberofrooms/2)+1;
                if (roomlist[chosenroom - 1] == null) {
                    System.out.println("\nYour room number is: " + (chosenroom));
                    roomTaken = false;
                }  
            }
        }
    }

    //room selection by user, it checks if the room was already taken, and it checks if the user gave a positive integer
    void SelectRoomNumber() {
        int range = 0;

            if (roomType.equals("single")) {
                System.out.println("\nSelect a room number from " + min + " to " + numberofrooms/2 + ".");
                range = numberofrooms/2;
            }
            else {
                System.out.println("\nSelect a room number from " + min + " to " + numberofrooms + ".");
                range = numberofrooms;
            }
            

        while (true) {

            System.out.println("Enter your room number:");
            if (scanner.hasNextInt()) {
                chosenroom = scanner.nextInt();
                scanner.nextLine();
            
                if (chosenroom >= min && chosenroom <= range && roomlist[chosenroom - 1] == null) {
                    break;
                } 
                else if (chosenroom < min || chosenroom > range) {
                    System.out.println("\nInvalid room number. Choose a room number between " + min + " and " + range + ".");
                } 
                else {
                    System.out.println("\nSorry, this room is already taken. Choose another room.");
                }
            } 
            else {
                System.out.println("\nInvalid input.");
                scanner.nextLine();
            }
    }

    }

    //user enters number of nights, and the program checks if its a positive integer
    int Nights() {
        
        while (true) {
            System.out.println("\nHow many nights would you like to stay?");

            if (scanner.hasNextInt()) {
                numberofnights = scanner.nextInt();
                scanner.nextLine();
                if (numberofnights>0) {
                    return numberofnights;
                }
                else {
                    System.out.println("\nNumber must be a postive integer.");
                }
            }
            else {
                System.out.println("\nInvalid input.");
                scanner.nextLine();
            }
        }
    }

    //Saves all reservation data, and makes sure to update availabilty of single/double rooms
    void ResrvationData() {
        String name="";
        int reservationNo = (random.nextInt(89999)) + 10000;
        int invoice = roomRate*numberofnights;
        boolean check = true;
        int discount;

        while (check) {
            System.out.println("\nEnter your name: ");
            name = scanner.nextLine();
            check = false; 

            if (!(name==null) && !(name.isEmpty())) {
                int len = name.length();
                for (int i = 0; i < len; i++) {
                    if ((Character.isLetter(name.charAt(i)) == false)) {
                        check = true;
                        break;
                    }
                }
            }
            else {
                check = true;
            }
        }

        discount = (random.nextInt(3)) + 1;

        if (discount==3) {
            invoice = (invoice/10)*8;
            System.out.println("\nYou have received 20% discount.");
        }
        else if (discount==2) {
            invoice = (invoice/10)*9;
            System.out.println("\nYou have received 10% discount.");
        }
        else {
            System.out.println("\nYou have received no discount.");
        }

        System.out.println("\nName: " + name + "\nReservation nubmer: "+ reservationNo + "\nRoom number: " + chosenroom + "\nNumber of nights: " + numberofnights + "\nInvoice: "+invoice+ " euros");
        roomlist[chosenroom-1]= "Name: " + name + "\nReservation nubmer: "+ reservationNo + "\nRoom number: " + chosenroom + "\nNumber of nights: " + numberofnights + "\nInvoice: "+ invoice + " euros\n\n";
    }

    //program creates a file named "hotelReservations.txt", and if it already exists, it informs the user and it doesnt create a duplicat
    void createFile() {
        try {
            File myRes = new File ("hotelReservations.txt");
            if (myRes.createNewFile()) {
                System.out.println("File created: " + myRes.getName());
            } 
            else {
                System.out.println ("File already exists.");
            }
        }

        catch (IOException e) {
            System.out.println ("An error occurred.");
            e.printStackTrace();}
    }

    //Creates a string with all active reservations
    String allReservations() {
        String allRes = "";
        for (int i = 0; i<numberofrooms; i++) {
            if (!(roomlist[i]==null)) {
                allRes = allRes + roomlist[i];
            }
        }
        return (allRes);
    }

    //Saves the string allreservations on "hotelReservations.txt" file
    void WritingOnFile() {

        try {
            FileWriter myWriter = new FileWriter("hotelReservations.txt");
            myWriter.write(allReservations()); 
            myWriter.close();
            System.out. println("Successfully saved the reservations on a file.");

        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();}
    }
    
    //searches reservation by name, and if there are more reservations on the same name it says to find a reservation by number
    void SearchByName() {
        System.out.println("\nType name: ");
        String searchName = scanner.nextLine();
        int nameCount = 0;
        String reservation = "";

        for (int i = 0; i < roomlist.length; i++) {
            reservation = roomlist[i];
            if (reservation != null && reservation.contains("Name: " + searchName)) {
                nameCount++;
            }
        }
                
        if (nameCount==0) {
            System.out.println("\nNo reservation found on name: " + searchName);
        }
        else if (nameCount==1) {
            for (int i = 0; i < roomlist.length; i++) {
                reservation = roomlist[i];
                if (reservation != null && reservation.contains("Name: " + searchName)) {
                    reservation = roomlist[i];
                    break;
                }
            }
            System.out.println("\nReservation on name: " + searchName + "\n" + reservation);
        }
        else {
            System.out.println("\nThere are " + nameCount + " reservations on name \"" + searchName + "\", you can find your reservation by the reservation number.");
        }       
    }

    //searches for reservation by number, and checks if user typed in an integer
    void SearchByNumber() {
       System.out.println("\nType reservation number: ");
                
        while (true) {
            if (scanner.hasNextInt()) {
                int resNo = scanner.nextInt();
                scanner.nextLine();
                Boolean found = false;

                for (int i = 0; i < roomlist.length; i++) {
                    String reservation = roomlist[i];
                    if (reservation != null) {
                        int storedResNo = Integer.parseInt(reservation.split("\n")[1].split(": ")[1]);
                        if (storedResNo == resNo) {
                            System.out.println("\nReservation with reservation number: " + resNo + ":\n" + reservation);
                            found = true;
                            break;
                        }
                    }
                }

                if (!found) {
                    System.out.println("\nNo reservation found with reservation number: " + resNo);
                }
                break;
            }
            else {
                System.out.println("Invalid input. Please type an integer.");
                scanner.nextLine();
            }
        }
    }

    //cancels reservation by name, and if there are more reservations on the same name it says to cancel a reservation by number
    void CancelByName() {
       
        System.out.println("\nType name: ");
        String searchName = scanner.nextLine();
        int nameCount = 0;
        String reservation = "";

        for (int i = 0; i < roomlist.length; i++) {
            reservation = roomlist[i];
            if (reservation != null && reservation.contains("Name: " + searchName)) {
                nameCount++;
            }
        }
                
        if (nameCount==0) {
            System.out.println("\nNo reservation found on name: " + searchName);
        }
        else if (nameCount==1) {
            for (int i = 0; i < roomlist.length; i++) {
                reservation = roomlist[i];
                if (reservation != null && reservation.contains("Name: " + searchName)) {
                    roomlist[i] = null;
                    if (i < numberofrooms / 2) {
                        singleRoomsAvailable++;
                    } else {
                        doubleRoomsAvailable++;
                    }
                    bookedrooms--;
                    break;
                }
            }

            System.out.println("\nReservation on name \"" + searchName + "\" is cancelled successfully.");
        }
        else {
            System.out.println("\nThere are " + nameCount + " reservations on name \"" + searchName + "\", you can find your cancel by the reservation number.");
        }
    }

    //cancels reservation by number, and checks if user typed in an integer
    void CancelByNumber() {
        
        while (true) {
            System.out.println("\nType reservation number: ");
            if (scanner.hasNextInt()) { 
                int resNo = scanner.nextInt();
                scanner.nextLine();
                Boolean found = false;

                for (int i = 0; i < roomlist.length; i++) {
                    String reservation = roomlist[i];
                    if (reservation != null) {
                        int storedResNo = Integer.parseInt(reservation.split("\n")[1].split(": ")[1]);
                        if (storedResNo == resNo) {
                            System.out.println("\nReservation with reservation number \"" + resNo + "\" is cancelled successfully.");
                            roomlist[i] = null;
                            found = true;
                            if (i < numberofrooms / 2) {
                                singleRoomsAvailable++;
                            } else {
                                doubleRoomsAvailable++;
                            }
                            bookedrooms--;
                            break;
                        }
                    }
                }
                if (!found) {
                    System.out.println("\nNo reservation found with reservation number: " + resNo);
                }
                break;
            }
            else {
                System.out.println("\nInvalid input. Please type an integer.");
                scanner.nextLine();
            }
        }
    }



    //public function which displays prices of rooms
    public void Prices() {
        System.out.println("\nRoom prices:");
        System.out.println("\nSingle room: 100 EUR per night\nDouble room: 150 EUR per night");
    }

    //creates a new reservation using class functions
    public void makeReservation() {

        if (bookedrooms == numberofrooms) {
            System.out.println("\nSorry, but we are fully booked. You cannot make a new reservation.");
            return;
        }
            
        singleOrDouble();

        while (true) {
            System.out.println("\nWould you like to choose or receive a random room number? (Type \"choose\" or \"random\")");
            String choice = scanner.nextLine();
            if (choice.equalsIgnoreCase("choose")) {
                SelectRoomNumber();
                break;
            }
            else if (choice.equalsIgnoreCase("random")) {
                randomRoomNumber();
                break;
            }
            else {
                System.out.println("\nInvalid answer.");
            }
        }

        Nights();
        ResrvationData();
            
        bookedrooms++;
        if (roomType.equals("single")) {
            singleRoomsAvailable--;
        }
        else {
            doubleRoomsAvailable--;
        }

    }

    //cancels reservations by name or number
    public void cancelReservation() {
        boolean noReservation = false;
        
        for (int i = 0; i<numberofrooms; i++) {
            if (!(roomlist[i]==null)) {
                noReservation = true;
            }
        }

        if (!noReservation) {
            System.out.println("\nThere are no reservations.");
        }

        while (noReservation) {
            System.out.println("\nWould you like to find and cancel your reservation by name or reservation number? (Type \"name\" or \"number\")");
            String userInput=scanner.nextLine();

            if (userInput.equalsIgnoreCase("name")) {            
                CancelByName();
                break;
            }

            else if (userInput.equalsIgnoreCase("number")) {
                CancelByNumber();
                break;
            }
            
            else {
                System.out.println("\nInvalid input.");
            }

        }
    }

    //searches for reservation by name or number
    public void searchForReservation() {
        boolean noReservations = false;
        
        for (int i = 0; i<numberofrooms; i++) {
            if (!(roomlist[i]==null)) {
                noReservations = true;
            }
        }

        if (!noReservations) {
            System.out.println("\nThere are no reservations.");
        }
        
        while (noReservations) {
            System.out.println("\nWould you like to find your reservation by name or reservation number? (Type \"name\" or \"number\")");
            String userInput=scanner.nextLine();
            
            if (userInput.equalsIgnoreCase("name")) {
                SearchByName();
                break;
            }
            else if (userInput.equalsIgnoreCase("number")) {
                SearchByNumber();
                break;
                   
            }
            else {
                System.out.println("\nInvalid input.");
            }
        }
    }

    //saves reservation on a file
    public void Save() {
        createFile();
        WritingOnFile();
    }

    //after starting the program, roomlist array has number of elements as many as there are rooms, and all of them are empty
    public Hotel() {
        for (int i = 0; i<numberofrooms; i++) {
            roomlist[i] = null; 
        }
    }

}