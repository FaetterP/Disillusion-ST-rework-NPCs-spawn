(function (SV) {
    'use strict';

    SV.data = SV.data || {};
    SV.data.questTexts = SV.data.questTexts || {};

    SV.data.questTexts.en = {
        umbrella: {
            title: "UMBRELLA",
            steps: [
                {
                    text: "Enter the door with the purple-tinted faces and look around",
                    result: "You entered the purple-tinted faces door and found yourself in a rainy city. There was a girl in a bucket there."
                },
                {
                    text: "Talk to the girl in the bucket again",
                    result: "The girl in the bucket asked you to pass the umbrella on to the “green lady” and to come back when it gets warm and sunny: she dreams of seeing the sun."
                }
            ]
        },

        sun: {
            title: "THE SUN",
            steps: [
                {
                    text: "Get {quest:umbrella}",
                    result: "You got {quest:umbrella} from the girl in the bucket."
                },
                {
                    text: "Find the sun and talk to it",
                    result: "The sun agreed to join you to prove its usefulness."
                },
                {
                    text: "Talk to it once more",
                    result: "In the second talk it promised to keep shining and bring light to the world even in the face of tragedy."
                }
            ]
        },

        mirror: {
            title: "MIRROR",
            steps: [
                {
                    text: "Talk to the character and agree to go with him",
                    result: "You agreed to go with him to the temple. The mirrored man offered a deal: he will go with you, and when you are done he will take your body to build himself a friend."
                }
            ]
        },

        coffee: {
            title: "COFFEE",
            steps: [
                {
                    text: "Talk to the character in white",
                    result: "You met a woman who looks after an acquaintance of hers because he has memory problems."
                },
                {
                    text: "Talk to him again",
                    result: "You came to him a second time. He had forgotten you..."
                },
                {
                    text: "Talk to him a third time",
                    result: "The third time he offered you a cup of coffee, because it helps keep the mind clear."
                }
            ]
        },

        car: {
            title: "TOY CAR",
            steps: [
                {
                    text: "Find the clown girl with the penguin",
                    result: "You met a clown girl with a penguin: she invited you to a free promotional experience."
                },
                {
                    text: "Find her again and agree to help",
                    result: "The clown girl was left without her penguin and said that Pennies had sent her to scout the competition while he was away. You agreed to help, but saw something you were better off not seeing."
                },
                {
                    text: "Find the girl who replaced the clown girl",
                    result: "You talked to Lyssa, and she told you about a corporation in the processed world. You agreed to go there."
                },
                {
                    text: "Find Toshi",
                    result: "You found Toshi. He had finally come home to his family. His child gave you a toy car."
                }
            ]
        },

        artichoke: {
            title: "ARTICHOKE",
            steps: [
                {
                    text: "Talk to Esmé twice",
                    result: "You talked to Esmé twice: the mime performer spoke about passion and noted that you lack it."
                },
                {
                    text: "Talk to Meri and answer her question",
                    result: "You met Meri, who imitates Esmé in everything, and answered whether she could become like her."
                },
                {
                    text: "Another talk with Meri",
                    result: "You watched Meri perform on stage: she had waited for this moment all her life."
                },
                {
                    text: "Esmé returns for one scene",
                    result: "Esmé came back and said that Meri lives in a dream world and will not become a performer until she overcomes her insecurity."
                },
                {
                    text: "Meri hands over the item",
                    result: "Meri was crying after her performance. Ayumu had also given her an artichoke, and she gave it to you."
                },
                {
                    text: "You hurt Meri: find Ayumu and talk to her twice",
                    result: "You hurt Meri, and her path is now closed. You talked to Ayumu twice. She said she has never had a sister. She also does not understand the girl in blue who keeps running all the time. She prefers to sit and rest instead. And instead of running away from problems, she cuts them off."
                },
                {
                    text: "Talk to Ayumu",
                    result: "Ayumu got stuck on an escalator."
                },
                {
                    text: "Talk to Ayumu",
                    result: "Ayumu said she saw a girl who really wanted to perform on stage. She wanted to give her something, but all she had on her was an artichoke..."
                }
            ]
        },

        doll: {
            title: "PAPER DOLL",
            steps: [
                {
                    text: "Find Ori",
                    result: "You met two paper figures: Ori and Chiyo."
                },
                {
                    text: "Find Ori again and agree to follow her",
                    result: "Ori called you to Chiyo again: she was afraid she was acting like a crybaby."
                },
                {
                    text: "Find Ori once more",
                    result: "Ori said you probably do not believe her and swore that Chiyo acts differently."
                },
                {
                    text: "Talk to Chiyo twice",
                    result: "Chiyo appeared in Ori's place: she was looking for her friend and thinks Ori is avoiding her. She also said you are a bad influence on Ori."
                },
                {
                    text: "Find Ori",
                    result: "..."
                }
            ]
        },

        sitar: {
            title: "SITAR",
            steps: [
                {
                    text: "Get a card box from the card man",
                    result: "The card man makes cards of the characters he meets, and he gave you his card box."
                },
                {
                    text: "Talk to the character four times",
                    result: "You talked to Bakeneko the cat four times: he kept begging for money to relax."
                },
                {
                    text: "Play cards with Jomon",
                    result: "You played cards with Jomon."
                },
                {
                    text: "Find Bakeneko again",
                    result: "You met Bakeneko again: now he was hatless."
                },
                {
                    text: "Collect the debt from him",
                    result: "Bakeneko paid you back with a stolen sitar."
                }
            ]
        },

        sundial: {
            title: "SUNDIAL",
            steps: [
                {
                    text: "Enter the grey-tinted faces door five times",
                    result: "Mel had nightmares about darkness, sorrow and guilt, and about someone controlling her actions."
                },
                {
                    text: "Enter the door six more times. For the fifth scene, play cards with Jomon and meet Bakeneko again",
                    result: "You entered the door six more times and saw Naraka from above."
                },
                {
                    text: "Enter the door once more",
                    result: "You entered the door once more and received the sundial."
                }
            ]
        },

        cigs: {
            title: "CIGARETTES",
            steps: [
                {
                    text: "Talk to the city jester",
                    result: "You talked to the city jester: he figured he had simply bored the king."
                },
                {
                    text: "Find the jester in the subway",
                    result: "The jester appeared on the subway map, and you agreed to board the train with him."
                },
                {
                    text: "Leave the city",
                    result: "In the city you talked to an unusually pale Mel and to the demon, went through the door, and left when the talk with the coffin creature ended."
                },
                {
                    text: "Return to the city once more",
                    result: "You returned to the subway map, where the rat appeared, and agreed to board the train again."
                },
                {
                    text: "Escape from the prison",
                    result: "You woke up in a prison cell and jumped into the hole under your bed."
                },
                {
                    text: "Talk to Froggy",
                    result: "Froggy in the sewer told you about a fat businessman who ran away and dropped menthol cigarettes."
                }
            ]
        },

        pc: {
            title: "PC",
            steps: [
                {
                    text: "Find {quest:cigs}",
                    result: "You got {quest:cigs} from Froggy in the sewer."
                },
                {
                    text: "Talk to Gomi three times",
                    result: "You talked to Gomi three times: she spoke rudely about Mel, asked about the girl with blue hair, and the third time complained that she had lost her apartment key."
                },
                {
                    text: "Find the apartment key",
                    result: "You gave {quest:cigs} to a girl who could barely speak, and got an apartment key from her."
                },
                {
                    text: "Return the key to Gomi",
                    result: "You returned the key to Gomi: she invited you into her room and gave you her PC."
                }
            ]
        },

        floppy: {
            title: "FLOPPY DISK",
            steps: [
                {
                    text: "Find {quest:pc}",
                    result: "You got {quest:pc} from Gomi."
                },
                {
                    text: "Talk to Vicsine three times",
                    result: "You talked to Vicsine twice about a powerful machine, and the third time found her at a broken computer and agreed to help with the virus."
                },
                {
                    text: "Find the virus",
                    result: "You found Konpy, a virus who speaks in cipher and brags about her new cool house."
                },
                {
                    text: "Make Konpy leave",
                    result: "You offered Konpy {quest:pc}, and she stopped tormenting Vicsine's computer."
                },
                {
                    text: "Return to Vicsine",
                    result: "Vicsine was glad her computer was fixed and gave you a floppy disk."
                }
            ]
        },

        gum: {
            title: "GUMBALLS",
            steps: [
                {
                    text: "Talk to the lazy girl",
                    result: "You met Taidana: she commented on your height."
                },
                {
                    text: "Play cards with Taidana",
                    result: "You played cards with Taidana."
                },
                {
                    text: "Talk to her two more times",
                    result: "Taidana said she quit rotting and got a job. Then she left you to look after her shack."
                },
                {
                    text: "The next scene needs {quest:umbrella}",
                    result: "You watched the next scene at the shack."
                },
                {
                    text: "For the next scene, help Gomi get home",
                    result: "Taidana said you screwed up. The boss said they are sinking. And Gomi gave you her gumballs."
                }
            ]
        },

        rose: {
            title: "GOLD ROSE",
            steps: [
                {
                    text: "Keep your karma positive, otherwise Himiko will not want to talk to you",
                    result: "Your karma was positive, and the shrine maiden Himiko talked to you."
                },
                {
                    text: "Talk to Himiko twice",
                    result: "You talked to Himiko twice: she brought you to her home."
                },
                {
                    text: "Return to the city by subway",
                    result: "You rode the subway to the city. There you found Himiko and talked to the robot."
                },
                {
                    text: "Find Himiko again and talk to her",
                    result: "Himiko found you again and asked about the “premonition of death”."
                },
                {
                    text: "Enter the grey door",
                    result: "You entered the grey door: Lilim said she did not care, and you explained why you came."
                },
                {
                    text: "Enter the grey door",
                    result: "You entered the door again and saw that Himiko had reached Lilim first. Himiko died..."
                },
                {
                    text: "Enter the grey door",
                    result: "If you had promised Mel a walk in the park, she joined you at sunset. Otherwise this scene is skipped."
                },
                {
                    text: "Enter the grey door",
                    result: "You received a message from Himiko from another world. The grey door is locked forever."
                },
                {
                    text: "Enter the door with the flowers",
                    result: "In Himiko's garden, among the asphodels, you found a gold rose."
                }
            ]
        },

        ball8: {
            title: "8 BALL",
            steps: [
                {
                    text: "Keep talking to Himiko",
                    result: "Himiko is dead."
                },
                {
                    text: "Find Lilim",
                    result: "Lilim talked to you: she said you had failed and came to pester her. You asked how to defeat Lilith."
                },
                {
                    text: "Find Lilim",
                    result: "You talked to Lilim two more times. She felt sorry watching you drag your feet and gave you a mark that draws Lilith to you."
                },
                {
                    text: "Defeat Lilith",
                    result: "You defeated Lilith."
                },
                {
                    text: "Talk to the girl with blue hair twice",
                    result: "The girl with blue hair said she had met a thing that promises to turn her into a demon. You talked to her twice and saw a scene with the alien creature."
                },
                {
                    text: "Find Lyssa",
                    result: "Lyssa said that she and Lilith were surprised how far you had come, and gave you the 8 ball."
                },
                {
                    text: "Find Lilim",
                    result: "In pacifist mode Lilim talked to you and no longer appears in Naraka. The item can now be obtained from Celare."
                },
                {
                    text: "Talk to Celare four times",
                    result: "You talked to Celare, who is always running, four times: she offered to take you to the rusted halls, the graveyard and the city."
                },
                {
                    text: "Talk to Celare a fifth time",
                    result: "The fifth time Celare said some girl had dropped an 8 ball."
                }
            ]
        },

        figurine: {
            title: "ODD FIGURINE",
            steps: [
                {
                    text: "Enter the door with the flowers",
                    result: "You entered the door with the flowers and found {quest:rose}."
                },
                {
                    text: "Visit the golden church",
                    result: "You came to the golden church floor: the owner at the end of the hallway gave you a token of trust and said he was willing to trade a relic for {quest:rose}."
                },
                {
                    text: "Return to the golden church",
                    result: "The owner of the golden church gave you the figurine, but he will take the rose after your death."
                }
            ]
        },

        guts: {
            title: "INTESTINES",
            steps: [
                {
                    text: "Visit the rusted door",
                    result: "You entered the rusted door and found yourself in a rusted hallway where a horned woman sits, and talked to her. You took the rusted key hanging next to her on a thread."
                },
                {
                    text: "Visit the rusted door",
                    result: "You entered a rusted door and, with the rusted key, rode the lift up to the lord of the rusted realm. He asked you to find an angel and ask for its forgiveness."
                },
                {
                    text: "Visit the angelic door",
                    result: "You entered the angelic door and met an angel."
                },
                {
                    text: "Visit the rusted door",
                    result: "The lord of the rusted realm heard that you had met the angel and let you reach your hand into the angel's remains."
                }
            ]
        },

        drill: {
            title: "HAND DRILL",
            steps: [
                {
                    text: "Get {quest:guts}",
                    result: "You got {quest:guts} from the lord of the rusted realm."
                },
                {
                    text: "Find the character with the sewn-up eyes",
                    result: "The blind and deaf character smelled an angel's guts on you and said that the doctor wants to see you."
                },
                {
                    text: "Visit the doctor",
                    result: "At the hospital you talked to the professor: he asked you to visit the horned woman again."
                },
                {
                    text: "Visit the rusted door",
                    result: "The horned woman hanged herself after your last conversation."
                },
                {
                    text: "Visit the doctor",
                    result: "You returned to the hospital and told him you had seen the hanged girl."
                },
                {
                    text: "Visit the doctor",
                    result: "The professor used fine medical equipment on Mel and gave you his working tools."
                }
            ]
        },

        tower: {
            title: "Tower Ending",
            steps: [
                {
                    text: "Collect all the key items",
                    result: "You collected all the key items."
                },
                {
                    text: "Open the locked doors in the Hub",
                    result: "You opened the locked doors in the Hub across from the save statue."
                },
                {
                    text: "Talk to the characters",
                    result: "You talked to Chii and everyone else and entered the final door."
                }
            ]
        },

        jophiel: {
            title: "Jophiel's Ending",
            steps: [
                {
                    text: "Get {quest:guts} and {quest:sun}",
                    result: "You have {quest:guts} and {quest:sun}."
                },
                {
                    text: "Talk to the sickly woman 7 times",
                    result: "You talked to the sickly woman seven times: she was too tired to fight, and the last time she was frightened when you approached."
                },
                {
                    text: "Talk to Alonya 3 times",
                    result: "Alonya replaced the sickly woman: you talked to her three times, and she tried to understand whether it was a mistake that she had ended up somewhere other than a hospital."
                },
                {
                    text: "Visit the rusted door 5 times",
                    result: "You entered rusted door #4 five times: a crawling robot, Mel in front of a big mirror, the question “When you close your eyes what do you see?”, the compliment “You look nice today”, and Mel with Barre. The answer “You” and the compliment raised [melmance]."
                },
                {
                    text: "Visit the rusted door",
                    result: "The rusted door appeared again: you saw a scene in which Mel and Alonya investigate the scene of the incident."
                },
                {
                    text: "The angel: two talks, then three more — once you have {quest:guts}",
                    result: "The character musing about the cold places of Naraka ignored you at first. Once you had {quest:guts}, he spoke three times: Naraka is young, and he saw the archangel Gabriel, who looked at him with disgust and then with pity."
                },
                {
                    text: "The angel introduces you to Jophiel — two talks with him in different places",
                    result: "He brought you to Jophiel twice to talk in different places."
                },
                {
                    text: "Next time, bring {quest:sun}",
                    result: "With {quest:sun} in your inventory, Jophiel talked to you again."
                },
                {
                    text: "Get {quest:drill}",
                    result: "You got {quest:drill} from the professor."
                },
                {
                    text: "Visit the angelic door",
                    result: "You entered the angelic door with the drill: Mel, lost in thought, walked you through a gallery of paintings and commented on each of your key items. This is needed for the next talk with Jophiel."
                },
                {
                    text: "Talk to the character again",
                    result: "He said Jophiel is looking for your muse and called you to an important meeting: “Someone wishes to see you.”"
                },
                {
                    text: "Jophiel will appear in Naraka himself and stay silent after the talk",
                    result: "Jophiel appeared in Naraka himself and said he hopes his words reached your muse. Now he just stands there in silence."
                },
                {
                    text: "Rusted door #4: say to Mel exactly in this order — “I don't want you to die.”, “We are tampering with the worlds balance.”, “The beauty of earth and the naraka....”, “Allow it to heal through forgiveness.”, “Jophiel can cure us...”, “Forgive yourself.”",
                    result: "In rusted door #4 you said to Mel, in order: “I don't want you to die.”, “We are tampering with the worlds balance.”, “The beauty of earth and the naraka....”, “Allow it to heal through forgiveness.”, “Jophiel can cure us...”, “Forgive yourself.” After that the door disappeared."
                },
                {
                    text: "Meet Jophiel in the Hub — the ending begins",
                    result: "You met Jophiel in the Hub, and the ending began."
                }
            ]
        },

        hantu: {
            title: "Mainan Hantu Ending",
            steps: [
                {
                    text: "Meet the dancing mushroom 4 times",
                    result: "You talked to the dancing mushroom four times: he said it is okay to feel lost and asked about your worries."
                },
                {
                    text: "The mushroom is replaced by a stuffed monkey",
                    result: "The mushroom was replaced by a stuffed monkey who asked “Why?”. This scene requires nothing."
                },
                {
                    text: "The last four scenes require {quest:doll}",
                    result: "With {quest:doll} you saw the last four scenes with the stuffed monkey: she said she had caught you and asked whether you had thought about it."
                },
                {
                    text: "Get {quest:rose}, then the stuffed monkey will appear in the Hub",
                    result: "With {quest:rose} in your inventory, the stuffed monkey appeared in the Hub."
                },
                {
                    text: "Visit the angelic door",
                    result: "You entered the angelic door with the dolls: dolls ran across the sand, and Mel introduced you to her porcelain friend."
                },
                {
                    text: "Visit the angelic door 4 more times",
                    result: "You entered the door four more times (two scenes required {quest:umbrella}): the porcelain friend got used to the umbrella and said the sun usually makes her feel unwell."
                },
                {
                    text: "The last four scenes need {quest:ball8} and {quest:sundial}",
                    result: "With {quest:ball8} and {quest:sundial} you saw the last four scenes. After them the door disappeared from Naraka."
                },
                {
                    text: "Find the stuffed monkey in the Hub — the ending begins",
                    result: "You found the stuffed monkey in the Hub, and the ending began."
                }
            ]
        }
    };

})(window.SpawnViewer = window.SpawnViewer || {});
