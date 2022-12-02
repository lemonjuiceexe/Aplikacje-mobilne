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
    public var rotated: Array<Int> = [];
    public var answers: Array<Int> = [];
    public var colors: Array<UIColor> = [];
    public var moves: Int = 0;
    public var correct: Int = 0;
    
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
        
        drawAnswers(width: width, height: height);
        print(answers);
    }
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        let width = Int(size.width);
        let height = Int(size.height);
        generateBoard(width: width, height: height);
    }
    
    func drawAnswers(width: Int, height: Int){
        answers.removeAll();
        colors.removeAll();
        let x: Int, y: Int;
        if(width < height){
            x = !gameMode ? 3 : 4;
            y = !gameMode ? 4 : 7;
        }
        else{
            x = !gameMode ? 4 : 7;
            y = !gameMode ? 3 : 4;
        }
        for i in 0..<(x*y){
            answers.append((i % ((x * y) / 2)));
            answers.shuffle();
        }
        print(answers);
        for _ in 0..<((x*y)/2){
            colors.append(UIColor(hue: .random(in: 0...1), saturation: 1, brightness: 1, alpha: 1));
        }
    }
    @objc func buttonClick(sender: UIButton){
        if(rotated.count < 2 && !rotated.contains(sender.tag)){
            rotated.append(sender.tag);
            UIView.transition(with: sender, duration: 1,  options: .transitionFlipFromRight, animations: {
                sender.setBackgroundImage(nil, for: .normal)
                sender.backgroundColor = self.colors[self.answers[sender.tag]];
            }, completion: nil);
            if(rotated.count == 2){
                //molto bene
                if(self.answers[rotated[0]] == self.answers[rotated[1]]){
                    for el in self.rotated{
                        buttons[el].removeTarget(self, action: #selector(buttonClick), for: .touchUpInside);
                        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                            self.buttons[el].backgroundColor = self.colors[self.answers[el]].withAlphaComponent(0.4);}
                    }
                    self.rotated.removeAll();
                    self.correct += 2;
                }
                //male
                else{
                    DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                        for el in self.rotated{
                            UIView.transition(with: self.buttons[el], duration: 1,  options: .transitionFlipFromRight, animations: {
                                self.buttons[el].setBackgroundImage(UIImage(named: "none")!, for: .normal)
                                self.buttons[el].backgroundColor = nil;
                            }, completion: nil);
                        }
                        self.rotated.removeAll();
                    }
                }
                self.moves += 1;
            }
            else{}
            
        }
    }
    func generateBoard(width: Int, height: Int){
        let navbar = 50;
        
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
        var xOffset = 0;
        var yOffset = 0;
        let buttonSizeY = (height - ((y - 1) * margin) - (2 * margin) - navbar) / y;
        let buttonSize: Int;
        if(buttonSizeX > buttonSizeY){
            buttonSize = Int(buttonSizeY);
            xOffset = (width - (buttonSize * x)) / 2;
        }
        else{
            buttonSize = Int(buttonSizeX);
            xOffset = ((height - (buttonSize * x)) / 2) + buttonSize - margin - margin;
            yOffset = (height - (buttonSize * y)) / 4;
        }
        print(x); print(y);
        
        if(buttons.count > 0) {
            //copilot napisz to samo co nizej tyhlko inaczej
            var i = 0; var j = 0; var count = 0;
            var ypos = margin + navbar + yOffset;
            while(i/150 < y){
                var xpos = xOffset - margin;
                while(j/150 < x){
                    buttons[count].frame = CGRect(x: xpos, y: ypos, width: buttonSize, height: buttonSize);
                    xpos += margin + buttonSize;
                    
                    j += 150;
                    count += 1;
                }
                
                ypos += margin + buttonSize;
                i += 150;
                j = 0;
            }
            return;
        }
        
        var i = 0; var j = 0;
        var ypos = margin + navbar + yOffset;
        while(i/150 < y){
            var xpos = xOffset - margin;
            while(j/150 < x){
                var button: UIButton = UIButton();
                let img = UIImage(named: "none")!;
                button.frame = CGRect(x: xpos, y: ypos, width: buttonSize, height: buttonSize);
                xpos += margin + buttonSize;
                button.setBackgroundImage(img, for: UIControl.State.normal);
                
                button.addTarget(self, action: #selector(buttonClick), for: .touchUpInside);
                
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
