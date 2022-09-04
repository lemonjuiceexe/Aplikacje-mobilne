//1a
print("---1a---");
for i in -22...21{
    print(i);
}
//1b
print("---1b---");
for i in stride(from: -14, through: 55, by: 5){
    print(i, terminator: " ");
}
//1c
print("---1c---");
do {
    var i = 40;
    while i >= 10 {
        if (i <= 15 || i >= 25){
            print(i, terminator: " ");
        }
        i -= 1;
    }
}
//1d
print("---1d---");
do {
    var i = -40;
    while i <= 40 {
        if (i < 3 || i >= 30)
        && i % 2 != 0{
            print(i, terminator: " ");
        }
        i += 1;
    }
}
//1e
print("---1e---");
do {
    var i = -20;
    while i <= 20 {
        if (i <= 5 || i >= 10)
        && i % 2 == 0{
            print(i, terminator: " ");
        }
        i += 1;
    }
}
//1f
print("---1f---");
do {
    var i = -100;
    while i <= 41 {
        if (i <= -28 || i >= 14)
        && i % 7 == 0{
            print(i, terminator: " ");
        }
        i += 1;
    }
}
do{
//2
    var x = Int(readLine()!)!;
    print("---2a---");
    do{
        //2a
        for i in 1...x{
            print("X", terminator: "");
        }
    }
    do{
        print(" ");
        //2b
        print("---2b---");
        var i = 0; var j = 0;
        while(i < x){
            while(j < x){
                if(i == 0 
                || j == 0
                || i == x - 1
                || j == x - 1){
                    print("X", terminator: "");
                }
                else{
                    print(" ", terminator: "");
                }
                j += 1;
            }
            print(" ");
            i += 1;
            j = 0;
        }
    }
    do{
        print(" ");
        //2c
        print("---2c---");
        var i = 0; var j = 0;
        while(i < x){
            while(j < x){
                if(i == x - 1
                || j == x - 1
                || i + j == x - 1){
                    print("X", terminator: "");
                }
                else{
                    print(" ", terminator: "");
                }
                j += 1;
            }
            print(" ");
            i += 1;
            j = 0;
        }
    }
    do{
        print(" ");
        //2d
        print("---2d---");
        var i = 0; var j = 0;
        while(i < x){
            while(j < x){
                if(j <= i){
                    print(j + 1, terminator: "");
                }
                else{
                    print(" ", terminator: "");
                }
                j += 1;
            }
            print(" ");
            i += 1;
            j = 0;
        }
    }
    do{
        print(" ");
        //2e
        print("---2e---");
        var i = 0; var j = 0;
        while(i < x){
            while(j < x){
                if(j >= abs(i - x) - 1){
                    print(abs(j - x), terminator: "");
                }
                else{
                    print(" ", terminator: "");
                }
                j += 1;
            }
            print(" ");
            i += 1;
            j = 0;
        }
    }
    do{
        print(" ");
        //2f
        print("---2f---");
        var r = 1;
        for i in 1...x{
            r *= i;
        }
        print(r, terminator: "");
    }
    do{
        print(" ");
        //2g
        print("---2g---");
        var r = 0;
        for i in 1...x{
            if(i % 2 == 0){
                r += i;
            }
        }
        print(r, terminator: "");
    }
    do{
        print(" ");
        //2h
        print("---2h---");
        var r = false;
        for i in 1...Int(x / 2){
            if(x % i == 0){
                r = true;
                break;
            }
        }
        print(!r, terminator: "");
    }
    do{
        print(" ");
        //2i
        print("---2i---");
        
        print("  ", terminator: "");
        var i = 0; var j = 0;
        //header
        for j in 1...x{
            print(" " + String(j), terminator: "");
        }
        print(" ");
        //table itself
        for i in 1...x{
            print(" ");
            print(i, terminator: " ");
            for j in 1...x{
                print(" " + String(i * j), terminator: "");
            }
        }
    }
}