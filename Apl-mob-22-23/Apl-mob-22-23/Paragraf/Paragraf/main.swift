import Foundation

var current = "0";
let dictionary = readJSON(p: "paragraphs");

print(dictionary[current]);
print("achavfdsgufutg");

func readJSON(p: String) -> String{
    let path = Bundle.main.path(forResource: "Resources/" + p, ofType: "json") ?? "";
    let json = JSONSerialization.jsonObject(with: Data(contentsOf: URL(fileURLWithPath: path), options: .mappedIfSafe), options: []);
    guard let dictionary = json as? [String: Any] else {
        return "";
    }
    return dictionary;
}