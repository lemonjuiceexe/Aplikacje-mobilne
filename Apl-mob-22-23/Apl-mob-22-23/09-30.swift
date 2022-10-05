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
func ParseArray(value: String) -> Array<Any>{
    var r = value;
    r = r.replacingOccurrences(of: "[", with: ""); r = r.replacingOccurrences(of: "]", with: ""); 

    var result = r.components(separatedBy: ","); //TODO: problem if string in array contains ','
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