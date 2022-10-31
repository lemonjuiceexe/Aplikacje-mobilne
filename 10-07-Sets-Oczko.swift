import Foundation;

let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let suits = ["♠️", "♣️", "♥️", "♦️"];
let startingPlayer = Int.random(in: 0...1);
let avgCardValue = 5.7;

var deck : Set<String> = []; 
var playerCards : Set<String> = []; 
var computerCards : Set<String> = [];
var playerPoints = 0;
var computerPoints = 0;
var allPoints = 0;
// var playerBigPoints = 0;
// var computerBigPoints = 0;
var gameInProgress = true;

func shuffleDeck(){
    //Even more randomness - this way the cards are never in order
    deck = [];
    repeat{
        var card = "";

        repeat {
            card = values.randomElement()! + suits.randomElement()!;
        } while deck.contains(card);
        
        deck.insert(card);
        allPoints += getPoints(card: card);
    } while deck.count < 52;

    playerPoints = 0;
    computerPoints = 0;
    playerCards = [];
    computerCards = [];

    // print("-- ALL POINTS IN DECK IS " + String(allPoints) + " --");
}

func getPoints(card: String) -> Int {
    var points = 0;

    switch card.prefix(1) {
    case "2", "3", "4", "5", "6", "7", "8", "9":
        points = Int(String(card.prefix(1)))!;
    case "1":
        points = 10;
    case "J":
        points = 2;
    case "Q":
        points = 3;
    case "K":
        points = 4;
    case "A":
        points = 11;
    default:
        print("Error: Invalid card");
        return -21;
    }

    return points;
}

//Returns the sum that the player drew
func playerPlay(){
    // if(!gameInProgress) { return; }
    repeat{
        print("(d)obierz czy (p)asuj?");
        var decide : String = readLine() ?? "p";
        decide = decide.lowercased();
        if(decide != "d") {
            print("Pas!");
            break;
        }
        //Draw
        else {
            let card = deck.randomElement()!;
            deck.remove(card);
            playerCards.insert(card);
            playerPoints += getPoints(card: card);
            
            printTurnInfo(player: true, revealed: true);

            if(playerCards.count == 2 && playerPoints == 22){
                print("Perskie oko!");
                win(player: true);
                break;
            }
            else if(playerPoints == 21){
                print("Oczko!");
                win(player: true);
            }
            else if(playerPoints > 21){
                win(player: false);
                break;
            }
        }
    } while true;
}
func computerPlay(){
    // if(!gameInProgress) { return; }
    print("Computer's playing with " + String(computerPoints) + " points");

    while (computerPoints < 16 /*|| computerPoints < playerPoints*/ || (allPoints - computerPoints) / (52 - computerCards.count) <= 21 - computerPoints) {
        // If AI has already beaten the player, then stop playing 
        // if (startingPlayer == 1 && computerPoints > playerPoints) { break; }
        let card = deck.randomElement()!;
        deck.remove(card);
        computerCards.insert(card);
        computerPoints += getPoints(card: card);

        printTurnInfo(player: false, revealed: false);

        if(computerCards.count == 2 && computerPoints == 22){
            print("Perskie oko!");
            win(player: false);
            return;
        }
        else if(computerPoints == 21){
            print("Oczko!");
            win(player: false);
        }
        else if(computerPoints > 21){
            win(player: true);
            return;
        }

        // print("-- COMPUTER DECIDING --");
        // print("Computer has " + String(computerPoints) + " points");
        // print("points < 16 " + String(computerPoints < 16));
        // print("points < playerPoints " + String(computerPoints < playerPoints));
        // print("we have " + String(21 - computerPoints) + " points to play with");
        // print("average left in deck is " + String((allPoints - computerPoints) / (52 - computerCards.count)));
        // print("toPlay > average " + String((allPoints - computerPoints) / (52 - computerCards.count) <= 21 - computerPoints))
    } 
    print("Komputer pasuje!");
}
// true - player info, false - computer info
func printTurnInfo(player : Bool, revealed : Bool){
    // if (player) { revealed = true; }
    let d = player ? playerCards : computerCards;
    let p = player ? playerPoints : computerPoints;
    var info : String = "";
    for card in d {
        info += revealed ? card + " (" + String(getPoints(card: card)) + ") " : "🂠 ?? ";
    }
    print(player ? "\nTwoja ręka:" : "\nRęka komputera:");
    info += revealed ? "\tSUMA: " + String(p) + "\n" : "\tSUMA: ??\n";
    print(info);
}

func win(player: Bool){
    if(player){
        print("Wygrałeś!");
    }
    else {
        print("Przegrałeś!");
    }

    printTurnInfo(player: true, revealed: true);
    printTurnInfo(player: false, revealed: true);

    gameInProgress = false;
}

    shuffleDeck();
    print("--------------------")
    if(startingPlayer == 0){
        print("Komputer zaczyna");
        computerPlay();
        if(gameInProgress){
            playerPlay();
        }
    }
    else {
        print("Ty zaczynasz");
        playerPlay();
        if(gameInProgress){
            computerPlay();
        }
    }
    if(playerPoints > computerPoints && gameInProgress){
        win(player: true);
    }
    else if(playerPoints < computerPoints && gameInProgress){
        win(player: false);
    }
    else if(gameInProgress){
        print("Remis!");
    }
    gameInProgress = true;