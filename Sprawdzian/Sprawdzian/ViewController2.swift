//
//  ViewController2.swift
//  Sprawdzian
//
//  Created by Franciszek Niwicki on 09/12/2022.
//

import UIKit

class ViewController2: UIViewController {

    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var goButton: UIButton!
    
    @IBOutlet weak var rowSegmented: UISegmentedControl!
    @IBOutlet weak var colSegmented: UISegmentedControl!
    
    var nickname = "";
    
    var imgButton = UIButton();
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        nameLabel.text = "Hello " + nickname + "!";
    }
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        imgButton.frame = CGRect(x: 10, y: 10, width: 0, height: 0);
        rowSegmented.selectedSegmentIndex = 0;
        colSegmented.selectedSegmentIndex = 0;
    }
    
    @IBAction func goClick(_ sender: Any) {
        let multiply = 30;
        
        var x = colSegmented.selectedSegmentIndex + 1;
        var y = rowSegmented.selectedSegmentIndex + 1;
        x = x * multiply;
        y = y * multiply;
        
        print(x); print(y);
        imgButton.setBackgroundImage(UIImage(named: "tl"), for: .normal);
        imgButton.frame = CGRect(x: Int(self.view.frame.midX) + 50, y: Int(self.view.frame.midY), width: x, height: y);
        
        self.view.addSubview(imgButton);
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
