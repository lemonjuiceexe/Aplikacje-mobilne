//
//  ViewController1.swift
//  BMI
//
//  Created by Franciszek Niwicki on 02/11/2022.
//

import UIKit

class ViewController1: UIViewController {

    @IBOutlet weak var weightInput: UITextField!
    @IBOutlet weak var heightInput: UITextField!
    
    //Calculate button onclick
    @IBAction func calculate(_ sender: Any) {
        if(weightInput.hasText && heightInput.hasText){
            
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
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
