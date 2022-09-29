import Foundation

class Paragraph{
    var prompt : String
    var options : [Option]
    
    init(_prompt : String, _options : [Option]){
        prompt = _prompt;
        options = _options;
    }
}
class Option{
    var prompt : String
    var leadTo : String
    
    init(_prompt: String, _leadTo : String){
        prompt = _prompt;
        leadTo = _leadTo;
    }
}

var story : [String : Paragraph] =
    [
        "0" : Paragraph(
            _prompt: "To jest prompt 0. Z tego miejsca zawsze zaczynasz grę. Wybierz jedną z opcji i zatwierdź enterem, aby przejść dalej.",
            _options: [
                Option(_prompt: "To jest opcja nr. 1, prowadzi do p1", _leadTo: "1"),
                Option(_prompt: "To jest opcja nr. 2, prowadzi do p2", _leadTo: "2"),
                Option(_prompt: "To jest opcja nr. 3, też prowadzi do p1", _leadTo: "1")
            ]),
        "1" : Paragraph(
            _prompt: "To jest prompt 1. Wybierz jedną z opcji i zatwierdź enterem, aby przejść dalej.",
            _options: [
                Option(_prompt: "To jest opcja nr. 1, kończy grę", _leadTo: "2")
            ]),
        "2" : Paragraph(
            _prompt: "To jest koniec gry.",
            _options: [])
    ];

//Goddamn code itself lmao
var current = "0";

//Until the story is not finished (assumption: only the last paragraph has no option)
while story[current]!.options.count != 0{
    //Print the prompt and the options
    print(story[current]!.prompt);
    var i = 0;
    for a in story[current]!.options{
        i += 1;
        print(String(i) + ". " + a.prompt);
    }
    print("\n");
    //Read the answer
    var answer = readLine() ?? "1";
    if(answer == ""){
        answer = "1";
    }
    //Apply the answer
    current = story[current]!.options[(Int(answer) ?? 1) - 1].leadTo;
}
//Print the prompt of the last paragraph
print(story[current]!.prompt);
