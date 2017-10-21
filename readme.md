Frontend
===
Needs contracts in a neighboring repository in order to work.

Needs contracts to be deployed with truffle.

Run `npm i`

Run `npm start`

Todos
===
[] factor in block times.  Right now instant, I'll need to keep polling when I receive tx hash
[] figure out why it takes so long to load, add spinner
[] remove "deadline" and replace it with a hub contract variable
[] add data points like the PVR, the proposal length, etc...
[] add in logos, change colors to match branding
[] refactor spoke pitch
[] subscribe to logs of resource so I can view when people vote
---
[] longer form descriptions (one long and one short)
[] check if member of hub before allowing to vote
[] convert blocks to time?  Or atleast get countdown working