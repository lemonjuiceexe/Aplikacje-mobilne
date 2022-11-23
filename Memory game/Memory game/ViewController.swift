//
//  ViewController.swift
//  Memory game
//
//  Created by Franciszek Niwicki on 23/11/2022.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var segmented: UISegmentedControl!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    override func prepare(for segue: UIStoryboardSegue, sender: Any?){
        let dest = segue.destination as! ViewController2;
        let gm = segmented.selectedSegmentIndex;
        dest.gameMode = Bool(gm as NSNumber);
    }


}

