# Disillusion-ST-rework-NPCs-spawn

Makes spawn less random, add quest log and map to [Disillusion ST](https://store.steampowered.com/app/2775370)  

Работает с русификатором

## Description

NPCs won't repeat themselves until everyone is spawned. When the list is over, it can spawn everyone in a circle again.  
NPCs who still have something to say show up first, NPCs who have said everything show up rarely, and empty events are replaced with another one.

You can support me here:  
https://boosty.to/faetterp

## Installation

Download files here and unpack them into the game folder.  
Green button `Code` → `Download ZIP`  
![image](https://github.com/user-attachments/assets/645a6ca9-9a57-4963-a17e-87ba79869a35)

-------------------------------------------------------------------------------------------------------

### Important NPCs

An NPC is important while it still have dialogue you haven't heard, or an unfinished quest needs its.

Important NPCs always stay in the list, so they keep coming back until you're done with them.

The mod stores which dialogues you've heard in your save file. If you install it on an existing save, it doesn't know what you heard earlier, so some NPCs may appear a few times as important until you talk to them again.

If conditions for spawning an event aren't met or the character has run out of dialogues, another event will be spawned instead.

## Map

Press [M].

![map](https://github.com/user-attachments/assets/780615df-615b-4b8d-a94d-f5a1f42c1bdd)

## Quests

Press [J].  
Tracks every item and endings. They are hidden (`???`) until completed to avoid spoiling.

![quests](https://github.com/user-attachments/assets/529d902d-12e3-4cf2-a5f5-33e7949f4ebf)

## How spawn works

The game has a large list of events that can occur, each with its own unique number.

In the base game, when an event spawns, a random number is chosen and that event spawns. That's all.

-------------------------------------------------------------------------------------------------------

With this mod, there is an intermediate check.
If an event spawns, it disappears from the list of possible events for future spawns. It will not be able to spawn again until all NPCs have been spawned.
Important NPCs will not be excluded from the list and can always spawn.

Let's consider an example.

For example, let's have a list of events like this.  
![pool0](https://github.com/user-attachments/assets/20662c42-b447-47ef-bc98-c010d5ae46a8)

1) Suppose a random event is number 8.  
It will spawn and then disappear from the list of available events.  
![pool1](https://github.com/user-attachments/assets/9b653cad-c821-4ae4-9964-72648c4d994e)

2) Next, let's say event number 3 is chosen. It spawns. But since it's marked as important, it doesn't disappear from the list and always has a chance to spawn.  
![pool1](https://github.com/user-attachments/assets/9b653cad-c821-4ae4-9964-72648c4d994e)

3) Later, if event number 8 is chosen again, there will be no such entity in the available list, so a random entity from the available ones will be selected. If it's a regular one (e.g. 5), it's removed from the list; if it's important, it remains in the list.  
![pool2](https://github.com/user-attachments/assets/3c3fe2d5-52ef-4775-b97a-5ff647278aa3)

So, sooner or later, all regular events will be used.  
![pool3](https://github.com/user-attachments/assets/3d575462-ac66-46d7-94be-bd4c4f337701)

Then the list will reset, and all entities can spawn again.  
![pool0](https://github.com/user-attachments/assets/20662c42-b447-47ef-bc98-c010d5ae46a8)

