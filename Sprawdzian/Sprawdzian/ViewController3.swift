//
//  ViewController3.swift
//  Sprawdzian
//
//  Created by Franciszek Niwicki on 09/12/2022.
//

import UIKit

class ViewController3: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        var alert = UIAlertController(title: "Witaj", message: "Co robisz?", preferredStyle: .alert);

        alert.addAction(UIAlertAction(title: "Wróć", style: .default, handler: { action in
            self.navigationController?.popToRootViewController(animated: true);
        }));
        alert.addAction(UIAlertAction(title: "Graj", style: .cancel, handler: nil));
        
        self.present(alert, animated: true);
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
