import Foundation

//Working and done
func Ex1(value: Array<Any>) -> Array<Int>{
    var result: [Int] = [];
    for element in value{
        if element is Int{
            result.append(element as! Int);
        }
    }

    return result;
}

//your own little parser from readLine to Array<Any>
func ParseArray(value: String) -> /*Array<Any>*/ String{
    var result = value;
    // result.remove(at: result.startIndex); result.remove(at: result.endIndex); //remove first and last character - '[' and ']'

    return result;
}

// func Ex2() -> Array<Any>{
//     print("Podaj tablicę");
//     // var input: Array<Any> = readLine() as Array<Any> ?? [];
//     var input: [Any] = [];
//     return input;
// }
var n = readLine()!;
print(ParseArray(value: n));