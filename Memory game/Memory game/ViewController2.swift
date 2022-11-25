//
//  ViewController2.swift
//  Memory game
//
//  Created by Franciszek Niwicki on 23/11/2022.
//

import UIKit

class ViewController2: UIViewController {

    @IBOutlet weak var label: UILabel!
    
    public var gameMode: Bool = false; //0 - 4x3, 1 - 7x4
    public var buttons: Array<UIButton> = [];
    public var answers: Array<Array<Int>> = [];
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
        //label.text = String(gameMode);
        let screenSize: CGRect = UIScreen.main.bounds;
        let width = Int(screenSize.width);
        let height = Int(screenSize.height);
        print(width);
        print(height);
        generateBoard(width: width, height: height);
        
        drawAnswers();
        print(answers);
    }
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        let width = Int(size.width);
        let height = Int(size.height);
        generateBoard(width: width, height: height)
    }
    
    func drawAnswers(){
        var copyButtons = buttons;
        while copyButtons.count > 0{
            let first = copyButtons.randomElement()!.tag;
            copyButtons.removeAll(where: {$0.tag == first});
            let second = copyButtons.randomElement()!.tag;
            copyButtons.removeAll(where: {$0.tag == first});
            
            answers.append([first, second]);
        }
    }
    func generateBoard(width: Int, height: Int){
        let navbar = 50;
        
        for el in buttons{
            el.removeFromSuperview();
        }
        buttons.removeAll();
        
        //vertical
        let x: Int, y: Int;
        print(width); print(height);
        if(width < height){
            x = !gameMode ? 3 : 4;
            y = !gameMode ? 4 : 7;
        }
        else{
            x = !gameMode ? 4 : 7;
            y = !gameMode ? 3 : 4;
        }
        
        let margin = 20;
        let buttonSizeX = (width - ((x - 1) * margin) - (2 * margin)) / x;
        let buttonSizeY = (height - ((y - 1) * margin) - (2 * margin) - navbar) / y;
        let buttonSize: Int;
        if(buttonSizeX > buttonSizeY){
            buttonSize = Int(buttonSizeY);
        }
        else{
            buttonSize = Int(buttonSizeX);
        }
        print(x); print(y);
        
        var i = 0; var j = 0;
        var ypos = margin + navbar;
        while(i/150 < y){
            var xpos = margin;
            while(j/150 < x){
                var button: UIButton = UIButton();
                let img = UIImage(named: "none")!;
                button.frame = CGRect(x: xpos, y: ypos, width: buttonSize, height: buttonSize);
                xpos += margin + buttonSize;
                //button.tag = 12
                button.setBackgroundImage(img, for: UIControl.State.normal);
                
                buttons.append(button);
                button.tag = buttons.count - 1;
                self.view.addSubview(button);
                
                
                j += 150;
            }
            
            ypos += margin + buttonSize;
            i += 150;
            j = 0;
        }
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
