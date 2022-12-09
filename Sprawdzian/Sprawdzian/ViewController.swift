//
//  ViewController.swift
//  Sprawdzian
//
//  Created by Franciszek Niwicki on 09/12/2022.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var nameBox: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let dest = segue.destination as? ViewController2{
            dest.nickname = nameBox.text ?? " [brak imienia]";
        }
    }


}

