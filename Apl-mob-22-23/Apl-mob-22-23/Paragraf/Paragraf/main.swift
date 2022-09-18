var current = 0

//Print the prompt and read output
print("This is the first prompt. \n 1. A\n 2. B");
var answer = readLine() ?? "1";
if(answer == ""){
    answer = "1";
}


print(answer);
