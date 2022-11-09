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
var playerPersian = false; var computerPersian = false;

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
            //Check if you don't have too much cards already
            //Math says the max amount of cards you can have before exceeding 21 is 8 cards + 1 to exceed
            // (4 * 2) + (4 * 3) + 1 * 4 = 24 > 21
            if(playerCards.count >= 9){
                print("Dzień dobry Panie Profesorze. Nikt inny by nie próbował dobierać kart do oporu, także serdecznie Pana pozdrawiam i informuję, że matematyka mówi, że mając 9 kart na pewno przekroczył Pan już 21 punktów. W związku z tym pasujemy. Życzę miłego dzionka i niezłej jazdy w tym Swifcie.");
                print("Pas!");
                break;
            }
            let card = deck.randomElement()!;
            playerCards.insert(card);
            playerPoints += getPoints(card: card);
            
            printTurnInfo(player: true, revealed: true);

            if(playerCards.count == 2 && playerPoints == 22){
                // print("Perskie oczko!");
                playerPersian = true;
                break;
            }
            else if(playerPoints == 21){
                // print("Oczko!");
                // win(player: true);
            }
            // else if(playerPoints > 21){
                // win(player: false);
                // break;
            // }
        }
    } while true;
}
func computerPlay(){
    while (computerPoints < 18 || (allPoints - computerPoints) / (52 - computerCards.count) <= 21 - computerPoints) {
        //If the player is dumb as hell and draws 0-1 cards then ai only needs to beat 11 points
        if (startingPlayer == 1 && playerCards.count <= 1 && computerPoints >= 12) { break; }
        let card = deck.randomElement()!;
        deck.remove(card);
        computerCards.insert(card);
        computerPoints += getPoints(card: card);

        printTurnInfo(player: false, revealed: false);

        if(computerCards.count == 2 && computerPoints == 22){
            print("Perskie oczko!");
            // win(player: false, persian: true);
            computerPersian = true;
            return;
        }
        else if(computerPoints == 21){
            // print("Oczko!");
            // win(player: false);
        }

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
    info += (d.count == 2 && p == 22) && revealed ? " Perskie oczko!" : "";
    info += (p == 21) && revealed ? " Oczko!" : "";
    print(info);
}

func win(player: Bool, draw: Bool = false){
    if(draw){
        print("Remis!");
    }
    else if(player){
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
    if(playerPoints == computerPoints){
        win(player: true, draw: true);
    }
    else if(playerPersian){
        win(player: true);
    }
    else if(computerPersian){
        win(player: false);
    }
    //Cases without persian
    //the player with more points under 21 wins. if both exceed 21, the player with less points wins
    else if(playerPoints > 21 && computerPoints > 21){
        if(playerPoints < computerPoints){
            win(player: true);
        }
        else {
            win(player: false);
        }
    }
    else if(playerPoints > 21){
        win(player: false);
    }
    else if(computerPoints > 21){
        win(player: true);
    }
    else if(playerPoints > computerPoints){
        win(player: true);
    }
    else {
        win(player: false);
    }
    gameInProgress = true;