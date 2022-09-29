func ex1(){
    print("Podaj imie");
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
    print("Podaj pesel");

    let p = readLine()?.lowercased() ?? "";
    if(p == ""){
        print("Niepoprawny pesel (pusty)");
        return;
    }
    
    //11 characters long
    var correct = p.count == 11;
    if(!correct){
        print("Pesel niepoprawny");
        return;
    }
    //Digits only
    for c in p{
        let temp = c.wholeNumberValue ?? -1;
        if(temp == -1 || String(temp) != String(c)){
            correct = false;
            break;
        }
    }
    //11th digit (control digit)
    var weight = [1, 3 ,7, 9, 1, 3, 7, 9, 1, 3, 1]
    var sum = 0;
    for i in 0...10{
        // print(sum)
        // print(String(p[p.index(p.startIndex, offsetBy: i)].wholeNumberValue ?? 0 * weight[i]) + " " + String(weight[i]))
        sum += (p[p.index(p.startIndex, offsetBy: i)].wholeNumberValue ?? 0) * weight[i];
    }
    var temp = String(sum);
    if((temp[temp.index(before: temp.endIndex)].wholeNumberValue ?? 0) != 0){
        correct = false;
    }
    
    if(!correct){
        print("Pesel niepoprawny");
        return;
    }
    // print(p[p.index(p.startIndex, offsetBy: 9)].wholeNumberValue ?? 0);
    if((p[p.index(p.startIndex, offsetBy: 9)].wholeNumberValue ?? 0) % 2 == 0){
        print("Kobieta");
    }
    else{
        print("Mezczyzna");
    }
    var century = "0";
    if((p[p.index(p.startIndex, offsetBy: 2)].wholeNumberValue ?? 0) == 8
    || (p[p.index(p.startIndex, offsetBy: 2)].wholeNumberValue ?? 0) == 9){
        century = "18";
    }
    else if((p[p.index(p.startIndex, offsetBy: 2)].wholeNumberValue ?? 0) == 0
    || (p[p.index(p.startIndex, offsetBy: 2)].wholeNumberValue ?? 0) == 1){
        century = "19";
    }
    else if((p[p.index(p.startIndex, offsetBy: 2)].wholeNumberValue ?? 0) == 2
    || ((p[p.index(p.startIndex, offsetBy: 2)].wholeNumberValue ?? 0) == 3)){
        century = "20";
    }
    else if((p[p.index(p.startIndex, offsetBy: 2)].wholeNumberValue ?? 0) == 4
    || (p[p.index(p.startIndex, offsetBy: 2)].wholeNumberValue ?? 0) == 5){
        century = "21";
    }
    else if((p[p.index(p.startIndex, offsetBy: 2)].wholeNumberValue ?? 0) == 6
    || (p[p.index(p.startIndex, offsetBy: 2)].wholeNumberValue ?? 0) == 7){
        century = "22";
    }
    
    var year = String(century) + String(p[p.index(p.startIndex, offsetBy: 0)].wholeNumberValue ?? 0) + String(p[p.index(p.startIndex, offsetBy: 1)].wholeNumberValue ?? 0);
    var month = "0";
    
    if((p[p.index(p.startIndex, offsetBy: 2)].wholeNumberValue ?? 0) % 2 == 0
    && p[p.index(p.startIndex, offsetBy: 3)].wholeNumberValue ?? 0 == 1){
        month = "01";
    }
    else if((p[p.index(p.startIndex, offsetBy: 2)].wholeNumberValue ?? 0) % 2 != 0
    && p[p.index(p.startIndex, offsetBy: 3)].wholeNumberValue ?? 0 == 1){
        month = "11";
    }
    else if((p[p.index(p.startIndex, offsetBy: 2)].wholeNumberValue ?? 0) % 2 == 0
    && p[p.index(p.startIndex, offsetBy: 3)].wholeNumberValue ?? 0 == 2){
        month = "02";
    }
    else if((p[p.index(p.startIndex, offsetBy: 2)].wholeNumberValue ?? 0) % 2 != 0
    && p[p.index(p.startIndex, offsetBy: 3)].wholeNumberValue ?? 0 == 2){
        month = "12";
    }
    else if((p[p.index(p.startIndex, offsetBy: 3)].wholeNumberValue ?? 0) == 0){
        month = "10";
    }
    else{
        month = "0" + String(p[p.index(p.startIndex, offsetBy: 3)].wholeNumberValue ?? 0);
    }
    
    var day = String(p[p.index(p.startIndex, offsetBy: 4)].wholeNumberValue ?? 0) + String(p[p.index(p.startIndex, offsetBy: 5)].wholeNumberValue ?? 0);
    
    
    print("Urodzony/a " + day + "." + month + "." + year)
}

var input = ""

repeat{
    print("Wybierz 1 aby wybrać zadanie pierwsze lub 2 żeby wybrać zadanie 2. Wybierz k żeby wyjść");
    input = readLine() ?? "";
    if(input == "1"){
        ex1();
    }
    if(input == "2"){
        ex2();
    }
} while input != "k"
