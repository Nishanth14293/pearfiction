export const SlotConfig = {
    maxReelSpin:10,
    symbolTypes:["hv1_symbol","hv2_symbol","hv3_symbol","hv4_symbol","lv1_symbol","lv2_symbol","lv3_symbol","lv4_symbol"],
    reelBands: [
        ["hv2_symbol", "lv3_symbol", "lv3_symbol", "hv1_symbol", "hv1_symbol", "lv1_symbol", "hv1_symbol", "hv4_symbol", "lv1_symbol", "hv3_symbol", "hv2_symbol", "hv3_symbol", "lv4_symbol", "hv4_symbol", "lv1_symbol", "hv2_symbol", "lv4_symbol", "lv1_symbol", "lv3_symbol", "hv2_symbol"],
        ["hv1_symbol", "lv2_symbol", "lv3_symbol", "lv2_symbol", "lv1_symbol", "lv1_symbol", "lv4_symbol", "lv1_symbol", "lv1_symbol", "hv4_symbol", "lv3_symbol", "hv2_symbol", "lv1_symbol", "lv3_symbol", "hv1_symbol", "lv1_symbol", "lv2_symbol", "lv4_symbol", "lv3_symbol", "lv2_symbol"],
        ["lv1_symbol", "hv2_symbol", "lv3_symbol", "lv4_symbol", "hv3_symbol", "hv2_symbol", "lv2_symbol", "hv2_symbol", "hv2_symbol", "lv1_symbol", "hv3_symbol", "lv1_symbol", "hv1_symbol", "lv2_symbol", "hv3_symbol", "hv2_symbol", "hv4_symbol", "hv1_symbol", "lv2_symbol", "lv4_symbol"],
        ["hv2_symbol", "lv2_symbol", "hv3_symbol", "lv2_symbol", "lv4_symbol", "lv4_symbol", "hv3_symbol", "lv2_symbol", "lv4_symbol", "hv1_symbol", "lv1_symbol", "hv1_symbol", "lv2_symbol", "hv3_symbol", "lv2_symbol", "lv3_symbol", "hv2_symbol", "lv1_symbol", "hv3_symbol", "lv2_symbol"],
        ["lv3_symbol", "lv4_symbol", "hv2_symbol", "hv3_symbol", "hv4_symbol", "hv1_symbol", "hv3_symbol", "hv2_symbol", "hv2_symbol", "hv4_symbol", "hv4_symbol", "hv2_symbol", "lv2_symbol", "hv4_symbol", "hv1_symbol", "lv2_symbol", "hv1_symbol", "lv2_symbol", "hv4_symbol", "lv4_symbol"]
    ],
    positions:{
        position0:[[0,0,0,0,0],[1,1,1,1,1],[2,2,2,2,2]],
        position1:[[1,9,2,0,12],[0,2,3,1,4],[0,11,4,2,5]],
        position2:[[0,11,1,10,5],[1,4,2,9,12],[2,10,3,1,5]]
    },
    payLines:{
        payLines1:[[0,0,0,0,0],
                   [1,1,1,1,1],
                   [0,0,0,0,0]],
        payLines2:[[1,1,1,1,1],
                   [0,0,0,0,0],
                   [0,0,0,0,0]],
        payLines3:[[0,0,0,0,0],
                   [0,0,0,0,0],
                   [1,1,1,1,1]],
        payLines4:[[1,1,0,0,0],
                   [0,0,1,0,0],
                   [0,0,0,1,1]],
        payLines5:[[0,0,0,1,1],
                   [0,0,1,0,0],
                   [1,1,0,0,0]],
        payLines6:[[1,0,0,0,1],
                   [0,1,0,1,0],
                   [0,0,1,0,0]],
        payLines7:[[0,0,1,0,0],
                   [0,1,0,1,0],
                   [1,0,0,0,1]]
    },
    payTable:{
        hv1_symbol:{_3OfAKind:10,_4OfAKind:20,_5OfAKind:50},
        hv2_symbol:{_3OfAKind:5,_4OfAKind:10,_5OfAKind:20},
        hv3_symbol:{_3OfAKind:5,_4OfAKind:10,_5OfAKind:15},
        hv4_symbol:{_3OfAKind:5,_4OfAKind:10,_5OfAKind:15},
        lv1_symbol:{_3OfAKind:2,_4OfAKind:5,_5OfAKind:10},
        lv2_symbol:{_3OfAKind:1,_4OfAKind:2,_5OfAKind:5},
        lv3_symbol:{_3OfAKind:1,_4OfAKind:2,_5OfAKind:3},
        lv4_symbol:{_3OfAKind:1,_4OfAKind:2,_5OfAKind:3}
    }
}