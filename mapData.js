// mapData.js

export const cityProfiles = {
    "manchester": {
        name: "Greater Manchester",
        center: [53.4808, -2.2426],
        defaultZoom: 11,
        boundingBox: "53.30,-2.75,53.68,-1.90",
        
        overpassQuery: `node["railway"~"station|tram_stop"]({{bbox}}); way["railway"~"rail|tram|light_rail"]({{bbox}}); relation["type"="route"]["route"~"tram|light_rail"]({{bbox}});`,
 
        boroughs: { 
            "Bolton": ["Blackrod","Bolton","Bromley Cross","Farnworth","Horwich Parkway","Kearsley","Lostock","Moses Gate","Westhoughton"], 
            "Bury": ["Besses o' th' Barn","Bury Interchange","Heaton Park","Prestwich","Radcliffe","Whitefield"], 
            "Manchester": ["Abraham Moss","Baguley","Barlow Moor Road","Benchill","Bowker Vale","Burton Road","Central Park","Chorlton","Clayton Hall","Cornbrook","Crossacres","Crumpsall","Deansgate-Castlefield","Didsbury Village","East Didsbury","Etihad Campus","Exchange Square","Holt Town","New Islington","Newton Heath and Moston","Northern Moor","Peel Hall","Piccadilly","Piccadilly Gardens","Queens Road","Robinswood Road","Roundthorn","Shadowmoss","Shudehill","St. Peter's Square","St Werburgh's Road","Velopark","Victoria","West Didsbury","Withington","Wythenshawe Park","Wythenshawe Town Centre", "Ardwick","Ashburys","Belle Vue","Burnage","Deansgate","Gorton","Levenshulme","Manchester Oxford Road","Mauldeth Road","Moston","Ryder Brow"], 
            "Oldham": ["Derker","Failsworth","Freehold","Hollinwood","Oldham Central","Oldham King Street","Oldham Mumps","Shaw and Crompton","South Chadderton","Westwood","Greenfield","Mills Hill"], 
            "Rochdale": ["Kingsway Business Park","Milnrow","Newbold","Newhey","Rochdale Railway Station","Rochdale Town Centre","Castleton","Littleborough","Rochdale","Smithy Bridge"], 
            "Salford": ["Anchorage","Broadway","Eccles","Exchange Quay","Harbour City","Ladywell","Langworthy","MediaCityUK","Salford Quays","Weaste","Clifton","Irlam","Moorside","Patricroft","Salford Central","Salford Crescent","Swinton","Walkden", "Glazebrook"], 
            "Stockport": ["Bramhall","Bredbury","Brinnington","Cheadle Hulme","Davenport","Gatley","Hazel Grove","Heald Green","Heaton Chapel","Marple","Middlewood","Reddish North","Romiley","Rose Hill Marple","Stockport","Strines","Woodley","Woodsmoor"], 
            "Tameside": ["Ashton Moss","Ashton-under-Lyne","Ashton West","Audenshaw","Cemetery Road","Droylsden","Edge Lane","Broadbottom","Fairfield","Flowery Field","Godley","Guide Bridge","Hattersley","Hyde Central","Hyde North","Mossley","Newton for Hyde","Stalybridge", "Glossop", "Hadfield", "Dinting"], 
            "Trafford": ["Altrincham","Barton Dock Road","Brooklands","Dane Road","Firswood","Imperial War Museum","Navigation Road","Old Trafford","Parkway","Pomona","Sale","Sale Water Park","Stretford","The Trafford Centre","Timperley","Trafford Bar","Village","Wharfside","Chassen Road","Flixton","Hale","Humphrey Park","Trafford Park","Urmston"], 
            "Wigan": ["Atherton","Bryn","Daisy Hill","Gathurst","Hag Fold","Hindley","Ince","Orrell","Pemberton","Wigan North Western","Wigan Wallgate", "Appley Bridge"] 
        },
        zones: { 
            "1": ["Cornbrook", "Deansgate-Castlefield", "Exchange Square", "Market Street", "New Islington", "Piccadilly", "Piccadilly Gardens", "Shudehill", "St. Peter's Square", "Victoria", "Deansgate", "Manchester Oxford Road", "Manchester Piccadilly", "Manchester Victoria"], 
            "2": ["Abraham Moss", "Anchorage", "Barton Dock Road", "Bowker Vale", "Broadway", "Cornbrook", "Crumpsall", "Edge Lane", "Etihad Campus", "Exchange Quay", "Firswood", "Harbour City", "Holt Town", "Imperial War Museum", "Ladywell", "Langworthy", "MediaCityUK", "Monsall", "Newton Heath and Moston", "Old Trafford", "Parkway", "Pomona", "Queens Road", "Salford Quays", "St Werburgh's Road", "Stretford", "The Trafford Centre", "Trafford Bar", "Velopark", "Village", "Weaste", "Wharfside", "Salford Central", "Salford Crescent", "Ardwick", "Ashburys", "Gorton", "Belle Vue", "Ryder Brow", "Levenshulme", "Trafford Park", "Eccles"], 
            "3": ["Ashton Moss", "Ashton West", "Ashton-under-Lyne", "Audenshaw", "Baguley", "Barlow Moor Road", "Besses o' th' Barn", "Bowker Vale", "Brooklands", "Burton Road", "Chorlton", "Clayton Hall", "Derker", "Didsbury Village", "Droylsden", "East Didsbury", "Edge Lane", "Failsworth", "Freehold", "Heaton Park", "Hollinwood", "Martinscroft", "Moor Road", "Newton Heath and Moston", "Northern Moor", "Oldham Central", "Oldham King Street", "Oldham Mumps", "Prestwich", "Roundthorn", "Sale", "Sale Water Park", "South Chadderton", "St Werburgh's Road", "Stretford", "West Didsbury", "Westwood", "Whitefield", "Withington", "Wythenshawe Park", "Moston", "Ashton-under-Lyne", "Fairfield", "Guide Bridge", "Hyde North", "Flowery Field", "Denton", "Hyde Central", "Reddish North", "Reddish South", "Brinnington", "Woodley", "Bredbury", "Heaton Chapel", "Mauldeth Road", "Burnage", "East Didsbury", "Urmston", "Humphrey Park", "Patricroft", "Moorside", "Swinton", "Clifton"], 
            "4": ["Manchester Airport", "Altrincham", "Benchill", "Brooklands", "Bury", "Crossacres", "Derker", "Kingsway Business Park", "Milnrow", "Navigation Road", "Newbold", "Newhey", "Peel Hall", "Radcliffe", "Robinswood Road", "Rochdale Railway Station", "Rochdale Town Centre", "Roundthorn", "Shadowmoss", "Shaw and Crompton", "Timperley", "Whitefield", "Wythenshawe Town Centre"] 
        },
        stationAliases: {"trafford palazzo":"barton dock road", "deansgate-castlefield ( deansgate)":"deansgate-castlefield"},
        blacklistedStops: ["Lakeside", "Whitegate", "Tram Museum", "Middleton Road"],
      
     allowedRail: [
            "Altrincham", "Appley Bridge", "Ardwick", "Ashburys", "Ashton-under-Lyne", "Atherton",
            "Belle Vue", "Blackrod", "Bolton", "Bramhall", "Bredbury", "Brinnington", "Broadbottom", "Bromley Cross", "Bryn", "Burnage",
            "Castleton", "Chassen Road", "Cheadle Hulme", "Clifton",
            "Daisy Hill", "Davenport", "Deansgate", "Dinting",
            "East Didsbury", "Eccles",
            "Fairfield", "Farnworth", "Flixton", "Flowery Field",
            "Gatley", "Gathurst", "Glazebrook", "Glossop", "Godley", "Gorton", "Greenfield", "Guide Bridge",
            "Hadfield", "Hag Fold", "Hale", "Hall-i'-th'-Wood", "Hattersley", "Hazel Grove", "Heald Green", "Heaton Chapel", "Hindley", "Horwich Parkway", "Humphrey Park", "Hyde Central", "Hyde North",
            "Ince", "Irlam",
            "Kearsley",
            "Levenshulme", "Littleborough", "Lostock",
            "Manchester Airport", "Manchester Oxford Road", "Manchester Piccadilly", "Manchester Victoria", "Marple", "Mauldeth Road", "Middlewood", "Mills Hill", "Moorside", "Moses Gate", "Mossley", "Moston",
            "Navigation Road", "Newton for Hyde",
            "Orrell",
            "Patricroft", "Pemberton",
            "Reddish North", "Rochdale", "Romiley", "Rose Hill", "Ryder Brow",
            "Salford Central", "Salford Crescent", "Smithy Bridge", "Stalybridge", "Stockport", "Strines", "Swinton",
            "Trafford Park",
            "Urmston",
            "Walkden", "Westhoughton", "Wigan North Western", "Wigan Wallgate", "Woodley", "Woodsmoor"]},
     
    "london": {
        name: "London",
        center: [51.5074, -0.1278],
        defaultZoom: 12,
        boundingBox: "51.28,-0.51,51.69,0.33",
        
overpassQuery: `node["railway"~"station|subway_entrance"]({{bbox}}); way["railway"~"rail|subway|light_rail"]({{bbox}}); relation["type"="route"]["route"~"subway|light_rail"]({{bbox}});`,        
        boroughs: {
            "Camden": ["Euston", "King's Cross St. Pancras", "Camden Town", "Chalk Farm", "Kentish Town"],
            "Islington": ["Angel", "Highbury & Islington", "Archway", "Finsbury Park", "Arsenal"],
            "Westminster": ["Westminster", "Victoria", "Paddington", "Charing Cross", "Oxford Circus", "Green Park"]
        },
zones: {
    "1": [
        "Aldgate", "Aldgate East", "Angel", "Baker Street", "Bank", "Barbican", "Battersea Power Station", "Bayswater", "Blackfriars", "Bond Street", "Borough", "Cannon Street", "Chancery Lane", "Charing Cross", "City Thameslink", "Covent Garden", "Earls Court", "Edgware Road (Bakerloo)", "Edgware Road (Circle/District/Hammersmith and City)", "Elephant and Castle", "Embankment", "Euston", "Euston Square", "Farringdon", "Fenchurch Street", "Gloucester Road", "Goodge Street", "Great Portland Street", "Green Park", "High Street Kensington", "Holborn", "Hoxton", "Hyde Park Corner", "King's Cross", "Kings Cross St. Pancras", "Knightsbridge", "Lambeth North", "Lancaster Gate", "Leicester Square", "Liverpool Street", "London Bridge", "Mansion House", "Marble Arch", "Marylebone", "Monument", "Moorgate", "Nine Elms", "Notting Hill Gate", "Old Street", "Oxford Circus", "Paddington", "Piccadilly Circus", "Pimlico", "Queensway", "Regents Park", "Russell Square", "Shoreditch High Street", "Sloane Square", "South Kensington", "Southwark", "St Pancras", "St. James's Park", "St. Johns Wood", "St. Pauls", "Temple", "Tottenham Court Road", "Tower Gateway", "Tower Hill", "Vauxhall", "Victoria", "Warren Street", "Waterloo", "Waterloo East", "Westminster"
    ],
    "2": [
        "Acton Central", "All Saints", "Archway", "Arsenal", "Barons Court", "Battersea Park", "Belsize Park", "Bermondsey", "Bethnal Green", "Bethnal Green Rail", "Blackwall", "Bow Church", "Bow Road", "Brixton", "Brockley", "Bromley-by-Bow", "Brondesbury", "Brondesbury Park", "Caledonian Road", "Caledonian Road and Barnsbury", "Cambridge Heath", "Camden Road", "Camden Town", "Canada Water", "Canary Wharf", "Canonbury", "Chalk Farm", "Clapham Common", "Clapham High Street", "Clapham Junction", "Clapham North", "Clapham South", "Clapton", "Crossharbour and London Arena", "Cutty Sark for Maritime Greenwich", "Dalston Junction", "Dalston Kingsland", "Denmark Hill", "Deptford", "Deptford Bridge", "Devons Road", "Drayton Park", "Earls Court", "East Acton", "East Dulwich", "East India", "East Putney", "Elephant and Castle", "Elverson Road", "Essex Road", "Finchley Road", "Finchley Road and Frognal", "Finsbury Park", "Fulham Broadway", "Goldhawk Road", "Gospel Oak", "Greenwich", "Hackney Central", "Hackney Downs", "Hackney Wick", "Haggerston", "Hammersmith (District)", "Hammersmith (Met.)", "Hampstead", "Herne Hill", "Heron Quays", "Highbury and Islington", "Holland Park", "Holloway Road", "Homerton", "Hoxton", "Imperial Wharf", "Island Gardens", "Kennington", "Kensal Green", "Kensal Rise", "Kensington (Olympia)", "Kentish Town", "Kentish Town West", "Kilburn", "Kilburn High Road", "Kilburn Park", "Ladbroke Grove", "Langdon Park", "Latimer Road", "Lewisham", "Limehouse", "London Fields", "Loughborough Junction", "Maida Vale", "Manor House", "Mile End", "Mornington Crescent", "Mudchute", "New Cross", "New Cross Gate", "North Acton", "North Dulwich", "North Greenwich", "Notting Hill Gate", "Nunhead", "Oval", "Parsons Green", "Peckham Rye", "Poplar", "Pudding Mill Lane", "Putney", "Putney Bridge", "Queens Park", "Queens Road Peckham", "Queenstown Road", "Ravenscourt Park", "Rectory Road", "Rotherhithe", "Royal Oak", "Shadwell", "Shepherds Bush", "Shepherds Bush Market", "South Bermondsey", "South Hampstead", "South Quay", "St Johns", "Stamford Brook", "Stepney Green", "Stockwell", "Stoke Newington", "Surrey Quays", "Swiss Cottage", "Tufnell Park", "Turnham Green", "Upper Holloway", "Vauxhall", "Wandsworth Road", "Wandsworth Town", "Wapping", "Warwick Avenue", "West Brompton", "West Hampstead", "West Hampstead Thameslink", "West India Quay", "West Kensington", "Westbourne Park", "Westferry", "White City", "Whitechapel", "Willesden Green", "Wood Lane"
    ],
    "3": [
        "Abbey Road", "Acton Main Line", "Acton Town", "Addington Village", "Addiscombe", "Alexandra Palace", "Ampere Way", "Archway", "Arena", "Avenue Road", "Balham", "Barnes", "Barnes Bridge", "Beckenham Road", "Beckton", "Beckton Park", "Beddington Lane", "Belgrave Walk", "Bellingham", "Blackheath", "Blackhorse Lane", "Blackhorse Road", "Bounds Green", "Bowes Park", "Brent Cross", "Brent Cross West", "Bromley-by-Bow", "Bruce Grove", "Canning Town", "Catford", "Catford Bridge", "Centrale", "Charlton", "Chiswick", "Chiswick Park", "Church Street", "Clapham South", "Colliers Wood", "Coombe Lane", "Cricklewood", "Crofton Park", "Crouch Hill", "Crystal Palace", "Custom House", "Cyprus", "Deptford Bridge", "Dollis Hill", "Dundonald Road", "Ealing Broadway", "Ealing Common", "Earlsfield", "East Finchley", "East Ham", "East India", "East Putney", "Elverson Road", "Fieldway", "Forest Gate", "Forest Hill", "Gallions Reach", "George Street", "Gipsy Hill", "Golders Green", "Gravel Hill", "Greenwich", "Gunnersbury", "Hampstead Heath", "Hanger Lane", "Harlesden", "Harringay", "Harringay Green Lanes", "Harrington Road", "Haydons Road", "Hendon", "Hendon Central", "Herne Hill", "Highgate", "Hither Green", "Honor Oak Park", "Hornsey", "Kew Bridge", "Kew Gardens", "Kidbrooke", "King George V", "King Henry's Drive", "Ladywell", "Lea Bridge", "Lebanon Road", "Lee", "Lewisham", "Leyton", "Leyton Midland Road", "Leytonstone", "Leytonstone High Road", "Lloyd Park", "London City Airport", "Manor House", "Manor Park", "Maryland", "Maze Hill", "Merton Park", "Mitcham", "Mitcham Eastfields", "Morden Road", "Mortlake", "Neasden", "New Addington", "Norbury", "North Acton", "North Dulwich", "North Ealing", "North Greenwich", "North Sheen", "Northfields", "Northumberland Park", "Park Royal", "Phipps Bridge", "Plaistow", "Pontoon Dock", "Prince Regent", "Pudding Mill Lane", "Putney", "Reeves Corner", "Royal Albert", "Royal Victoria", "Sandilands", "Seven Sisters", "South Acton", "South Ealing", "South Tottenham", "South Wimbledon", "Southfields", "St James Street", "Stamford Hill", "Star Lane", "Stonebridge Park", "Stratford", "Stratford High Street", "Stratford International", "Streatham", "Streatham Common", "Streatham Hill", "Sydenham", "Sydenham Hill", "Therapia Lane", "Tooting", "Tooting Bec", "Tooting Broadway", "Tottenham Hale", "Tulse Hill", "Turnpike Lane", "Upton Park", "Waddon Marsh", "Walthamstow Central", "Walthamstow Queens Road", "Wandle Park", "Wandsworth Common", "Wanstead Park", "Wellesley Road", "West Acton", "West Dulwich", "West Ealing", "West Ham", "West Norwood", "West Silvertown", "Westcombe Park", "White Hart Lane", "Willesden Green", "Willesden Junction", "Wimbledon", "Wimbledon Chase", "Wimbledon Park", "Wood Green", "Woodgrange Park", "Woodside", "Woolwich Dockyard"
    ],
    "4": [
        "Abbey Wood", "Addington Village", "Addiscombe", "Alperton", "Ampere Way", "Anerley", "Angel Road", "Arena", "Arnos Grove", "Avenue Road", "Barking", "Barking Riverside", "Barkingside", "Beckenham Hill", "Beckenham Junction", "Beckenham Road", "Beddington Lane", "Belgrave Walk", "Birkbeck", "Blackhorse Lane", "Boston Manor", "Bounds Green", "Bowes Park", "Brentford", "Bromley North", "Burnt Oak", "Castle Bar Park", "Centrale", "Chigwell", "Church Street", "Clock House", "Colindale", "Coombe Lane", "Crystal Palace", "Dundonald Road", "East Ham", "Edmonton Green", "Elmers End", "Elmstead Woods", "Eltham", "Fairlop", "Falconwood", "Fieldway", "Finchley Central", "Gants Hill", "George Street", "Goodmayes", "Grange Hill", "Gravel Hill", "Greenford", "Grove Park", "Hackbridge", "Hainault", "Hanwell", "Harrington Road", "Hendon", "Hendon Central", "Hounslow Central", "Hounslow East", "Ilford", "Isleworth", "Kenton", "Kent House", "Kew Gardens", "King Henry's Drive", "Kingsbury", "Lebanon Road", "Leytonstone", "Lloyd Park", "Lower Sydenham", "Malden Manor", "Manor Park", "Meridian Water", "Merton Park", "Mill Hill Broadway", "Mill Hill East", "Mitcham", "Mitcham Junction", "Morden", "Morden Road", "Morden South", "Motspur Park", "Mottingham", "New Addington", "New Beckenham", "New Eltham", "New Malden", "New Southgate", "Newbury Park", "North Wembley", "Northwick Park", "Norwood Junction", "Oakleigh Park", "Osterley", "Palmers Green", "Penge East", "Penge West", "Perivale", "Phipps Bridge", "Plumstead", "Preston Road", "Queensbury", "Ravensbourne", "Raynes Park", "Redbridge", "Reeves Corner", "Richmond", "Roding Valley", "Sandilands", "Selhurst", "Seven Kings", "Shortlands", "Silver Street", "Snaresbrook", "South Greenford", "South Kenton", "South Merton", "South Wimbledon", "South Woodford", "Southall", "Southgate", "St Helier", "St Margarets", "Sudbury and Harrow Road", "Sudbury Hill", "Sudbury Hill Harrow", "Sudbury Town", "Sundridge Park", "Sutton Common", "Syon Lane", "Therapia Lane", "Thornton Heath", "Totteridge and Whetstone", "Upney", "Waddon Marsh", "Walthamstow Central", "Wandle Park", "Wanstead", "Wellesley Road", "Welling", "Wembley Central", "Wembley Park", "Wembley Stadium", "West Finchley", "Winchmore Hill", "Wood Street", "Woodford", "Woodgrange Park", "Woodside", "Woodside Park", "Woolwich", "Woolwich Arsenal", "Worcester Park"
    ],
    "5": [
        "Addington Village", "Addiscombe", "Albany Park", "Ampere Way", "Arena", "Avenue Road", "Beckenham Road", "Becontree", "Beddington Lane", "Belgrave Walk", "Belmont", "Belvedere", "Bexleyheath", "Bickley", "Blackhorse Lane", "Brimsdown", "Bromley South", "Buckhurst Hill", "Bush Hill Park", "Canons Park", "Carshalton", "Carshalton Beeches", "Centrale", "Chadwell Heath", "Cheam", "Chingford", "Chislehurst", "Church Street", "Coombe Lane", "Dagenham Dock", "Dagenham East", "Dagenham Heathway", "Dundonald Road", "East Croydon", "Eastcote", "Eden Park", "Edgware", "Enfield Chase", "Enfield Town", "Fieldway", "George Street", "Gordon Hill", "Grange Park", "Gravel Hill", "Harrington Road", "Harrow and Wealdstone", "Harrow-on-the-Hill", "Hatton Cross", "Hayes", "Hayes and Harlington", "Headstone Lane", "High Barnet", "Hounslow", "Hounslow West", "King Henry's Drive", "Lebanon Road", "Lloyd Park", "Merton Park", "Mitcham", "Morden Road", "New Addington", "New Barnet", "Norbiton", "North Harrow", "Northolt", "Northolt Park", "Oakwood", "Petts Wood", "Phipps Bridge", "Pinner", "Ponders End", "Rayners Lane", "Reeves Corner", "Ruislip Gardens", "Sandilands", "Sidcup", "South Croydon", "South Harrow", "South Ruislip", "Southbury", "Stanmore", "Stoneleigh", "Strawberry Hill", "Sutton", "Therapia Lane", "Tolworth", "Twickenham", "Waddon", "Waddon Marsh", "Wallington", "Wandle Park", "Wellesley Road", "West Croydon", "West Harrow", "West Sutton", "West Wickham", "Whitton", "Woodside"
    ],
    "6": [
        "Addington Village", "Addiscombe", "Ampere Way", "Arena", "Avenue Road", "Banstead", "Barnehurst", "Beckenham Road", "Beddington Lane", "Belgrave Walk", "Bexley", "Blackhorse Lane", "Caterham", "Centrale", "Chelsfield", "Chessington North", "Chessington South", "Chipstead", "Church Street", "Coombe Lane", "Coulsdon South", "Coulsdon Town", "Crayford", "Crews Hill", "Debden", "Dundonald Road", "Elm Park", "Elstree and Borehamwood", "Emerson Park", "Enfield Lock", "Epping", "Epsom Downs", "Erith", "Ewell East", "Ewell West", "Feltham", "Fieldway", "Fulwell", "George Street", "Gidea Park", "Gravel Hill", "Hadley Wood", "Hampton", "Hampton Court", "Hampton Wick", "Harold Wood", "Harrington Road", "Hatch End", "Hatton Cross", "Heathrow Terminal 4", "Heathrow Terminal 5", "Heathrow Terminals 1 2 3", "Hillingdon", "Hornchurch", "Ickenham", "Kenley", "King Henry's Drive", "Kingston", "Kingswood", "Knockholt", "Lebanon Road", "Lloyd Park", "Loughton", "Merton Park", "Mitcham", "Moor Park", "Morden Road", "New Addington", "Northwood", "Northwood Hills", "Orpington", "Phipps Bridge", "Purley", "Purley Oaks", "Rainham", "Reedham", "Reeves Corner", "Riddlesdown", "Romford", "Ruislip", "Ruislip Manor", "Sanderstead", "Sandilands", "Slade Green", "St Mary Cray", "Surbiton", "Tadworth", "Tattenham Corner", "Teddington", "Thames Ditton", "Therapia Lane", "Theydon Bois", "Turkey Street", "Upminster", "Upminster Bridge", "Upper Warlingham", "Uxbridge", "Waddon Marsh", "Wandle Park", "Wellesley Road", "West Drayton", "West Ruislip", "Whyteleafe", "Whyteleafe South", "Woodmansterne", "Woodside"
    ],
    "7": [
        "Carpenders Park", "Chafford Hundred", "Chorleywood", "Croxley", "Moor Park", "Ockendon", "Purfleet", "Rickmansworth", "Theobalds Grove", "Waltham Cross", "Watford"
    ],
    "8": [
        "Bushey", "Chalfont and Latimer", "Cheshunt", "Dartford", "Swanley", "Watford High Street"
    ],
    "9": [
        "Amersham", "Brentwood", "Broxbourne", "Chesham", "Cuffley", "Epsom"
    ],
    "Special": [
        "Burnham", "Iver", "Langley", "Maidenhead", "Reading", "Shenfield", "Slough", "Taplow", "Twyford", "Watford Junction"
    ]
},
        stationAliases: {"kings cross": "king's cross st. pancras", "st pancras": "king's cross st. pancras"},
        blacklistedStops: [],
        allowedRail: "ALL" 
    },
    "west_midlands": {
        name: "Birmingham & West Midlands",
        center: [52.4814, -1.8998],
        defaultZoom: 11,
        boundingBox: "52.329,-2.193,52.634,-1.458",
        overpassQuery: `node["railway"~"station|tram_stop"]({{bbox}}); way["railway"~"rail|tram|light_rail"]({{bbox}}); relation["type"="route"]["route"~"tram|light_rail"]({{bbox}});`,
    strictStopList: [
        "bloxwichnorth", "bloxwich", "walsall", "bescotstadium", "tamebridgeparkway", 
        "hamstead", "perrybarr", "witton", "aston", "duddeston", "birminghamnewstreet", 
        "birminghammoorstreet", "birminghamsnowhill", "adderleypark", "stechford", 
        "leahall", "marstongreen", "birminghaminternational", "hamptoninarden", 
        "coventry", "coventryarena", "canley", "tilehill", "berkswell", "bordesley", 
        "smallheath", "tyseley", "springroad", "hallgreen", "acocksgreen", "olton", 
        "solihull", "widneymanor", "dorridge", "yardleywood", "shirley", "whitlocksend", 
        "wythall", "earlswood", "fiveways", "university", "sellyoak", "bournville", 
        "kingsnorton", "northfield", "longbridge", "pineappleroad", "kingsheath", 
        "moseleyvillage", "jewelleryquarter", "thehawthorns", "smethwickgaltonbridge", 
        "langleygreen", "rowleyregis", "oldhill", "cradleyheath", "lye", "stourbridgejunction", 
        "stourbridgetown", "smethwickrolfestreet", "sandwellanddudley", "dudleyport", 
        "tipton", "coseley", "wolverhampton", "willenhall", "darlaston", "edgbastonvillage", 
        "brindleyplace", "librarycentenarysquare", "townhall", "grandcentral", 
        "corporationstreet", "bullstreet", "stchads", "stpauls", "sohobensonroad", 
        "winsongreenoutercircle", "handsworthboothstreet", "kenrickpark", "trinityway", 
        "westbromwichcentral", "lodgeroad", "dartmouthstreet", "dudleystreetgunsvillage", 
        "blacklake", "wednesburygreatwesternstreet", "wednesburyparkway", "bradleylane", 
        "loxdale", "bilstoncentral", "thecrescent", "priestfield", "theroyal", 
        "pipersrow", "wolverhamptonstation", "wolverhamptonstgeorges","gravellyhill","erdington", "chesterroad", "wyldegreen", "suttoncoldfield", "fouroaks", "butlerslane", "blakestreet","PineappleRoad","Kingsheath","moseleyVillage", "BirminghamAirport", "birminghaminternational"
    ],
        boroughs: {
            "Birmingham": [
                "Birmingham New Street", "Birmingham Moor Street", "Birmingham Snow Hill", 
                "Five Ways", "University", "Selly Oak", "Bournville", "Kings Norton", 
                "Northfield", "Longbridge", "Pineapple Road", "Kings Heath", "Moseley Village",
                "Duddeston", "Aston", "Witton", "Perry Barr", "Hamstead", "Bordesley", 
                "Small Heath", "Tyseley", "Spring Road", "Hall Green", "Yardley Wood", 
                "Acocks Green", "Stechford", "Lea Hall", "Adderley Park", "Jewellery Quarter"
            ],
            "Sandwell": [
                "Smethwick Galton Bridge", "Smethwick Rolfe Street", "The Hawthorns", 
                "Langley Green", "Rowley Regis", "Old Hill", "Sandwell & Dudley", 
                "Dudley Port", "Tipton", "Coseley", "Kenrick Park", "Trinity Way", 
                "West Bromwich Central", "Lodge Road", "Dartmouth Street", "Guns Village", "Black Lake"
            ],
            "Wolverhampton": [
                "Wolverhampton", "Wolverhampton Station", "Wolverhampton St. George's", 
                "The Royal", "Pipers Row", "Priestfield", "The Crescent", "Bilston Central", 
                "Loxdale", "Bradley Lane", "Willenhall"
            ],
            "Walsall": [
                "Walsall", "Bescot Stadium", "Tame Bridge Parkway", "Bloxwich", 
                "Bloxwich North", "Darlaston"
            ],
            "Dudley": [
                "Cradley Heath", "Lye", "Stourbridge Junction", "Stourbridge Town"
            ],
            "Solihull": [
                "Solihull", "Widney Manor", "Dorridge", "Shirley", "Whitlocks End", 
                "Wythall", "Earlswood", "Olton", "Marston Green", "Birmingham International", 
                "Hampton-in-Arden"
            ],
            "Coventry": [
                "Coventry", "Coventry Arena", "Canley", "Tile Hill", "Berkswell"
            ]
        },
        zones: {
            "1": [
                // Rail
                "Birmingham New Street", "Birmingham Moor Street", "Birmingham Snow Hill", "Five Ways", "Jewellery Quarter", "Duddeston",
                // Tram
                "Edgbaston Village", "Five Ways", "Brindleyplace", "Library Centenary Square", "Town Hall", "Grand Central", 
                "Corporation Street", "Bull Street", "St Chads", "St Paul's", "Jewellery Quarter", "Soho Benson Road"
            ],
            "2": [
                // Rail
                "University", "Selly Oak", "Aston", "Witton", "Bordesley", "Small Heath", "Tyseley", "Smethwick Galton Bridge", "Smethwick Rolfe Street", "The Hawthorns","Adderley Park",
                // Tram
                "Winson Green Outer Circle", "Handsworth Booth Street", "The Hawthorns", "Kenrick Park", "Trinity Way", "West Bromwich Central"
            ],
            "3": [
                // Rail
                "Bournville", "Kings Norton", "Stechford", "Hall Green", "Spring Road", "Yardley Wood", "Sandwell & Dudley", "Perry Barr", "Hamstead"," Erdington",
                // Tram
                "Lodge Road", "Dartmouth Street", "Dudley Street Guns Village", "Black Lake", 
                "Wednesbury Great Western Street", "Wednesbury Parkway", "Bradley Lane", "Loxdale","Chester Road"
            ],
            "4": [
                // Rail
                "Northfield", "Longbridge", "Acocks Green", "Olton", "Lea Hall", "Dudley Port", "Walsall", "Bescot Stadium", "Tame Bridge Parkway", "Wylde Green", "Sutton Coldfield", 
                // Tram
                "Bilston Central", "The Crescent", "Priestfield", "The Royal", "Pipers Row", 
                "Wolverhampton Station", "Wolverhampton St. George's"
            ],
            "5": [
                "Tipton", "Coseley", "Wolverhampton", "Bloxwich", "Bloxwich North", "Willenhall", "Darlaston",
                "Solihull", "Widney Manor", "Dorridge", "Shirley", "Whitlocks End", "Wythall", "Earlswood",
                "Marston Green", "Birmingham International", "Hampton-in-Arden", "Berkswell", "Tile Hill", 
                "Canley", "Coventry", "Coventry Arena", "Stourbridge Junction", "Stourbridge Town", "Lye", "Cradley Heath", "Old Hill", "Rowley Regis", "Langley Green", "Four Oaks", "Butlers Lane", "Blake Street"
            ]
        },
        stationAliases: {
            "tiptop": "tipton",
            "five way": "five ways",
            "solihill": "solihull",
            "tysely": "tyseley",
            "mosely village": "moseley village",
            "addersly park": "adderley park",
            "sandwellanddudley": "sandwellanddudley",
            "sandwell": "sandwellanddudley",
             "sandwelldudley": "sandwellanddudley",
             "bhx": "birminghaminternational",
            "airport": "birminghaminternational"
        },
        blacklistedStops: [],
        allowedRail: "ALL"
    }

    
};
