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
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
        //label.text = String(gameMode);
        let screenSize: CGRect = UIScreen.main.bounds;
        var width = screenSize.width;
        var height = screenSize.height;
        print(width);
        print(height);
        label.text = String(gameMode);
        generateBoard();
    }
    
    func generateBoard(){
        let x = !gameMode ? 3 : 4;
        let y = !gameMode ? 4 : 7;
        print(x); print(y);
        
        var i = 0; var j = 0;
        while(i/150 < y){
            print(i);
            while(j/150 < x){
                var button: UIButton = UIButton();
                let img = UIImage(named: "none")!;
                button.frame = CGRect(x: j, y: i, width: 100, height: 100);
                //button.tag = 12
                button.setBackgroundImage(img, for: UIControl.State.normal);
                
                self.view.addSubview(button);
                
                j += 150;
                print(j);
            }
            
            
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
