func ex1(){
    let name = readLine()?.lowercased() ?? "";
    if(name == ""){
        print("Niepoprawne imie");
        return;
    }
    
    if(!(name[name.index(before: name.endIndex)] == "a")
       || name == "kuba" || name == "barnaba" || name == "bonawentura"){
        print("imie meskie");
    }
    else if(name == "maria"){
        print("nie mozna stwierdzic jakie to imie")
    }
    else{
        print("imie zenskie");
    }
}

func ex2(){
    let p = readLine()?.lowercased() ?? "";
    if(p == ""){
        print("Podaj niepusty pesel");
        return;
    }
    
    //11 characters long
    var correct = p.count == 11;
    //Digits only
    for c in p{
        let temp = c.wholeNumberValue ?? -1;
        if(temp == -1 || String(temp) != String(c)){
            correct = false;
            break;
        }
    }
    //11th digit (control digit)
    
    
    print(correct);
}

ex2()
