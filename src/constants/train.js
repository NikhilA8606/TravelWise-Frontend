const train_stations = [
  {
    id: "01",
    station_code: "TCR",
    station_name: "Thrissur",
  },
  {
    id: "02",
    station_code: "CLT",
    station_name: "Kozhikode Main",
  },
  {
    id: "03",
    station_code: "ERS",
    station_name: "Ernakulam Junction",
  },
  {
    id: "04",
    station_code: "TVC",
    station_name: "Trivandrum Central",
  },
  {
    id: "05",
    station_code: "AWY",
    station_name: "Aluva",
  },
  {
    id: "06",
    station_code: "QLN",
    station_name: "Kollam Junction",
  },
  {
    id: "07",
    station_code: "PGT",
    station_name: "Palakkad Junction",
  },
  {
    id: "08",
    station_code: "KYJ",
    station_name: "Kayamkulam Junction",
  },
  {
    id: "09",
    station_code: "SRR",
    station_name: "Shoranur Junction",
  },
  {
    id: "10",
    station_code: "CAN",
    station_name: "Kannur Main",
  },
  {
    id: "11",
    station_code: "ERN",
    station_name: "Ernakulam Town",
  },
  {
    id: "12",
    station_code: "KTYM",
    station_name: "Kottayam",
  },
  {
    id: "13",
    station_code: "TIR",
    station_name: "Tirur",
  },
  {
    id: "14",
    station_code: "CNGR",
    station_name: "Chengannur",
  },
  {
    id: "15",
    station_code: "TLY",
    station_name: "Thalassery",
  },
  {
    id: "16",
    station_code: "BDJ",
    station_name: "Vadakara",
  },
  {
    id: "17",
    station_code: "ALLP",
    station_name: "Alappuzha",
  },
  {
    id: "18",
    station_code: "KCVL",
    station_name: "Trivandrum Kochuveli",
  },
  {
    id: "19",
    station_code: "KGQ",
    station_name: "Kasaragod",
  },
  {
    id: "20",
    station_code: "TRVL",
    station_name: "Tiruvalla",
  },
  {
    id: "21",
    station_code: "PAY",
    station_name: "Payyanur",
  },
  {
    id: "22",
    station_code: "KZE",
    station_name: "Kanhangad",
  },
  {
    id: "23",
    station_code: "OTP",
    station_name: "Ottappalam",
  },
  {
    id: "24",
    station_code: "VAK",
    station_name: "Varkala Sivagiri",
  },
  {
    id: "25",
    station_code: "AFK",
    station_name: "Angamaly",
  },
  {
    id: "26",
    station_code: "CGY",
    station_name: "Changanassery",
  },
  {
    id: "27",
    station_code: "KTU",
    station_name: "Kuttippuram",
  },
  {
    id: "28",
    station_code: "QLD",
    station_name: "Koyilandy",
  },
  {
    id: "29",
    station_code: "GUV",
    station_name: "Guruvayur",
  },
  {
    id: "30",
    station_code: "MVLK",
    station_name: "Mavelikara",
  },
  {
    id: "31",
    station_code: "CKI",
    station_name: "Chalakudi",
  },
  {
    id: "32",
    station_code: "KPY",
    station_name: "Karunagapalli",
  },
  {
    id: "33",
    station_code: "IJK",
    station_name: "Irinjalakuda",
  },
  {
    id: "34",
    station_code: "PGI",
    station_name: "Parpanangadi",
  },
  {
    id: "35",
    station_code: "SRTL",
    station_name: "Cherthala",
  },
  {
    id: "36",
    station_code: "WKI",
    station_name: "Wadakanchery",
  },
  {
    id: "37",
    station_code: "FK",
    station_name: "Ferok",
  },
  {
    id: "38",
    station_code: "PVU",
    station_name: "Paravur",
  },
  {
    id: "39",
    station_code: "PTB",
    station_name: "Pattambi",
  },
  {
    id: "40",
    station_code: "NLE",
    station_name: "Nileshwar",
  },
  {
    id: "41",
    station_code: "AMPA",
    station_name: "Ambalappuzha",
  },
  {
    id: "42",
    station_code: "HAD",
    station_name: "Haripad",
  },
  {
    id: "43",
    station_code: "TRTR",
    station_name: "Tripunittura",
  },
  {
    id: "44",
    station_code: "KPQ",
    station_name: "Kannapuram",
  },
  {
    id: "45",
    station_code: "STKT",
    station_name: "Sasthamkotta",
  },
  {
    id: "46",
    station_code: "TA",
    station_name: "Tanur",
  },
  {
    id: "47",
    station_code: "CHV",
    station_name: "Charvattur",
  },
  {
    id: "48",
    station_code: "PAZ",
    station_name: "Payangadi",
  },
  {
    id: "49",
    station_code: "PVRD",
    station_name: "Piravam Road",
  },
  {
    id: "50",
    station_code: "NYY",
    station_name: "Neyyattinkara",
  },
  {
    id: "51",
    station_code: "CRY",
    station_name: "Chirayinkil",
  },
  {
    id: "52",
    station_code: "KZK",
    station_name: "Kazhakuttam",
  },
  {
    id: "53",
    station_code: "PASA",
    station_name: "Parassala",
  },
  {
    id: "54",
    station_code: "KMQ",
    station_name: "Kumbala",
  },
  {
    id: "55",
    station_code: "PGTN",
    station_name: "Palakkad Town",
  },
  {
    id: "56",
    station_code: "VNB",
    station_name: "Vaniyambalam",
  },
  {
    id: "57",
    station_code: "AAM",
    station_name: "Angadippuram",
  },
  {
    id: "58",
    station_code: "NIL",
    station_name: "Nilambur Road",
  },
  {
    id: "59",
    station_code: "TVP",
    station_name: "Thiruvananthapuram Pettah",
  },
  {
    id: "60",
    station_code: "KVU",
    station_name: "Kadakavur",
  },
  {
    id: "61",
    station_code: "TUVR",
    station_name: "Turavur",
  },
  {
    id: "62",
    station_code: "IPL",
    station_name: "Idappally",
  },
  {
    id: "63",
    station_code: "MJS",
    station_name: "Manjeshwar",
  },
  {
    id: "64",
    station_code: "KUV",
    station_name: "Kundara",
  },
  {
    id: "65",
    station_code: "MAKM",
    station_name: "Mararikulam",
  },
  {
    id: "66",
    station_code: "VLI",
    station_name: "Vallikunnu",
  },
  {
    id: "67",
    station_code: "AVS",
    station_name: "Auvaneswarem",
  },
  {
    id: "68",
    station_code: "KQK",
    station_name: "Kotikulam",
  },
  {
    id: "69",
    station_code: "KKZ",
    station_name: "Kottarakara",
  },
  {
    id: "70",
    station_code: "MYY",
    station_name: "Mayyanad",
  },
  {
    id: "71",
    station_code: "PUK",
    station_name: "Pudukad",
  },
  {
    id: "72",
    station_code: "PUU",
    station_name: "Punalur",
  },
  {
    id: "73",
    station_code: "PNQ",
    station_name: "Punkunnam",
  },
  {
    id: "74",
    station_code: "VARD",
    station_name: "Vaikam Road",
  },
  {
    id: "75",
    station_code: "MNTT",
    station_name: "Mulanturutti",
  },
  {
    id: "76",
    station_code: "VAPM",
    station_name: "Valapattanam",
  },
  {
    id: "77",
    station_code: "ETM",
    station_name: "Ettumanur",
  },
  {
    id: "78",
    station_code: "TKQ",
    station_name: "Trikarpur",
  },
  {
    id: "79",
    station_code: "CYN",
    station_name: "Cheriyanad",
  },
  {
    id: "80",
    station_code: "PYOL",
    station_name: "Payyoli",
  },
  {
    id: "81",
    station_code: "KLQ",
    station_name: "Kilikollur",
  },
  {
    id: "82",
    station_code: "BFR",
    station_name: "Bekal Fort",
  },
  {
    id: "83",
    station_code: "KRPP",
    station_name: "Kuruppanthara",
  },
  {
    id: "84",
    station_code: "EDN",
    station_name: "Edamann",
  },
  {
    id: "85",
    station_code: "KLGD",
    station_name: "Kollengode",
  },
  {
    id: "86",
    station_code: "PRND",
    station_name: "Perinad",
  },
  {
    id: "87",
    station_code: "AYVN",
    station_name: "Aryankavu New Block",
  },
  {
    id: "88",
    station_code: "TUA",
    station_name: "Tirunnavaya",
  },
  {
    id: "89",
    station_code: "EKN",
    station_name: "Ezhukone",
  },
  {
    id: "90",
    station_code: "UAA",
    station_name: "Uppala",
  },
  {
    id: "91",
    station_code: "ELM",
    station_name: "Ezhimala",
  },
  {
    id: "92",
    station_code: "MQU",
    station_name: "Murukkampuzha",
  },
  {
    id: "93",
    station_code: "OCR",
    station_name: "Ochira",
  },
  {
    id: "94",
    station_code: "KN",
    station_name: "Kadalundi",
  },
  {
    id: "95",
    station_code: "CHPD",
    station_name: "Cheppad Halt",
  },
  {
    id: "96",
    station_code: "LDY",
    station_name: "Lakkiti",
  },
  {
    id: "97",
    station_code: "MGK",
    station_name: "Mulangunnathukavu",
  },
  {
    id: "98",
    station_code: "NEM",
    station_name: "Trivandrum Nemom",
  },
  {
    id: "99",
    station_code: "PPNS",
    station_name: "Pappinissery",
  },
  {
    id: "100",
    station_code: "BRAM",
    station_name: "Balaramapuram",
  },
  {
    id: "101",
    station_code: "PDGM",
    station_name: "Pudunagaram",
  },
  {
    id: "102",
    station_code: "MMDA",
    station_name: "Muthalamada",
  },
  {
    id: "103",
    station_code: "OKL",
    station_name: "Ottakkal",
  },
  {
    id: "104",
    station_code: "ETR",
    station_name: "Elattur",
  },
  {
    id: "105",
    station_code: "KUC",
    station_name: "Karukkutty",
  },
  {
    id: "106",
    station_code: "KUL",
    station_name: "Kallayi",
  },
  {
    id: "107",
    station_code: "VTK",
    station_name: "Vallathol Nagar",
  },
  {
    id: "108",
    station_code: "KUMM",
    station_name: "Kumbalam",
  },
  {
    id: "109",
    station_code: "WH",
    station_name: "West Hill",
  },
  {
    id: "110",
    station_code: "WRA",
    station_name: "Walayar",
  },
  {
    id: "111",
    station_code: "KJKD",
    station_name: "Kanjikode",
  },
  {
    id: "112",
    station_code: "CS",
    station_name: "Kannur South",
  },
  {
    id: "113",
    station_code: "PUM",
    station_name: "Pallippuram",
  },
  {
    id: "114",
    station_code: "JGE",
    station_name: "Jagannath Temple Gate",
  },
  {
    id: "115",
    station_code: "TKT",
    station_name: "Tikkotti",
  },
  {
    id: "116",
    station_code: "PLL",
    station_name: "Parli",
  },
  {
    id: "117",
    station_code: "KLMR",
    station_name: "Kalamassery",
  },
  {
    id: "118",
    station_code: "OLR",
    station_name: "Ollur",
  },
  {
    id: "119",
    station_code: "KXP",
    station_name: "Kaniyapuram",
  },
  {
    id: "120",
    station_code: "ETK",
    station_name: "Edakkad",
  },
  {
    id: "121",
    station_code: "EVA",
    station_name: "Edavai",
  },
  {
    id: "122",
    station_code: "MNY",
    station_name: "Mankarai",
  },
  {
    id: "123",
    station_code: "MNUR",
    station_name: "Mannanur",
  },
  {
    id: "124",
    station_code: "KRKD",
    station_name: "Karakkad",
  },
  {
    id: "125",
    station_code: "CGV",
    station_name: "Chingavanam",
  },
  {
    id: "126",
    station_code: "DINR",
    station_name: "Divinenagar",
  },
  {
    id: "127",
    station_code: "MQO",
    station_name: "Munroturuttu",
  },
  {
    id: "128",
    station_code: "TUV",
    station_name: "Tuvvur",
  },
  {
    id: "129",
    station_code: "VPZ",
    station_name: "Vallapuzha",
  },
  {
    id: "130",
    station_code: "PKQ",
    station_name: "Pattikkad",
  },
  {
    id: "131",
    station_code: "CQA",
    station_name: "Cherukara",
  },
  {
    id: "132",
    station_code: "AYV",
    station_name: "Arayankavu",
  },
  {
    id: "133",
    station_code: "MLTR",
    station_name: "Melattur",
  },
  {
    id: "134",
    station_code: "DAVM",
    station_name: "Dhanuvachapuram",
  },
  {
    id: "135",
    station_code: "PNPR",
    station_name: "Punnapra",
  },
  {
    id: "136",
    station_code: "TZH",
    station_name: "Takazhi",
  },
  {
    id: "137",
    station_code: "NAU",
    station_name: "Nadapuram Road",
  },
  {
    id: "138",
    station_code: "VEK",
    station_name: "Vellarakkad",
  },
  {
    id: "139",
    station_code: "AMVA",
    station_name: "Amaravila Halt",
  },
  {
    id: "140",
    station_code: "VDKS",
    station_name: "Vadanam Kurussi Halt",
  },
  {
    id: "141",
    station_code: "AMY",
    station_name: "Akathumuri",
  },
  {
    id: "142",
    station_code: "KDTY",
    station_name: "Kaduturutti Halt",
  },
  {
    id: "143",
    station_code: "CTPE",
    station_name: "Chandanattop Halt",
  },
  {
    id: "144",
    station_code: "VLL",
    station_name: "Vellayil",
  },
  {
    id: "145",
    station_code: "CLMD",
    station_name: "Chullimada",
  },
  {
    id: "146",
    station_code: "KFE",
    station_name: "Kurikad",
  },
  {
    id: "147",
    station_code: "EDP",
    station_name: "Edapalayam Halt",
  },
  {
    id: "148",
    station_code: "KFQ",
    station_name: "Kumaranallur",
  },
  {
    id: "149",
    station_code: "IRP",
    station_name: "Iravipuram",
  },
  {
    id: "150",
    station_code: "AROR",
    station_name: "Aroor Halt",
  },
  {
    id: "151",
    station_code: "EZP",
    station_name: "Ezhuppunna",
  },
  {
    id: "152",
    station_code: "CQL",
    station_name: "Chirakkal",
  },
  {
    id: "153",
    station_code: "IGL",
    station_name: "Iringal",
  },
  {
    id: "154",
    station_code: "KFI",
    station_name: "Kappil",
  },
  {
    id: "155",
    station_code: "PLPM",
    station_name: "Palappuram",
  },
  {
    id: "156",
    station_code: "KZC",
    station_name: "Kulukkalur",
  },
  {
    id: "157",
    station_code: "CWR",
    station_name: "Chovvara",
  },
  {
    id: "158",
    station_code: "KVTA",
    station_name: "Karuvatta Halt",
  },
  {
    id: "159",
    station_code: "VELI",
    station_name: "Veli",
  },
  {
    id: "160",
    station_code: "NYI",
    station_name: "Nellayi",
  },
  {
    id: "161",
    station_code: "KLAD",
    station_name: "Kalanad Halt",
  },
  {
    id: "162",
    station_code: "TMPY",
    station_name: "Tumboli",
  },
  {
    id: "163",
    station_code: "KPTM",
    station_name: "Kanjiramattom",
  },
  {
    id: "164",
    station_code: "CMC",
    station_name: "Chemancheri",
  },
  {
    id: "165",
    station_code: "TRVZ",
    station_name: "Tiruvizha",
  },
  {
    id: "166",
    station_code: "PGZ",
    station_name: "Perunguzhi",
  },
  {
    id: "167",
    station_code: "KODN",
    station_name: "Kodumunda",
  },
  {
    id: "168",
    station_code: "DMD",
    station_name: "Dharmadam",
  },
  {
    id: "169",
    station_code: "KFV",
    station_name: "Kundara East",
  },
  {
    id: "170",
    station_code: "KTHY",
    station_name: "Kazhuthuruthy",
  },
  {
    id: "171",
    station_code: "PEU",
    station_name: "Perssannur",
  },
  {
    id: "172",
    station_code: "MUC",
    station_name: "Mullurkara",
  },
  {
    id: "173",
    station_code: "MUKE",
    station_name: "Mukkali",
  },
  {
    id: "174",
    station_code: "KIF",
    station_name: "Kuri",
  },
  {
    id: "175",
    station_code: "KAVR",
    station_name: "Kalavoor Halt",
  },
  {
    id: "176",
    station_code: "KRAN",
    station_name: "Koratti Angadi",
  },
  {
    id: "177",
    station_code: "CDRA",
    station_name: "Chandera",
  },
  {
    id: "178",
    station_code: "VAY",
    station_name: "Vayalar",
  },
]

export default train_stations
