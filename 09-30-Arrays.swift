import Foundation

// ----- EXERCISE 1 -----
// Take an array and return only int values
func Ex1(value: Array<Any>) -> Array<Int>{
    var result: [Int] = [];
    for element in value{
        if element is Int{
            result.append(element as! Int);
        }
    }

    return result;
}


// ----- EXERCISE 2 -----
//your own little parser from readLine to Array<Any>
func ParseArray(value: String) -> Array<Any>{
    var r = value;
    r = r.replacingOccurrences(of: "[", with: ""); r = r.replacingOccurrences(of: "]", with: ""); 

    var result = r.components(separatedBy: ",");
    return result;
}
func Ex2() -> Array<Any>{
    // Input
    print("Podaj tablicę");
    var arr = ParseArray(value: readLine() ?? "");
    print("Podaj rotację: Rx lub Lx (x - liczba naturalna). Podaj k żeby wyjść.");
    var rot = "";
    repeat{
        rot = readLine() ?? "";
        if(rot == "k"){ break; }
        
        // Take all the chars after the first and conver them to int (I love Swift <3)
        var x = Int(String(rot[rot.index(rot.startIndex, offsetBy: 1)...])) ?? 0;
        
        // If the first char is R then rotate right
        if(rot[rot.startIndex] == "R"){
            for _ in 0..<x {
                arr.insert(arr[arr.count - 1], at: 0);
                arr.remove(at: arr.count - 1);
            }
        }
        // If the first char is L then rotate left
        else if(rot[rot.startIndex] == "L"){
            for _ in 0..<x {
                arr.append(arr[0]);
                arr.remove(at: 0);
            }
        }
        else{
            print("Podaj poprawną rotację");
            continue;
        }

        print(arr);
    } while rot != "k";
    
    return arr;
}


// ----- EXERCISE 3 -----
func CanMultiplyMatrixes(a: Array<Array<Int>>, b: Array<Array<Int>>) -> Bool{
    if(a[0].count == b.count){
        return true;
    }
    return false;
}
func MultiplyMatrixes(a: Array<Array<Int>>, b: Array<Array<Int>>) -> Array<Array<Int>>{
    if(!CanMultiplyMatrixes(a: a, b: b)){
        print("Nie można pomnożyć tych macierzy (złe wymiary)");
        return [];
    }
    var r: Array<Array<Int>> = [];
    for i in 0..<a.count{
        var row: Array<Int> = [];
        for j in 0..<b[0].count{
            var sum = 0;
            for k in 0..<a[0].count{
                sum += a[i][k] * b[k][j];
            }
            row.append(sum);
        }
        r.append(row);
    }

    return r;
}
// Check if the arrays are int arrays
func Ex3(a: Array<Array<Any>>, b: Array<Array<Any>>) -> Array<Array<Int>>{
    var correct = true;
    for i in 0..<a.count{
        for j in 0..<a[0].count{
            if(!(a[i][j] is Int)){
                correct = false;
                break;
            }
        }
    }
    if(correct){
        for i in 0..<b.count{
            for j in 0..<b[0].count{
                if(!(b[i][j] is Int)){
                    correct = false;
                    break;
                }
            }
        }
    }
    if(!correct){
        print("To nie są macierze typu int");
        return [];
    }
    return MultiplyMatrixes(a: a as! Array<Array<Int>>, b: b as! Array<Array<Int>>);
}


Ex2();