# Disillusion-ST-rework-NPCs-spawn

Makes spawn less random for [Disillusion ST](https://store.steampowered.com/app/2775370)

## Desription

NPCs won't repeat themselves until everyone is spawned. When the list is over, it can spawn everyone in a circle again.  
And empty events will be replaced with random allowed event. (except doors and some important characters)

This job is small, but you can still support me here:  
https://boosty.to/faetterp

## Instruction

Download script and unpack it into the game folder.  
![image](https://github.com/user-attachments/assets/645a6ca9-9a57-4963-a17e-87ba79869a35)

How it works Изменить
The game has a large list of events that can occur, each with its own unique number.

Currently, when an event spawns, a random number is chosen, and the event spawns. That's all.

-------------------------------------------------------------------------------------------------------

In this rework, I’ve added an intermediate check.
If an event spawns, it disappears from the list of possible events for future spawns. It will not be able to spawn again until all NPCs have been spawned.
Important NPCs will not be excluded from the list and can always spawn.

Let's consider an example.

For example, let's have a list of events like this.  
![pool0](https://github.com/user-attachments/assets/20662c42-b447-47ef-bc98-c010d5ae46a8)

1) Suppose a random event is number 8.  
It will spawn and then disappear from the list of available events.  
![pool1](https://github.com/user-attachments/assets/9b653cad-c821-4ae4-9964-72648c4d994e)

2) Next, let’s say event number 3 is chosen. It spawns. But since it's marked as important, it doesn't disappear from the list and always has a chance to spawn.  
![pool1](https://github.com/user-attachments/assets/9b653cad-c821-4ae4-9964-72648c4d994e)

3) Later, if event number 8 is chosen again, there will be no such entity in the available list, so a random entity from the available ones will be selected. If it’s a regular one (e.g. 5), it’s removed from the list; if it’s special, it remains in the list.  
![pool2](https://github.com/user-attachments/assets/3c3fe2d5-52ef-4775-b97a-5ff647278aa3)

So, sooner or later, all regular events will be used.  
![pool3](https://github.com/user-attachments/assets/3d575462-ac66-46d7-94be-bd4c4f337701)

Then the list will reset, and all entities can spawn again.  
![pool0](https://github.com/user-attachments/assets/20662c42-b447-47ef-bc98-c010d5ae46a8)

-------------------------------------------------------------------------------------------------------

There is also a check to determine if an event is empty. If conditions for spawning the event aren’t met or character has run out of dialogues, another event will be spawned instead.
