(function (SV) {
    'use strict';

    SV.data = SV.data || {};

    SV.data.fixedEvents = {
        // 1 backareamaze
        1: [
            3, // port cullis [tp] (2,0)
        ],
        // 2 subway
        2: [
            12, // EV012 [tp] (6,6)
            13, // EV013 [tp] (6,5)
            21, // blank [tp] (10,5)
            25, // blank [tp] (10,4)
            27, // blank [tp] (10,8)
            28, // The card man [tp] (11,11)
        ],
        // 5 MAP005
        5: [
            10, // pirate [talk] (16,12)
        ],
        // 6 undergound1
        6: [
            5, // EV005 [talk] (9,8)
            18, // EV018 [tp] (6,30)
            22, // EV022 [talk] (7,28)
        ],
        // 9 undergound5
        9: [
            10, // item chest [chest] (20,7)
        ],
        // 10 undergound6
        10: [
            10, // item chest [chest] (35,6)
        ],
        // 11 undergound7
        11: [
            6, // item chest [chest] (24,7)
        ],
        // 13 outdoor/ extra
        13: [
            3, // port cullis [talk] (16,14)
            10, // exit [tp] (11,9)
            16, // EV016 [talk] (32,30)
            22, // EV022 [talk] (17,31)
        ],
        // 14 shop
        14: [
            1, // EV001 [talk] (9,4)
            2, // EV002 [tp] (9,9)
            10, // EV010 [talk] (6,5)
            11, // EV011 [talk] (4,6)
        ],
        // 18 cave
        18: [
            2, // exit [tp] (2,0)
            3, // EV003 [talk] (3,3)
            8, // pirate [talk] (29,13)
        ],
        // 19 cave start
        19: [
            2, // exit [tp] (3,1)
        ],
        // 20 intro start
        20: [
            1, // start [tp] (15,0)
        ],
        // 21 castle inside
        21: [
            3, // port cullis [tp] (8,12)
            9, // exit [tp] (6,0)
            12, // pirate [talk] (8,2)
            13, // pirateblocker [talk] (6,1)
            15, // pirate [talk] (3,5)
        ],
        // 22 castle inside maze
        22: [
            3, // door [talk] (8,12)
            9, // blank [talk] (14,14)
            24, // Mel Intro [tp] (13,14)
            27, // blank [talk] (8,9)
        ],
        // 23 cave field
        23: [
            2, // exit [tp] (3,1)
            8, // school portal [tp] (8,2)
            9, // EV009 [talk] (7,4)
        ],
        // 24 school
        24: [
            6, // exit [tp] (11,13)
            15, // exit [tp] (11,12)
        ],
        // 25 flesh realm
        25: [
            1, // size1 [talk] (6,3)
            2, // size2 [talk] (3,0)
            5, // size 3 [talk] (13,1)
            6, // size1 [talk] (4,2)
            7, // size1 [talk] (4,4)
            9, // EV009 [talk] (19,12)
            10, // EV010 [talk] (17,1)
            12, // size1 [talk] (1,11)
            13, // size1 [talk] (12,17)
            14, // size 3 [talk] (22,0)
            15, // size 3 [talk] (27,34)
            16, // size 3 [talk] (22,34)
            17, // size 3 [talk] (11,34)
            18, // size 3 [talk] (5,34)
            19, // size 3 [talk] (1,33)
            20, // size 3 [talk] (17,34)
            21, // size1 [talk] (11,14)
            23, // size2 [talk] (15,34)
            24, // size2 [talk] (8,34)
            25, // size2 [talk] (25,34)
            26, // size 3 [talk] (8,0)
            27, // size2 [talk] (20,34)
            29, // size2 [talk] (11,0)
            31, // size1 [talk] (10,15)
            32, // size1 [talk] (10,19)
            33, // size1 [talk] (16,16)
            34, // size1 [talk] (16,14)
            35, // size1 [talk] (19,14)
            36, // size1 [talk] (16,23)
            37, // size1 [talk] (30,19)
            38, // size1 [talk] (28,17)
            39, // size1 [talk] (28,14)
            40, // size1 [talk] (28,11)
            41, // size1 [talk] (29,12)
            42, // size1 [talk] (28,5)
            43, // size1 [talk] (23,2)
            44, // size1 [talk] (14,2)
            45, // size1 [talk] (10,2)
            46, // size1 [talk] (3,28)
            47, // size1 [talk] (12,32)
            48, // size1 [talk] (19,32)
            49, // size1 [talk] (24,32)
            50, // size1 [talk] (11,25)
            51, // size1 [talk] (11,27)
            53, // size1 [talk] (28,21)
            54, // size1 [talk] (27,32)
            55, // size1 [talk] (19,2)
            56, // size1 [talk] (28,2)
            57, // size1 [talk] (23,7)
            58, // size1 [talk] (1,7)
            59, // size1 [talk] (2,4)
        ],
        // 26 Geoworld
        26: [
            9, // fridge [talk] (23,19)
        ],
        // 28 toy
        28: [
            10, // pirate [talk] (9,7)
        ],
        // 34 Unfinsished events
        34: [
            1, // paperdolls [tp] (9,7)
            2, // cyclops [talk] (2,0)
            4, // golden church [tp] (11,12)
            10, // meltest [talk] (3,8)
            18, // meltest2 [talk] (4,9)
        ],
        // 36 undergound9
        36: [
            5, // item chest [chest] (31,3)
        ],
        // 43 undergound11
        43: [
            5, // item chest [chest] (27,4)
        ],
        // 48 undergound12
        48: [
            10, // rustmv [tp] (10,15)
        ],
        // 49 undergound13
        49: [
            5, // item chest [chest] (11,8)
        ],
        // 53 undergound17
        53: [
            5, // door [tp] (7,14)
            8, // vic [tp] (13,25)
            11, // man1 [talk] (8,9)
        ],
        // 54 undergound18
        54: [
            30, // RUSTED REALM DOOR [tp] (40,30)
        ],
        // 60 undergound24
        60: [
            6, // man1 [talk] (15,22)
            8, // man1 [talk] (13,24)
        ],
        // 61 undergound25
        61: [
            6, // man1 [talk] (15,22)
            8, // man1 [talk] (13,24)
        ],
        // 62 undergound25
        62: [
            1, // Floor randomizer [tp] (17,11)
            6, // man1 [talk] (15,22)
            8, // man1 [talk] (13,24)
        ],
        // 63 undergound26
        63: [
            6, // man1 [talk] (15,22)
            8, // man1 [talk] (13,24)
        ],
        // 66 undergound29
        66: [
            5, // item chest [chest] (15,21)
        ],
        // 67 undergound30
        67: [
            9, // rust mv [tp] (13,10)
        ],
        // 70 mel
        70: [
            17, // EV017 [tp] (37,16)
            18, // EV018 [tp] (35,16)
            19, // EV019 [tp] (36,16)
            20, // EV020 [tp] (34,16)
            29, // ufo1 [tp] (36,26)
            30, // ufo1 [tp] (35,26)
            31, // The card man [tp] (48,41)
            32, // jomon [talk] (27,41)
            33, // wall pic facing north [tp] (44,31)
            34, // wall pic facing north [tp] (46,31)
            35, // wall pic facing north [tp] (32,31)
            36, // wall pic facing north [tp] (44,35)
            37, // wall pic facing north [tp] (46,35)
            38, // wall pic facing north [tp] (34,35)
            39, // wall pic facing north [tp] (44,39)
            40, // wall pic facing north [tp] (46,39)
            41, // wall pic facing north [tp] (32,35)
            42, // wall pic facing north [tp] (34,39)
            43, // wall pic facing north [tp] (32,39)
            44, // wall pic facing north [tp] (44,26)
            54, // wall pic facing north [tp] (34,31)
            55, // wall pic facing north [tp] (36,31)
            56, // wall pic facing north [tp] (30,39)
            63, // jomon [talk] (41,26)
            64, // The card man [talk] (42,26)
            65, // blank [tp] (35,22)
        ],
        // 75 undergound31
        75: [
            5, // item chest [chest] (15,21)
            8, // bucket girlday [tp] (12,20)
        ],
        // 77 undergoundrust
        77: [
            5, // RUSTED REALM HALLWAY [tp] (23,47)
            8, // item chest [chest] (37,4)
            10, // RUSTED REALM 1 [tp] (23,22)
            34, // blank [tp] (22,26)
        ],
        // 86 undergound38
        86: [
            11, // green freak [tp] (23,30)
        ],
        // 90 undergound42
        90: [
            55, // man1 [talk] (19,26)
            56, // man2 [talk] (21,25)
        ],
        // 91 undergound43
        91: [
            15, // man1 [talk] (15,27)
            16, // man2 [talk] (15,36)
        ],
        // 92 undergound44
        92: [
            15, // caged women [talk] (20,25)
            16, // man2 [talk] (15,36)
            17, // caged women [talk] (21,24)
            51, // caged women [talk] (22,25)
            53, // caged women [talk] (21,27)
        ],
        // 94 undergound46
        94: [
            15, // caged women [talk] (20,25)
            17, // caged women [talk] (21,24)
            51, // caged women [talk] (22,25)
            53, // caged women [talk] (21,27)
        ],
        // 96 undergound48
        96: [
            55, // man1 [talk] (19,26)
            56, // man2 [talk] (21,25)
        ],
        // 97 undergound49
        97: [
            55, // man1 [talk] (19,26)
            56, // man2 [talk] (21,25)
        ],
        // 98 undergound50
        98: [
            6, // MEL SLEEP [tp] (5,13)
            8, // creepy fellow [tp] (7,14)
            10, // mels side adventures 1 [tp] (6,17)
            11, // man1 [talk] (8,9)
            14, // blank [tp] (14,25)
            15, // Floor randomizer [tp] (23,20)
        ],
        // 99 undergound51
        99: [
            9, // hallway end door [tp] (42,248)
            15, // caged women [talk] (20,25)
            16, // man2 [talk] (15,36)
            17, // caged women [talk] (21,24)
            51, // caged women [talk] (22,25)
            53, // caged women [talk] (21,27)
        ],
        // 100 undergound52
        100: [
            55, // man1 [talk] (19,26)
            56, // man2 [talk] (21,25)
        ],
        // 101 undergound53
        101: [
            55, // man1 [talk] (19,26)
            56, // man2 [talk] (21,25)
        ],
        // 102 undergound54
        102: [
            12, // Floor randomizer [tp] (31,63)
            200, // Floor randomizer [tp] (28,14)
            201, // Floor randomizer [tp] (83,7)
            202, // Floor randomizer [tp] (71,55)
        ],
        // 119 castle inside maze 2
        119: [
            22, // rustmv [tp] (14,14)
        ],
        // 120 undergound60
        120: [
            5, // item chest [chest] (41,30)
        ],
        // 123 undergound63
        123: [
            9, // blank [talk] (10,14)
            11, // ghost [talk] (39,10)
            12, // ghost [talk] (38,33)
        ],
        // 125 undergound65
        125: [
            5, // item chest [chest] (19,8)
        ],
        // 126 undergound66
        126: [
            5, // item chest [chest] (19,8)
        ],
        // 128 undergound68
        128: [
            107, // wall pic facing north [talk] (36,11)
        ],
        // 129 undergound69
        129: [
            14, // item chest [chest] (25,23)
        ],
        // 133 undergound73
        133: [
            55, // man1 [talk] (19,26)
            56, // man2 [talk] (21,25)
        ],
        // 134 flesh realm2
        134: [
            1, // size1 [talk] (6,3)
            2, // size2 [talk] (3,0)
            5, // size 3 [talk] (13,1)
            6, // size1 [talk] (4,2)
            7, // size1 [talk] (4,4)
            9, // EV009 [talk] (19,12)
            10, // EV010 [talk] (17,1)
            12, // size1 [talk] (1,11)
            13, // size1 [talk] (12,17)
            14, // size 3 [talk] (22,0)
            15, // size 3 [talk] (27,34)
            16, // size 3 [talk] (22,34)
            17, // size 3 [talk] (11,34)
            18, // size 3 [talk] (5,34)
            19, // size 3 [talk] (1,33)
            20, // size 3 [talk] (17,34)
            21, // size1 [talk] (11,14)
            22, // size1 [talk] (5,31)
            23, // size2 [talk] (15,34)
            24, // size2 [talk] (8,34)
            25, // size2 [talk] (25,34)
            26, // size 3 [talk] (8,0)
            27, // size2 [talk] (20,34)
            29, // size2 [talk] (11,0)
            31, // size1 [talk] (10,15)
            32, // size1 [talk] (10,19)
            33, // size1 [talk] (16,16)
            34, // size1 [talk] (16,14)
            35, // size1 [talk] (19,14)
            36, // size1 [talk] (16,23)
            37, // size1 [talk] (30,19)
            38, // size1 [talk] (28,17)
            39, // size1 [talk] (28,14)
            40, // size1 [talk] (28,11)
            41, // size1 [talk] (29,12)
            42, // size1 [talk] (28,5)
            43, // size1 [talk] (23,2)
            44, // size1 [talk] (14,2)
            45, // size1 [talk] (10,2)
            47, // size1 [talk] (12,32)
            48, // size1 [talk] (19,32)
            49, // size1 [talk] (24,32)
            50, // size1 [talk] (11,25)
            51, // size1 [talk] (11,27)
            53, // size1 [talk] (28,21)
            54, // size1 [talk] (27,32)
            55, // size1 [talk] (19,2)
            56, // size1 [talk] (28,2)
            57, // size1 [talk] (23,7)
            58, // size1 [talk] (1,7)
            59, // size1 [talk] (2,4)
        ],
        // 136 flesh realm3
        136: [
            1, // size1 [talk] (6,3)
            2, // size2 [talk] (3,0)
            5, // size 3 [talk] (13,1)
            6, // size1 [talk] (4,2)
            7, // size1 [talk] (4,4)
            9, // EV009 [talk] (19,12)
            10, // EV010 [talk] (17,1)
            12, // size1 [talk] (1,11)
            13, // size1 [talk] (12,17)
            14, // size 3 [talk] (22,0)
            15, // size 3 [talk] (27,34)
            16, // size 3 [talk] (22,34)
            17, // size 3 [talk] (11,34)
            18, // size 3 [talk] (5,34)
            19, // size 3 [talk] (1,33)
            20, // size 3 [talk] (17,34)
            21, // size1 [talk] (11,14)
            22, // size1 [talk] (5,31)
            23, // size2 [talk] (15,34)
            24, // size2 [talk] (8,34)
            25, // size2 [talk] (25,34)
            26, // size 3 [talk] (8,0)
            27, // size2 [talk] (20,34)
            29, // size2 [talk] (11,0)
            31, // size1 [talk] (10,15)
            32, // size1 [talk] (10,19)
            33, // size1 [talk] (16,16)
            34, // size1 [talk] (16,14)
            35, // size1 [talk] (19,14)
            36, // size1 [talk] (16,23)
            37, // size1 [talk] (30,19)
            38, // size1 [talk] (28,17)
            39, // size1 [talk] (28,14)
            40, // size1 [talk] (28,11)
            41, // size1 [talk] (29,12)
            42, // size1 [talk] (28,5)
            43, // size1 [talk] (23,2)
            44, // size1 [talk] (14,2)
            45, // size1 [talk] (10,2)
            47, // size1 [talk] (12,32)
            48, // size1 [talk] (19,32)
            49, // size1 [talk] (24,32)
            50, // size1 [talk] (11,25)
            51, // size1 [talk] (11,27)
            53, // size1 [talk] (28,21)
            54, // size1 [talk] (27,32)
            55, // size1 [talk] (19,2)
            56, // size1 [talk] (28,2)
            57, // size1 [talk] (23,7)
            58, // size1 [talk] (1,7)
            59, // size1 [talk] (2,4)
        ],
        // 140 undergound78
        140: [
            6, // man1 [talk] (15,22)
            8, // man1 [talk] (13,24)
            25, // wall crack [talk] (20,10)
            27, // Sword roll [talk] (26,7)
        ],
        // 146 undergound82
        146: [
            6, // man1 [talk] (15,22)
            8, // man1 [talk] (13,24)
            21, // wall pic facing north [talk] (13,26)
        ],
        // 147 undergound83
        147: [
            8, // man1 [talk] (13,24)
        ],
        // 148 undergound84
        148: [
            8, // man1 [talk] (13,24)
        ],
        // 150 undergound86
        150: [
            23, // cyber [talk] (24,3)
        ],
        // 153 undergound87
        153: [
            60, // door [tp] (25,32)
            66, // wall pic facing north [talk] (37,20)
        ],
        // 154 undergound85
        154: [
            51, // wall pic facing north [talk] (30,34)
        ],
        // 155 undergound89
        155: [
            64, // meanjestter [tp] (10,5)
        ],
        // 156 undergound90
        156: [
            64, // meanjestter [tp] (10,5)
            69, // blank [talk] (16,15)
            70, // blank [talk] (17,15)
            71, // golden church [tp] (15,17)
        ],
        // 157 pictureroom
        157: [
            6, // wall pic facing north [talk] (34,19)
            17, // EV017 [tp] (37,16)
            18, // EV018 [tp] (35,16)
            19, // EV019 [tp] (36,16)
            20, // EV020 [tp] (34,16)
            24, // wall pic facing north [talk] (37,19)
            25, // wall pic facing north [talk] (29,19)
            26, // wall pic facing north [talk] (40,19)
        ],
        // 158 undergound85
        158: [
            50, // angel guard [tp] (35,2)
        ],
        // 164 undergound89
        164: [
            6, // man1 [talk] (15,22)
        ],
        // 167 undergound92
        167: [
            51, // wall pic facing north [talk] (30,34)
        ],
        // 168 undergound93
        168: [
            50, // angel guard [tp] (35,2)
            57, // rust music [tp] (32,38)
        ],
        // 169 undergound94
        169: [
            50, // angel guard [tp] (35,2)
        ],
        // 170 undergound95
        170: [
            21, // EV021 [tp] (17,29)
            44, // EV044 [tp] (41,29)
            45, // EV045 [tp] (45,10)
            49, // EV049 [tp] (46,20)
            52, // EV052 [tp] (48,38)
            53, // EV053 [tp] (7,23)
            54, // EV054 [tp] (2,16)
            55, // EV055 [tp] (9,2)
            56, // EV056 [tp] (15,8)
            57, // EV057 [tp] (9,17)
            58, // EV058 [tp] (14,37)
            59, // EV059 [tp] (17,43)
            60, // EV060 [tp] (35,34)
            61, // EV061 [tp] (35,13)
        ],
        // 173 undergound98
        173: [
            50, // angel guard [tp] (35,2)
        ],
        // 174 undergound99
        174: [
            50, // angel guard [tp] (35,2)
        ],
        // 175 undergound100
        175: [
            8, // man1 [talk] (13,24)
        ],
        // 176 undergound101
        176: [
            16, // man2 [talk] (15,36)
        ],
        // 177 undergound102
        177: [
            16, // man2 [talk] (15,36)
            73, // Money mouse [tp] (25,24)
        ],
        // 178 lsdagain
        178: [
            8, // starman [tp] (24,11)
        ],
        // 179 undergound103
        179: [
            50, // angel guard [tp] (35,2)
        ],
        // 182 undergound107
        182: [
            51, // wall pic facing north [talk] (30,34)
        ],
        // 185 undergound110
        185: [
            51, // wall pic facing north [talk] (30,34)
        ],
        // 186 undergound111
        186: [
            51, // wall pic facing north [talk] (30,34)
        ],
        // 190 undergound115
        190: [
            107, // rustmv [tp] (12,34)
        ],
        // 191 undergound116
        191: [
            107, // EV107 [tp] (6,41)
            144, // EV144 [tp] (28,34)
            145, // EV145 [tp] (23,44)
            146, // EV146 [tp] (24,28)
            147, // EV147 [tp] (39,3)
            148, // EV148 [tp] (19,6)
            149, // EV149 [tp] (10,31)
        ],
        // 193 undergound118
        193: [
            8, // man1 [talk] (13,24)
        ],
        // 194 undergound118
        194: [
            8, // man1 [talk] (13,24)
        ],
        // 197 undergound122
        197: [
            5, // Asphodel [tp] (24,3)
        ],
        // 198 undergound123
        198: [
            5, // wall pic facing north [talk] (17,35)
        ],
        // 199 undergound124
        199: [
            5, // wall pic facing north [talk] (17,35)
            18, // blank [talk] (21,15)
        ],
        // 205 undergound130
        205: [
            61, // EV061 [tp] (20,13)
            62, // EV062 [tp] (20,12)
        ],
        // 206 undergound131
        206: [
            61, // EV061 [tp] (20,13)
            62, // EV062 [tp] (20,12)
        ],
        // 207 undergound132
        207: [
            9, // blank [tp] (14,2)
        ],
        // 208 undergound133
        208: [
            56, // EV056 [tp] (6,4)
            57, // EV057 [tp] (6,3)
            58, // EV058 [tp] (14,4)
            59, // EV059 [tp] (14,3)
            60, // EV060 [tp] (41,25)
            61, // EV061 [tp] (41,24)
        ],
        // 209 undergound134 (chii)
        209: [
            31, // Chii [tp] (17,7)
        ],
        // 211 undergound135
        211: [
            61, // EV061 [tp] (20,13)
            62, // EV062 [tp] (20,12)
        ],
        // 212 undergound136
        212: [
            33, // lilith, himiko death, mels park [tp] (3,30)
            61, // EV061 [tp] (20,13)
            62, // EV062 [tp] (20,12)
        ],
        // 216 undergound140
        216: [
            14, // item chest [chest] (24,27)
        ],
        // 217 undergound141
        217: [
            14, // item chest [chest] (24,27)
        ],
        // 218 undergound142
        218: [
            14, // item chest [chest] (24,27)
        ],
        // 219 undergound143
        219: [
            14, // item chest [chest] (24,27)
        ],
        // 220 undergound144
        220: [
            14, // item chest [chest] (24,27)
        ],
        // 221 undergound145
        221: [
            14, // item chest [chest] (24,27)
        ],
        // 223 underground147
        223: [
            6, // exit [tp] (11,13)
            15, // exit [tp] (11,12)
            23, // exit [tp] (10,17)
            25, // exit [tp] (10,16)
        ],
        // 225 undergound149
        225: [
            14, // item chest [chest] (24,27)
        ],
        // 226 undergound150
        226: [
            14, // item chest [chest] (24,27)
        ],
        // 227 underground151
        227: [
            6, // exit [tp] (11,13)
            15, // exit [tp] (11,12)
            23, // exit [tp] (10,17)
            25, // exit [tp] (10,16)
            37, // port cullis [tp] (17,32)
            39, // port cullis [tp] (15,32)
            40, // port cullis [tp] (21,32)
            41, // port cullis [tp] (22,32)
            42, // exit [tp] (37,12)
            43, // exit [tp] (37,11)
        ],
        // 229 undergound153
        229: [
            55, // man1 [talk] (19,26)
            56, // man2 [talk] (21,25)
        ],
        // 232 undergound156
        232: [
            5, // Asphodel [tp] (24,3)
        ],
        // 233 undergound157
        233: [
            56, // EV056 [tp] (6,4)
            57, // EV057 [tp] (6,3)
            58, // EV058 [tp] (14,4)
            59, // EV059 [tp] (14,3)
            60, // EV060 [tp] (41,25)
            61, // EV061 [tp] (41,24)
        ],
        // 234 undergound158
        234: [
            9, // blank [tp] (14,2)
        ],
        // 235 undergound159
        235: [
            2, // EV002 [tp] (9,15)
            3, // EV003 [tp] (9,14)
        ],
        // 236 undergound160
        236: [
            1, // Asphodel [tp] (7,11)
            5, // ufo1 [tp] (9,11)
            6, // iya [tp] (11,11)
            8, // man1 [talk] (13,24)
            9, // Dolls [tp] (13,11)
            10, // bone [tp] (17,11)
            11, // lowpolygirl [tp] (31,28)
            12, // starman [tp] (21,11)
            20, // HEll [tp] (23,11)
            21, // yellow place [tp] (11,20)
            22, // subway [tp] (13,20)
            23, // bucket girlday [tp] (15,20)
            24, // lyssa [tp] (29,19)
            25, // creepy fellow [tp] (17,20)
            26, // MEL SLEEP [tp] (19,20)
            27, // lilith, himiko death, mels park [tp] (23,22)
        ],
        // 243 store
        243: [
            9, // EV009 [tp] (21,7)
            10, // EV010 [tp] (21,8)
            11, // blank [talk] (21,9)
        ],
        // 244 greatlotus
        244: [
            16, // greatlotus [tp] (12,15)
        ],
        // 249 special
        249: [
            5, // Floor randomizer [tp] (21,10)
            6, // Floor randomizer [tp] (35,14)
            8, // man1 [talk] (13,24)
            10, // Floor randomizer [tp] (23,24)
            11, // Floor randomizer [tp] (35,32)
            12, // Floor randomizer [tp] (26,34)
            13, // Floor randomizer [tp] (14,33)
            14, // Floor randomizer [tp] (5,36)
            16, // Floor randomizer [tp] (15,10)
            17, // blank [tp] (26,38)
            18, // shrine maiden [tp] (38,33)
            19, // blank [tp] (25,22)
            20, // lilith, himiko death, mels park [tp] (38,35)
            21, // Ori [tp] (15,36)
            22, // blank [tp] (36,16)
            23, // blank [tp] (14,22)
            24, // jomon [tp] (6,39)
            25, // sir seven [tp] (15,11)
            26, // blank [tp] (22,12)
            27, // Floor randomizer [tp] (15,26)
            28, // Floor randomizer [tp] (21,3)
            29, // jomon [tp] (8,4)
            30, // Floor randomizer [tp] (8,5)
            31, // blank [tp] (20,4)
        ],
        // 256 the end 2
        256: [
            5, // blank [talk] (25,7)
            18, // EV018 [tp] (6,30)
            22, // lowpolygirl [talk] (24,7)
            29, // blank [talk] (16,7)
            33, // Ori [talk] (21,9)
            34, // blank [talk] (13,9)
            35, // blank [talk] (18,9)
            36, // mothman [talk] (31,3)
            37, // geo [talk] (32,11)
            38, // Ori [talk] (9,12)
            41, // blank [talk] (8,3)
            42, // blank [talk] (6,3)
            43, // blank [talk] (7,10)
            44, // blank [talk] (7,19)
        ],
        // 257 168
        257: [
            11, // EV011 [tp] (29,6)
            12, // EV012 [talk] (29,10)
        ],
        // 258 169
        258: [
            11, // EV011 [tp] (29,6)
            12, // EV012 [talk] (29,10)
        ],
        // 259 170
        259: [
            11, // EV011 [tp] (29,6)
            12, // EV012 [talk] (29,10)
        ],
        // 260 171
        260: [
            11, // EV011 [tp] (29,6)
            12, // EV012 [talk] (29,10)
        ],
        // 261 172
        261: [
            11, // EV011 [tp] (29,6)
            12, // EV012 [talk] (29,10)
        ],
        // 262 173
        262: [
            11, // EV011 [tp] (29,6)
            12, // EV012 [talk] (29,10)
        ],
        // 263 174
        263: [
            11, // EV011 [tp] (29,6)
            12, // EV012 [talk] (29,10)
            45, // blank [tp] (49,8)
        ],
        // 266 177
        266: [
            9, // fridge [talk] (23,19)
        ],
        // 267 178
        267: [
            9, // fridge [talk] (23,19)
        ],
        // 269 180
        269: [
            11, // EV011 [tp] (32,3)
            12, // EV012 [talk] (29,10)
            45, // blank [tp] (49,8)
        ],
        // 277 185
        277: [
            1, // size1 [talk] (6,3)
            2, // size2 [talk] (3,0)
            5, // size 3 [talk] (13,1)
            6, // size1 [talk] (4,2)
            7, // size1 [talk] (4,4)
            10, // EV010 [talk] (17,1)
            12, // size1 [talk] (1,11)
            14, // size 3 [talk] (22,0)
            15, // size 3 [talk] (27,34)
            16, // size 3 [talk] (22,34)
            17, // size 3 [talk] (11,34)
            18, // size 3 [talk] (5,34)
            19, // size 3 [talk] (1,33)
            20, // size 3 [talk] (17,34)
            23, // size2 [talk] (15,34)
            24, // size2 [talk] (8,34)
            25, // size2 [talk] (25,34)
            26, // size 3 [talk] (8,0)
            27, // size2 [talk] (20,34)
            29, // size2 [talk] (11,0)
            37, // size1 [talk] (30,19)
            38, // size1 [talk] (28,17)
            39, // size1 [talk] (28,14)
            40, // size1 [talk] (28,11)
            41, // size1 [talk] (29,12)
            42, // size1 [talk] (28,5)
            43, // size1 [talk] (23,2)
            44, // size1 [talk] (14,2)
            45, // size1 [talk] (10,2)
            46, // size1 [talk] (3,28)
            47, // size1 [talk] (12,32)
            48, // size1 [talk] (19,32)
            49, // size1 [talk] (24,32)
            53, // size1 [talk] (28,21)
            54, // size1 [talk] (27,32)
            55, // size1 [talk] (19,2)
            56, // size1 [talk] (28,2)
            58, // size1 [talk] (1,7)
            59, // size1 [talk] (2,4)
        ],
        // 285 192
        285: [
            22, // MEL SLEEP [tp] (21,22)
        ],
        // 287 194
        287: [
            3, // Dolls [tp] (0,19)
        ],
        // 297 special 2
        297: [
            5, // Floor randomizer [tp] (21,10)
            6, // Floor randomizer [tp] (35,14)
            8, // man1 [talk] (13,24)
            10, // Floor randomizer [tp] (23,24)
            11, // Floor randomizer [tp] (35,32)
            12, // Floor randomizer [tp] (26,34)
            13, // Floor randomizer [tp] (14,33)
            14, // Floor randomizer [tp] (5,36)
            16, // Floor randomizer [tp] (15,10)
            17, // blank [tp] (26,38)
            18, // shrine maiden [tp] (38,33)
            19, // blank [tp] (25,22)
            20, // lilith, himiko death, mels park [tp] (38,35)
            21, // Ori [tp] (15,36)
            22, // blank [tp] (36,16)
            23, // blank [tp] (14,22)
            24, // jomon [tp] (6,39)
            25, // sir seven [tp] (15,11)
            26, // blank [tp] (22,12)
            27, // Floor randomizer [tp] (15,26)
        ],
        // 301 207
        301: [
            94, // MEL SLEEP [tp] (19,15)
        ],
        // 302 209
        302: [
            161, // MEL SLEEP [tp] (23,15)
        ],
        // 303 208
        303: [
            95, // MEL SLEEP [tp] (21,28)
        ],
        // 304 210
        304: [
            51, // MEL SLEEP [tp] (13,31)
        ],
    };

})(window.SpawnViewer = window.SpawnViewer || {});
