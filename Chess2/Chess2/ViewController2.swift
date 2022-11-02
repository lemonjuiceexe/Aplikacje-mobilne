//
//  ViewController2.swift
//  Chess2
//
//  Created by Franciszek Niwicki on 02/11/2022.
//

import UIKit

class ViewController2: UIViewController {

    @IBOutlet weak var txt: UILabel!
    
    @IBAction func bt(_ sender: UIButton) {
        txt.text = "ach zostalem klikniety";
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
        txt.text = "hahashsah";
        txt.textColor = UIColor(red: 255, green: 0, blue: 0, alpha: 100);
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
