import Foundation

class Paragraph{
    var prompt : String
    var options : [Option]
    
    init(_prompt : String, _options : [Option]){
        prompt = _prompt;
        options = _options;
    }
}
class Option{
    var prompt : String
    var leadTo : String
    
    init(_prompt: String, _leadTo : String){
        prompt = _prompt;
        leadTo = _leadTo;
    }
}

var story : [String : Paragraph] =
    [
        "-1" : Paragraph(
            _prompt: "Schemat gry dostępny jest pod linkiem \nhttps://docs.google.com/document/d/1Gv2oZQZrv4YnLpB5-1aNczWbykEocUvLecZ2d1K5hVM/edit?usp=sharing",
            _options: [
                Option(_prompt: "Wróć do menu", _leadTo: "0")
            ]),
        "0" : Paragraph(
            _prompt: "Menu gry \nNaciśnięcie enter i pominięcie wyboru automatycznie wybiera opcję 1. Niepoprawny wybór opcji również wybiera 1 (polecam wpisywać poprawne opcje :D).",
            _options: [
                Option(_prompt: "Rozpocznij grę", _leadTo: "1"),
                Option(_prompt: "Schemat gry (zawiera spoilery)", _leadTo: "-1")
            ]),
        "1" : Paragraph(
            _prompt: """
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@((@@@@@@@@@@@@@@@@@@@@@@@((@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@(@@//@@&@@@@@@@@@@@@@@@@//@@(#@@@@@@@@&&&&@@@@@@@&&%&&&%&#@@@@@@&&&&#@@@@@@
            @@@@(@@/#@,,@@.@@@@@@@@@.%@,,@@/@@(%@@@@@@@@%%#%%%@@&%%%%%%%%%%@@@%%%#%%@@@@@@@@
            @@@((@//@,,@,.@@@@(%&@@@@..@,,@#/@%(@@@@@@@@@##(##@@@@@@####@@@@%@@#@##@@@@@@@@@
            @@@(#@//@,/@.,@@(/(###/@@@.@@,@@/@@(@@@@@@@@@%########################@@@@@@@@@@
            @@@((@//@*,@#.@@//@/&&/@@  @,,@//@#(@@@@@((//((((/#%(/(((@@&((&@@@/((@@@&(@@@@@@
            @@@@(@@//@,,@@@%/@/@(&@/@@@,,@&/@@(@@@@@@@//@@/////////@@@@@////////@////@@@@@@@
            @@@@@(%@//@@@@@/@/@@@/@/@@@@@//@@(@@@@@@@@@@@@////////@@@@////////#@@@@@@@@@@@@@
            @@@@@@#(@@@@@@@/@&#@@/@#(@@@@@@((@@@@@@@@@*********************@@@@@@@@@@@@@@@@@
            @@@@@@@@@#**@@*&*@@@@@/&/@@@@@**&@@@@@@@@@@@%@*******(@@@@@*********@@@@@@@@@@@@
            @@@@@*#@@@@@@@*@@@@*#@@@*@@@@@@@@@@**@@@@@@@@@,,,,,,,,@@@@@@@,,,,,,,,,@@@@@@@@@@
            @/*@@@@@@@@@@%*****/(((*****&@@@@@@@@@@*@@,,,,,,,,,,,,,,,,,@@,,,,,&*,@@@@@@@@@@@
            @@@@@@@**&@@@*@@,@@@@@,@@*@@@@@@###############@@@@@&@(@@#@%.,&####,,,/####@@@*@
            @@@**@@@@@@@@*@@@@@**@@@@/(@@@@@@@@(@*%@@@@@@@@@@@@@&@@@@@#@@&@@@@@@@@@@(@**@@@@
            ##@@@@@@@@#**(@,@@@@@@@*@@*@%**%&&@@@@&&&&&&&&@@@&&&&%@@@@@&&&@@@&&&&&&&(@@@@@@*
            @@@@@/*@@@@@,@,@@@@@@@@@/%,@@@@@&@&*@%&&&&&&&#@@@&&&&&&%@@@@%%@@@&&&&&&&(@@@&*@@
            @@*@@@@@@@@@,@@@@(#@@.@@@@@,@@@@#@@@(%%%%%%%%@@**%%%%%%%%%#@@@@@@&%%%%%%(*%%&@@@
            @@@@@@@@@@@,@@@@@,@@@.@@@@@,@@@@@@@@%%%%%%%%@@@@@%%%%%%%%%%%%/***%%%%%%%%%@@@@*&
            @@@@@@@@@@@,@@,@@@@@@@@@@,@*(@@@@@@%%%%%%%%@/*@@@@%%%%%%%%%%%%@@@%%%%%%%(@@*&@@@
            @@@@@@@@@@*/.&@@@@@@@@@@@@ @,@@@@@#%%%%%%%(@@@@@@**(%%%%%%%%%%%@@%%%%%%%(@@@@@@#
            @@@@@@@@@@.@@@@@ @@@@@ @@@@@,@@@@#########@@@@#@@#@@@@#########@########(@@@@@@#
            @@@@@@@@@@.@@@@@@@(( @@@@@@@&.@@@########@@@@(#@@#(@@@@@@######&########(@@@@@##
            @@@@@@@@@.@@@@@ @@@@@@@/(@@@@.@@########@@@@(##@@###@@@@@@%###%@@#######(@@@@(##
            @@@@@@@@@.@.@@@@@@@@@@@@@@@ @.%(#######(@@(####@@#####@@@@###@@%########(%(#####

            Kolejny dzień w szkole dobiega końca. Wracasz zmęczony do domu. Chcesz położyć się spać, ale na jutro zostało ci jedno zadanie. Na aplikacje zadane jest napisać grę paragrafową. Nazwa trochę dziwna, ale w sumie sam projekt wydaje się być całkiem w porządku.
            """,
            _options: [
                Option(_prompt: "Kontynuuj", _leadTo: "2")
            ]),
        "2" : Paragraph(
            _prompt: """
            Silnik zdążyłeś napisać już w szkole, pozostało ci wymyślenie samej historii. To może być nawet ciekawe, ale żaden pomysł nie może ci przyjść do głowy. Nagle wpadasz na coś genialnego.
            """,
            _options: [
                Option(_prompt: "Napisz grę paragrafową o pisaniu gry paragrafowej", _leadTo: "3"),
                Option(_prompt: "Napisz grę paragrafową w klimacie fantasy", _leadTo: "4"),
                Option(_prompt: "Przeanalizuj priorytety w swoim życiu i idź spać zamiast pisać zadanie po nocy", _leadTo: "35")
            ]),
        "3" : Paragraph(
            _prompt: """
            Zaczynasz pisać fabułę:
            """,
            _options: [
                Option(_prompt: "Kontynuuj", _leadTo: "1")
            ]),
        "4" : Paragraph(
            _prompt: """
                                           
                                                                *@.                      
                                                                ,@@@                      
                                                (*             @@@@@                     
                                                    *@@@@/      .@@@@@@@        %@@@,       
                                                    ,@@@@@@@@(,@@@@@@@@( *@@@@@@@@         
                                                    @@@@@@@@@@@@@@@@@@@@@@@@@@@          
                                                        @@@@@@@@@@@@@@@@@@@@@@@@#           
                                                    .%@@@@@@@@@@@@@@@@@@@@@@@*            
                                            /@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(      
                                            *&@@@@@@@@@@@@@@@@ (@@@@@@@@@@@@@@@@@@@@@@@@@%
                                                    #@@@@@@@/     ,@@@@@@@@@@@@@@@@#       
                                                    #@@@@      ,@@@@@@@@@@@@@,            
                                                    @@@@*      &@@@@@@@@@@@@@@@@*           
                                                (@@@@      ,@@@@@@@@@@@@@@@@@@@@(          
                                            @@@@/      &@@@&(@@@@@@@%   /@@@@@@%         
                                            (@@@@      ,@@@@.   &@@@@@%         /@@&        
                                        @@@@&      &@@@%       @@@@%                      
                                    (@@@@@@@@@ ,@@@@           @@%                       
                                    @@@@@@@@@@@@@@@#              &                        
                                (@@@@@@@@@@@@@@@                                          
                                @@@@@@@@@@@@@@@#                                            
                            (@@@@@@@@@@@@@@@                  #                            
                        @@@@@@@@@@@@@@@#                   @@%                           
                        /@@@@@@@@@@@@@@@                 /@@@@@@@@@@%                       
                    @@@@@@@@@@@@@@@#                        @@&                @@         
                /@@@@@@@@@@@@@@@                           .&                @@@@        
                @@@@@@@@@@@@@@@#                                            %@@@@@@@@(     
            *@@@@@@@@@@@@@@@                                           ,@@@@@@@@@@@@@@@&  
            .@@@@@@@@@@@@@@#                                                   %@@@@*       
            @@@@@@@@@@@@                                                       &@@*        
            (@@@@@@@/                                                          &*         
            Zaczynasz pisać fabułę:
            """,
            _options: [
                Option(_prompt: "Kontynuuj", _leadTo: "5")
            ]),
        "5" : Paragraph(
            _prompt: """
            Po paru godzinach udało ci się skończyć fabułę gry. Nazwałeś ją ,,Totalnie Nie Hobbit”. Teraz pozostało tylko ją przetestować:
            """,
            _options: [
                Option(_prompt: "Kontynuuj", _leadTo: "6")
            ]),
        "6" : Paragraph(
            _prompt: """
                                                                                                                                                                
                                    *@@@@@@@@@@@@@@@@@@@@&.                            
                            /@@@@@@&*                 #@@@@@@@                       
                        (@@@@&                              ,@@@@@.                  
                        @@@@&           @@@@@@@  ,@@@@@@%           @@@@.               
                    ,@@@&        @@@  .@@@@@@@  ,@@@@@@@  ,@@/        @@@@             
                *@@@.      #@@@@@@  .@@@@@@@  ,@@@@@@@  ,@@@@@@.      %@@@           
                .@@@.                 .@@@@@@@  ,@@@@@@@  ,@@@@@@@        #@@@         
                &@@(     /@   @@@@@@@  .@@@@@@@  ,@@@@@@@  ,@@@@@@@  ,@      @@@,       
            @@@      @@@   @@@@@@@  .@@@@@@@  ,@@@@@@@  ,@@@@@@@  ,@@@     #@@#      
            @@@     /@@@@   @@@@@@@  .@@@@@@@  ,@@@@@@@  ,@@@@@@@  ,@@@@     /@@%     
            @@@     #@@@@@   @@@@@@@  .@@@@@@@  ,@@@@@@@  ,@@@@@@@  ,@@%               
            ,@@(    ,@@@@@@   @@@@@@@  .@@@@@@@  ,@@@@@@@  ,@@@@@@@  ,@@%  %@@@@@@%     
            @@@     @@@@@@#        @@  .@@@@@@@            ,@@@@@@@  ,@@%  %@@@@@@%     
            @@@     @@@@@   @@@@@#  .  .@@@@@@@  ,@@@@@@@  ,@@@@@@@  ,@@%  %@@@@@@%     
            @@@     @@@@*  @@@@@@@/    .@@@@@@@  ,@@@@@@@  ,@@@@@@@  ,@@%               
            @@@     @@@@@   #@@@@.  *  .@@@@@@@  ,@@@@@@@  ,@@@@@@@  ,@@%  %@@@@@@%     
            @@@     @@@@@@@       /@@  .@@@@@@@  ,@@@@@@@  ,@@@@@@@  ,@@%  %@@@@@@%     
            .@@%     @@@@@@   @@@@@@@  .@@@@@@@  ,@@@@@@@  ,@@@@@@@  ,@@%  %@@@@@@%     
            &@@,    /@@@@@   @@@@@@@  .@@@@@@@  ,@@@@@@@            ,@@%               
            @@@     ,@@@@   @@@@@@@  .@@@@@@@  ,@@@@@@@  ,@@@@@@@  ,@@@@     #@@/     
            &@@,     @@@   @@@@@@@  .@@@@@@@  ,@@@@@@@  ,@@@@@@@  ,@@#     &@@/      
                (@@@      @   @@@@@@@            ,@@@@@@@  ,@@@@@@@  ,&      @@@        
                @@@/        @@@@@@@  .@@@@@@@  ,@@@@@@@  ,@@@@@@@        @@@%         
                    @@@#       @@@@@@  .@@@@@@@  ,@@@@@@@  ,@@@@@&       @@@&           
                    @@@@        ,@@  .@@@@@@@  ,@@@@@@@  ,@@        /@@@#             
                        .@@@@,          .%@@@@@  ,@@@@@/           &@@@@                
                            @@@@@#                             &@@@@%                   
                                &@@@@@@@(              ,&@@@@@@@*                       
                                    ,&@@@@@@@@@@@@@@@@@%                              
                                                                                
            Jesteś niehobbitem. Mieszkasz w nie-Shire, dokładniej w swojej nienorce wybudowanej przez twoich rodziców. Prowadzisz spokojne, sielankowe życie. Tak przynajmniej było do dnia, kiedy do twojej nienorki zawitał nieczarodziej.
            """,
            _options: [
                Option(_prompt: "Kontynuuj", _leadTo: "7")
            ]),
        "7" : Paragraph(
            _prompt: """
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@((((((((((((@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%((((((((((/@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(((((((((((@@@@@@@@,,,@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@((((((((((((@@@@@@%,,@,@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//((((((((((((((@@@@@@@**@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@    %###############     .@@,@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@   ######@@@%&&&&&        @@,@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ #%####@@@@&@@&&@@  .@@@@@*@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@......####@@@@@@@@@@@***@@*..##%@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@****.......@.@@@@@@@@@*********.@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@********.......@@@@@@@@@********,@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@*************,,&*@*****%********,@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@*************  ********(,*******,@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@.,********(((  *********@#******,@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@..../(((((((,  *********@@@@****,@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@...,((((((((   *********@@@@@@@@,@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@.../((((((((   *********@@@@@@@@,@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@.......******************@@@@@@@,@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@.......********************@@@@@,@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            Siedziałeś akurat w ogrodzie. Nieczarodziej podszedł do twojej furtki.
            """,
            _options: [
                Option(_prompt: "Przywitaj się", _leadTo: "8"),
                Option(_prompt: "Przyglądaj się przybyszowi", _leadTo: "11")
            ]),
        "8" : Paragraph(
            _prompt: """
            ‘Dzień dobry!’ - powiedziałeś. \n‘Dzień dobry’ - odpowiedział nieczarodziej - ‘Zawędrowałem w te strony, bo mam nadzieję znaleźć kogoś żądnego przygód. Szukam chętnych na wyprawę.’
            """,
            _options: [
                Option(_prompt: "Wyraź zainteresowanie przygodą", _leadTo: "9"),
                Option(_prompt: "Odmów wzięcia udziału w przygodzie", _leadTo: "10")
            ]),
        "9" : Paragraph(
            _prompt: """
            Od jakiegoś czasu miałeś już ochotę na jakąś przerwie w rutynie. Życie w nie-Shire było przyjemne i spokojne, ale czasami aż zbyt spokojne. \n‘Jestem zainteresowany’ - odrzekłeś - ‘Może wpadniesz do mnie w czwartek na podwieczorek żeby omówić szczegóły?’ \n‘W takim razie widzimy się w czwartek’ - odpowiedział nieczarodziej. W następnym mgnieniu oka nie było go już nigdzie w pobliżu. 
            """,
            _options: [
                Option(_prompt: "Kontynuuj", _leadTo: "12")
            ]),
        "10" : Paragraph(
            _prompt: """
            ‘Nie jestem zainteresowany’ - odrzekłeś - ‘Ale może wpadniesz do mnie w czwartek na podwieczorek? Dawno już nikogo nie gościłem.’ \n‘W takim razie widzimy się w czwartek’ - odpowiedział nieczarodziej. W następnym mgnieniu oka nie było go już nigdzie w pobliżu. 
            """,
            _options: [
                Option(_prompt: "Kontynuuj", _leadTo: "12")
            ]),
        "11" : Paragraph(
            _prompt: """
            ‘Od kiedy to niehobbit nie jest wystarczająco dobrze wychowany, żeby przywitać gościa?’ - złajał cię nieczarodziej. Na szczęście zaraz skończył niezręczną sytuację. \n‘Zawędrowałem w te strony, bo mam nadzieję znaleźć kogoś żądnego przygód. Szukam chętnych na wyprawę.’
            """,
            _options: [
                Option(_prompt: "Wyraź zainteresowanie przygodą", _leadTo: "9"),
                Option(_prompt: "Odmów wzięcia udziału w przygodzie", _leadTo: "10")
            ]),
        "12" : Paragraph(
            _prompt: """
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&      .&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    @(       #@    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@&  #    .@*     /@    .*  @@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@&  #  *                ,   @  @@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@  @  @                     %  @  @@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@  @  /       @       @       &  @  @@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@ /  @      @           &      @    @@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@, @  @*     /                 #@  & %@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@&@          %           ,          #@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@        @     &         (     @        @@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@       @  @                     @  @       @@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@      *@  .   @                 @  .  *@       @@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@      @@@@@   @    @.       ,@    @  ,@@@@@      @@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@      @@@@@@@@@    @*         (@   .@@@@@@@@@      @@@@@@@@@@@@@@
            @@@@@@@@@@@@@@      @@@@@@@@@@@@@@@(         &@@@@@@@@@@@@@@@      @@@@@@@@@@@@@
            @@@@@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      @@@@@@@@@@@@@
            @@@@@@@@@@@@@%      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      @@@@@@@@@@@@@
            @@@@@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      @@@@@@@@@@@@@
            @@@@@@@@@@@@@@       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@
            @@@@@@@@@@@@@@@       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@        @@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@         @@@@@@@@@@@@@@@@@@@@@@@@@@@@@         @@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@          .@@@@            (@@@@           @@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@               #@@@@@@@/               @@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@                                 @@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@*                       (@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@. (@@(.   .(@@/ (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    .@@&     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#   %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            Nadszedł czwartek. O zaplanowanym podwieczorku przypomniałeś sobie dopiero wtedy, kiedy zabrzmiał dzwonek u drzwi. Szybko nastawiłeś wodę na herbatę, wyciągnąłeś ze spiżarni kilka ciastek i pobiegłeś otworzyć.
            """,
            _options: [
                Option(_prompt: "Kontynuuj", _leadTo: "13")
            ]),
        "13" : Paragraph(
            _prompt: """
                                                                                                                                                    
                                     ############(                              
                                 #####################                          
                               ###########      ########                        
                             (#################    #######                      
                            /####################,  #######                     
                                                     #######                    
                          ((((((((((((((((((((((((((   #####/                   
                    &*                                   ####                   
                   #&&&&&,   &&&&&&&&&&&&&&&&&&&&    &&&   ###                  
                             &&&&&&&&&&&&&&&&&&&&                               
                             &&&&&&&&&&&&&&&&&&&&                               
                             &&&&&&&&&&&&&&&&&&&&                               
                              &&&&          .&&&                                
                                  .#########                                    
                             #   ############   ##                              
                            ###      ####      ###                              
                        &&  ########      (#######   &,                         
                      &&&&    ##################/   (&&&                        
                     &&&&  #%    ############(   .%   &&&%                      
                    &&&&  (%%%%%     ####,    (%%%%%  *&&&(                     
                   &&&&   %%%%%%%%          %%%%%%%%%  &&&&                     
                   &&&%  %%%%%%%%%   &&&&&  %%%%%%%%%   &&&                     
                    &&   %%%%%%%%%   &&&&&  %%%%%%%%%%  &&                      
                        (%%%%%%%%%   &&&&&  %%%%%%%%%%                          
                               %%%   &&&&&  %%%/                                
                        ######*                 ######                          
                              #####   ((   #####,                               
                      %&&&&&&/                   &&&&&&&                        
                           /&&&&&&&&&&&&&&&&&&&&&&&                             
                                                                                
            Ku twojemu najszczerszemu zdziwieniu za drzwiami stał nie nieczarodziej, a niekrasnolud. Mijając osłupiałego gospodarza władował się przez próg i zawiesił kaptur na wieszaku. \n‘nie-Dwalin, do usług’ - gość przywitał się, grzecznie się kłaniając \nNie byłeś pewien jak zareagować, więc również się przywitałeś. Następnie gość skierował się ku jadalni. Mimo, że nie spodziewałeś się takiego gośćia, to zasady gościnności nakazywały ci przyjąć go godnie.
            """,
            _options: [
                Option(_prompt: "Kontynuuj", _leadTo: "14")
            ]),
        "14" : Paragraph(
            _prompt: """
            Po połowie filiżanki herbaty i paru minutach niezobowiązującej rozmowy dzwonek u drzwi wybrzmiał ponownie. \n‘Jesteś wreszcie!’ - powiedziałeś pewny, że tym razem za drzwiami będzie już stał nieczarodziej. Jakież było twoje zdziwienie, gdy w progu ukazał się następny niekrasnolud. \n‘Zaczynają się, jak widzę, schodzić. nie-Balin, do usług’ - ukłonił się. \nSłowa o schodzeniu się wzbudziły twój niepokój, jednak również się ukłoniłeś i poprowadziłeś gościa do jadalni.
            """,
            _options: [
                Option(_prompt: "Kontynuuj", _leadTo: "15")
            ]),
        "15" : Paragraph(
            _prompt: """
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#/.  .*(%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@                            *@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@%                .*(((*                 @@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@          #@@@@@@@@@@@@@@@@@@@@@@@@@,          @@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@%        #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,        @@@@@@@@@@@@@
            @@@@@@@@@@@       .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       (@@@@@@@@@@
            @@@@@@@@@       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      ,@@@@@@@@
            @@@@@@@.     *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      /@@@@@@
            @@@@@%     .@@@@@@@@@@@@@/ (@@  @@@/#@@@@@@@@@(   *@@@@@@@@@@@@@@@@@@      @@@@@
            @@@@.     @@@@@@@@@@@@@@@   @@  @@(  @@@@@@@          @@@@@@@@@@@@@@@@%     %@@@
            @@@      @@@@@@@@@@@@@@@@   @&  @@(  @@@@@&            @@@@@@@@@@@@@@@@@     (@@
            @@,     @@@@@@@@@@@@@@@@@   @&  @@*  @@@@@             .@@@@@@@@@@@@@@@@@     %@
            @#     @@@@@@@@@@@@@@@@@&   &,  *&   @@@@&              @@@@@@@@@@@@@@@@@@     @
            @     @@@@@@@@@@@@@@@@@@%            @@@@@              @@@@@@@@@@@@@@@@@@*    .
            @     @@@@@@@@@@@@@@@@@@@           .@@@@@/            %@@@@@@@@@@@@@@@@@@@     
            *    ,@@@@@@@@@@@@@@@@@@@@&        @@@@@@@@%          @@@@@@@@@@@@@@@@@@@@@     
                (@@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@@@@@@@     &@@@@@@@@@@@@@@@@@@@@@@@     
            /    .@@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@@@@@@@     @@@@@@@@@@@@@@@@@@@@@@@@     
            @     @@@@@@@@@@@@@@@@@@@@@@&    @@@@@@@@@@@@@     @@@@@@@@@@@@@@@@@@@@@@@@     
            @     &@@@@@@@@@@@@@@@@@@@@@#    &@@@@@@@@@@@@     @@@@@@@@@@@@@@@@@@@@@@@.    ,
            @&     @@@@@@@@@@@@@@@@@@@@@*    &@@@@@@@@@@@@     @@@@@@@@@@@@@@@@@@@@@@%     @
            @@*     @@@@@@@@@@@@@@@@@@@@,    %@@@@@@@@@@@@.    &@@@@@@@@@@@@@@@@@@@@@     &@
            @@@,     @@@@@@@@@@@@@@@@@@@.    #@@@@@@@@@@@@.    %@@@@@@@@@@@@@@@@@@@&     %@@
            @@@@(     &@@@@@@@@@@@@@@@@@.    /@@@@@@@@@@@@.    #@@@@@@@@@@@@@@@@@@,     &@@@
            @@@@@@      @@@@@@@@@@@@@@@@@,  %@@@@@@@@@@@@@@(  &@@@@@@@@@@@@@@@@@&      @@@@@
            @@@@@@@,      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      &@@@@@@
            @@@@@@@@@.      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@/      #@@@@@@@@
            @@@@@@@@@@@/       &@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(       @@@@@@@@@@@
            @@@@@@@@@@@@@@         @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&        /@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@.          %@@@@@@@@@@@@@@@@@@@@@@@(          %@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@,                                     %@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@&                          ,@@@@@@@@@@@@@@@@@@@@@@@@@@

            Znając obowiązki wynikające z gościnności, postanowiłeś zaproponować gościom coś do jedzenia i picia.
            """,
            _options: [
                Option(_prompt: "Zaproponuj ciasto", _leadTo: "16"),
                Option(_prompt: "Zaproponuj placki", _leadTo: "16"),
                Option(_prompt: "Zaproponuj piwo", _leadTo: "17")
            ]),
        "16" : Paragraph(
            _prompt: """
            Zaproponowałeś przekąskę do herbaty. Niekrasnoludy przyjęły to dosyć entuzjastycznie, zapytały jednak, czy nie znalazłoby się coś do picia. Przytaknąłeś i udałeś się do spiżarni.
            """,
            _options: [
                Option(_prompt: "Idź do spiżarni", _leadTo: "18")
            ]),
        "17" : Paragraph(
            _prompt: """
            Zaproponowałeś piwo. Niekrasnoludy ucieszyły się - jest ogólnie znanym faktem, że piwo to ulubiony napój tej rasy. \n‘Przydałoby się też coś do przekąszenia’ - zauważył nie-Balin \n‘Nie wzgardzilibyśmy kawałkiem ciasta, albo plackiem z kminkiem’ \nPrzytaknąłeś i skierowałeś się do spiżarni.
            """,
            _options: [
                Option(_prompt: "Idź do spiżarni", _leadTo: "18")
            ]),
        "18" : Paragraph(
            _prompt: """
            W spiżarni znalazłeś piwo, ciasto oraz placki z kminkiem. Kiedy już miałeś zanieść wszystko do jadalni, u drzwi znowu rozbrzmiał dzwonek.
            """,
            _options: [
                Option(_prompt: "Idź najpierw do jadalni", _leadTo: "19"),
                Option(_prompt: "Idź najpierw do drzwi", _leadTo: "20")
            ]),
        "19" : Paragraph(
            _prompt: """
            Skierowałeś się do jadalni, jednak w pośpiechu potknąłeś się. Spadając, zdołałeś złapać beczułkę piwa, jednak talerz z plackami rozbił się na podłodze. Niekrasnoludy przy stole nie były tym faktem zachwycone, jednak grzecznie podziękowały za piwo i ciasto.
            """,
            _options: [
                Option(_prompt: "Idź do drzwi", _leadTo: "20")
            ]),
        "20" : Paragraph(
            _prompt: """
            Skierowałeś się ku drzwiom. Dzwonek rozbrzękiwał się bardziej z każdą chwilą. Kiedy dotarłeś do drzwi i je otworzyłeś, do sieni wsypało się jedenastu niekrasnoludów, a nieczarodziej stał za nimi z zadowoloną miną. \n‘Nikogo nie brakuje’ - stwierdził, patrząc na dwa kaptury wiszące już na wieszaku i jedenaście, na głowach leżących na podłodze powywracanych niekrasnoludów.
            """,
            _options: [
                Option(_prompt: "Spytaj, co to wszystko znaczy", _leadTo: "21"),
                Option(_prompt: "Zaproś towarzystwo do jadalni", _leadTo: "22")
            ]),
        "21" : Paragraph(
            _prompt: """
            ‘Co robi trzynastu niekrasnoludów w moim domu?’ - spytałeś nieczarodzieja \nNieczarodziej uśmiechnął się jedynie. \n‘Wyruszamy na wyprawę, a ty jesteś naszym włamywaczem’ - odpowiedział ten niekrasnolud, który przedstawił się wcześniej jako nie-Thorin. Był on przywódcą grupy - ‘Planujemy odzyskać kosztowności zrabowane nam niegdyś przez smoka. Ale porozmawiamy później, nie godzi się mówić o interesach na pusty żołądek!’
            """,
            _options: [
                Option(_prompt: "Zaproś towarzystwo do jadalni", _leadTo: "22")
            ]),
        "22" : Paragraph(
            _prompt: """
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@% &&&&&&&&. @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@   &&&&&&&&&&&&&@*@@@@@@@@@@@@@@@,((( @@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@&&&&&&&&&&&&&&& @@@@@@@@@@@@@@@@@%&&%@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@&%&&&&&&&&&&&@ @@@@@@@@@@@@@@@@@@@ &&& @@,&&&&&@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@ %&&&&&&&&&&,@@@@@@@@@@@&@@@@@@@,&&&&&&&  ((((,@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@ %&&&&&&&&&&@@@@@@@ ####@,&&@@@@.((((((( @.((/ @@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@.%&&&&&& @@(((((((######.@@@@@@.((((((/ @@,&@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@ %%&& @@@(((((( ###### @@@@@@@         @@@ @@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@* @@@@@(((((((.(((//*@@@@@@@,&&&&&&& @@@ @@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@%##%%%%%%%%%%%%%%%%%%%%%%%%*#&&&&&&%@@/ &.&@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@                                                *@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            W jadalni rozpoczęła się pełnoprawna uczta. Wszyscy cieszyli się, jedli i pili. Niektórzy wyciągnęli instrumenty, w pomieszczeniu rozbrzmiała muzyka. Niestety, zabawa produkowała wiele śmieci i brudnych naczyń, a ty przestałeś wyrabiać z obsługą czternastu, licząc z nieczarodziejem, osób.
            """,
            _options: [
                Option(_prompt: "Narzekaj głośno na brak pomocy", _leadTo: "23"),
                Option(_prompt: "Próbuj sam sobie poradzić", _leadTo: "24")
            ]),
        "23" : Paragraph(
            _prompt: """
            ‘Do licha z tymi niekrasnoludami, nie mógłby się który ruszyć i pomóc trochę?’ - powiedziałeś głośno. \nNieczarodziej spojrzawszy na ciebie głośno gwizdnął i krzyknął na niekrasnoludy \n‘Ruszyć się, migiem! Panu niehobbitowi trzeba pomóc!’
            """,
            _options: [
                Option(_prompt: "Kontynuuj", _leadTo: "25")
            ]),
        "24" : Paragraph(
            _prompt: """
            Nieczarodziej, widząc twoje nieudolne zmagania z naczyniami głośno gwizdnął i krzyknął na niekrasnoludy \n‘Ruszyć się, migiem! Panu niehobbitowi trzeba pomóc!’
            """,
            _options: [
                Option(_prompt: "Kontynuuj", _leadTo: "25")
            ]),
        "25" : Paragraph(
            _prompt: """
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@&,@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@,/@,,@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@,*@@@,,@@@@,,,,@,,,@@@,,,@@@@@@@
            @@@@@@,,,*#@,,,@@@@@@@@@,@@@@@@@@@@@,@@@@@
            @@@@@@*%,,@@@@&*,,*,,*,,@@@@@,,,@@@@@,%@@@
            @@@@@,@&@@@*,@@@@@*,,@@@@@,@/,@,@@,@@,(@@@
            @@@@,@@@@@,@@@@@(,@@@@@@@@*@(,@*&@,@#,@@@@
            @@@@,@@@@,(@@@@@,@@@@@@@@@*@(,@,#@*@#,@@@@
            @@@@*@@@@*,@@@@@,@@@,@,,@@,@@@@@@@*@#,@@@@
            @@@@,#@@@@,#@@@@@,*@@,@@@*,@@@@@@@@@#,@@@@
            @@@@@,/@@@@@**@@@@@#*,,,@@@@@@@@@@@@#,@@@@
            @@@@@@@,@@@@@@@&,,,*,/@@*,@@@@@@@@@@,@@@@@
            @@@@@@@@@,*@@@@@@@@@@@@@@@,,#@@@@@%,@@@@@@
            @@@@@@@@@@@@@,,**,,,,**,@@@/,@@@@@%,@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@/,@@@@@&,@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            Niekrasnoludy rzuciły się do pomocy, jednak intensywność ich starań sprawiła, że zacząłeś martwić się o swoje naczynia. Twoje krzyki, mające zatrzymać niekrasnoludy od tak gwałtownego traktowania twojej własności spowodowały tylko większe rozbawienie gawiedzi.
            """,
            _options: [
                Option(_prompt: "Płacz w kąciku nad losem swoich naczyń", _leadTo: "26")
            ]),
        "26" : Paragraph(
            _prompt: """
            Po podwieczorku, czy już raczej kolacji, niekrasnoludy, nieczarodziej i niehobbit zasiedli w salonie. Nie-Thorin zaczął snuć historię o dawnych dniach.
            """,
            _options: [
                Option(_prompt: "Posłuchaj historii nie-Thorina", _leadTo: "27")
            ]),
        "27" : Paragraph(
            _prompt: """
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@ ./@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@%. ..&@@@@@@@@@@@@@@@@@@@@@@@@@@@% ..... &@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@. @%..../@@@@@@@@@@@@@@@@@@@@*...,..,@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@(.../@@@@@@@(..(@@@@@@@@@@@@@@...%@#..@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@*..@@@@@@ .. &@@&..@@@@@@@@@@,..%@@@@*......(@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@*..@@@@# ./@@(.,@@/.#@@@@@@@ .,@@@@@@@@@@@. @@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@&../@@&/. %@@@@@*.*@@ .@@@@@@..(@@@@@@@@@@@@@ ......  /&@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@##%@@@%, ...*@@&..@@@@@ .#@@@@@@@@@@@@@@@@@@@&#((((....#@@@@@@@@@@@
            @@@@@@@@@@@@@@@/...#@@@@@,...@@@@@..,@@@@@@@@@@@@@@@@ ..*#@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@ .*@@@@@@@. &@@@@@@&. @@@@@@@@@@@@@@@@@@ .(@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@..*@@@@@@@@@*...#@@@ ./@@@@@@@@@@@@@@....,,, ,@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@,.#@@@@@@@@@@@@@@@%(*.@@@@@@@@@@&......%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@. @@@@@@@@@@@@@@@@@@@@@@@@@@@@/... *%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@&. @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&/. ... *%@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@ .#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%* .. *@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@%..%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&,...&@@@@@@@@@@@@@
            @@@@@@@@@@@@@@ . @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@...@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@ . @@@@@@@@@@@@@@@@@@@@@@@@@*......    .....%@@@@@@,.(@@@@@@@@@
            @@@@@@@@@@@@@@@@@@..@@ .. ..... ......../@@/.(@@@@@@@@@@@@@@@/..@@@@@. @@@@@@@@@
            @@@@@@@@@@@@@@@@@..,@@..@@@@@@@@@@@@* ..@@@(./@@@@@@@@@@@@@@@...@@@@ .@@@@@@@@@@
            @@@@@@@@@@@@@,../&@@@@..@@@@@@@@@&..%@@@@@@%.*@@@@@@@@@@@@...%@@@@..,@@@@@@@@@@@
            @@@@@@@@@@@@(          /@@@@@@@@@,           #@@@@@@@@@@(. @@@@...&@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,.&@@#..@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@/.., .@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@/ .@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            ‘Dawno temu, wszystkie niekrasnoludy szczęśliwie żyły w górach. Po latach dobrobytu ich bogactwem zainteresował się jednak niesmok. Zaatakował miasto niekrasnoludów, obracając je w pył i zabijając większość mieszkańców. Od tego czasu mieszka on w ruinach, ciesząc oczy widokiem wszystkich skradzionych niekrasnoludom skarbów.’
            """,
            _options: [
                Option(_prompt: "Kontynuuj", _leadTo: "28")
            ]),
        "28" : Paragraph(
            _prompt: """
            ‘W związku z tym’ - kontynuował nie-Thorin ‘postanowiliśmy odbić naszą ojczyznę i zabić niesmoka, żeby odzyskać nasz skarb. A w tym celu potrzebujemy pana, panie niehobbicie, w naszej kompanii. Będzie nam pan pomocny we wkradnięciu się do leża smoka.’
            """,
            _options: [
                Option(_prompt: "Zgódź się na dołączenie do wyprawy", _leadTo: "29"),
                Option(_prompt: "Odmów dołączenia do wyprawy", _leadTo: "31")
            ]),
        "29" : Paragraph(
            _prompt: """
            ‘Szanowni panowie’ - odpowiedziałeś - ‘już od dawna brakuje mi w życiu przygód. Z radością dołączę więc do waszej radosnej kompanii, licząc oczywiście na sowite wynagrodzenie.’ \n‘O to się nie martw’ - odrzekł nie-Thorin - ‘w takim razie wyruszamy jutro rano’
            """,
            _options: [
                Option(_prompt: "Kontynuuj", _leadTo: "30")
            ]),
        "30" : Paragraph(
            _prompt: """
            Byłeś lekko wybity z rytmu tak rychłym terminem podróży, jednak przeważyła ekscytacja perspektywą przygody. Resztę wieczoru towarzystwo spędziło na zabawach i śpiewach. W końcu poszedłeś spać, ciekawy, co przyniesie jutro.
            """,
            _options: [
                Option(_prompt: "Zakończ testowanie gry", _leadTo: "33")
            ]),
        "31" : Paragraph(
            _prompt: """
            ‘Szanowni panowie’ - odpowiedziałeś - ‘bardzo miło było mi gościć was na podwieczorku, ale na żadną przygodę się nie piszę. Jest mi dobrze tutaj, w nie-Shire i nigdzie się nie wybieram. Dziękuję za odwiedziny i zacną propozycję, ale muszę odmówić.’
            """,
            _options: [
                Option(_prompt: "Kontynuuj", _leadTo: "32")
            ]),
        "32" : Paragraph(
            _prompt: """
            Niekrasnoludy były rozczarowane twoją decyzją, ale jakoś ją przyjęły. Reszta wieczoru upłynęła na rozmowach i cichych śpiewach. Poszedłeś spać przekonany, że udało ci się wymigać od przygody - tak było przynajmniej do czasu, kiedy rano znalazłeś list na kominku…
            """,
            _options: [
                Option(_prompt: "Zakończ testowanie gry", _leadTo: "33")
            ]),
        "33" : Paragraph(
            _prompt: """
            To był już koniec fabuły twojej gry paragrafowej. Byłeś zadowolony z testów i postanowiłeś pójść spać. Niestety, zapomniałeś wysłać ją na maila nauczyciela.
            """,
            _options: [
                Option(_prompt: "Idź do szkoły", _leadTo: "34")
            ]),
        "34" : Paragraph(
            _prompt: """
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@#       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@&         /@@@@@@@@@@@@@@@@@@@@@@%   &@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@            @@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@.             %@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@#                @@@@@@@@@@@@@@@@@@@&       @@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@         /        &@@@@@@@@@@@@@@@@@@&       @@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@/         @@&        @@@@@@@@%(((//**,.                   *&@
            @@@@@@@@@@@@@@@@@@         %@@@@        %@@@@@                                  
            @@@@@@@@@@@@@@@@(         @@@@@@@        @@@@@                                  
            @@@@@@@@@@@@@@@         %@@@@@@@@.       #@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@
            @@@@@@@@@@@@@#        .@@@@@@@@@@@        @@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@
            @@@@@@@@@@@@         @@@@@@@@@@&/*        (@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@
            @@@@@@@@@@@        ./.                     @@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@
            @@@@@@@@*                                  /@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@
            @@@@@@                                      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@                  *#&@@@@@@@@@(       *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@        ,@@@@@@@@@@@@@@@@@@@@@@        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@#        *@@@@@@@@@@@@@@@@@@@@@@@*       ,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@*        /@@@@@@@@@@@@@@@@@@@@@@@@@        *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@,        %@@@@@@@@@@@@@@@@@@@@@@@@@@#        /@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @.        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@.        %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            /        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            Rano poszedłeś do szkoły. Mimo tego, że zapomniałeś wysłać pracę na maila, pan Mendela był bardzo zadowolony z twojej gry i ocenił ją na maksymalną ilość punktów. Pisanie fabuły sprawiło, że nie wyspałeś się zbyt dobrze, ale przynajmniej dostałeś dobrą ocenę.
            """,
            _options: [
                Option(_prompt: "Koniec gry", _leadTo: "-10")
            ]),
        "35" : Paragraph(
            _prompt: """
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@#       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@&         /@@@@@@@@@@@@@@@@@@@@@@%   &@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@            @@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@.             %@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@#                @@@@@@@@@@@@@@@@@@@&       @@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@         /        &@@@@@@@@@@@@@@@@@@&       @@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@/         @@&        @@@@@@@@%(((//**,.                   *&@
            @@@@@@@@@@@@@@@@@@         %@@@@        %@@@@@                                  
            @@@@@@@@@@@@@@@@(         @@@@@@@        @@@@@                                  
            @@@@@@@@@@@@@@@         %@@@@@@@@.       #@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@
            @@@@@@@@@@@@@#        .@@@@@@@@@@@        @@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@
            @@@@@@@@@@@@         @@@@@@@@@@&/*        (@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@
            @@@@@@@@@@@        ./.                     @@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@
            @@@@@@@@*                                  /@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@
            @@@@@@                                      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@                  *#&@@@@@@@@@(       *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@        ,@@@@@@@@@@@@@@@@@@@@@@        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@#        *@@@@@@@@@@@@@@@@@@@@@@@*       ,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@*        /@@@@@@@@@@@@@@@@@@@@@@@@@        *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@,        %@@@@@@@@@@@@@@@@@@@@@@@@@@#        /@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @.        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@.        %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            /        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            Rano poszedłeś do szkoły. Nie miałeś gotowej gry, jednak okazało się, że sam silnik to wystarczająco i twoja praca dostała maksymalną ilość punktów. Udało ci się wyspać oraz dostać dobrą ocenę
            """,
            _options: [
                Option(_prompt: "Koniec gry", _leadTo: "-10")
            ]),
        "-10" : Paragraph(
            _prompt: """
            Koniec gry! Dziękuję za granie.
            """,
            _options: []),
    ];

//Goddamn code itself lmao
var current = "0";

//Until the story is not finished (assumption: only the last paragraph has no options)
while story[current]!.options.count != 0{
    //Print the prompt and the options
    for c in story[current]!.prompt{
        print(c, terminator: "");
        if(c.isLetter || c.isNumber){
            _sleep(30);
        }
    }
    print(" ");
    // print(story[current]!.prompt);
    var i = 0;
    for a in story[current]!.options{
        i += 1;
        print(String(i) + ". " + a.prompt);
    }
    // print("\n");
    //Read the answer
    var answer = readLine() ?? "1";
    if(answer == ""){
        answer = "1";
    }
    if(Int(answer) ?? 999 > story[current]!.options.count){
        answer = "1";
    }
    //Apply the answer
    current = story[current]!.options[(Int(answer) ?? 1) - 1].leadTo;
}
//Print the prompt of the last paragraph
print(story[current]!.prompt);
