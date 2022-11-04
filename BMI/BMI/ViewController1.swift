//
//  ViewController1.swift
//  BMI
//
//  Created by Franciszek Niwicki on 02/11/2022.
//

import UIKit

class ViewController1: UIViewController {

    @IBOutlet weak var image: UIImageView!
    @IBOutlet weak var weightInput: UITextField!
    @IBOutlet weak var heightInput: UITextField!
    @IBOutlet weak var result: UILabel!
    //Calculate button onclick
    @IBAction func calculate(_ sender: Any) {
        if(weightInput.hasText && heightInput.hasText){
            guard let weight = Double(weightInput.text ?? ""), let height = Double(heightInput.text ?? "") else{
                result.text = ("Dane nie są poprawnymi liczbami!");
                return;
            }
            let bmi = weight / ((height / 100) * (height / 100));
            result.text = String(round(bmi * 10) / 10);
            
            if(bmi >= 25){
                image.image = UIImage(named: "big");
            }
            else if(bmi < 18.5){
                image.image = UIImage(named: "small");
            }
            else{
                image.image = UIImage(named: "medium");
            }
        }
        else{
            result.text = "Puste dane!";
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
