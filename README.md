# TBDeveloped

TBDeveloped is an open source platform that allows dreamers/developers to connect with other developers.

# Background and Overview
You're someone with an idea that you know for sure will take off, or maybe you're a developer with a problem that you are stuck on. In both instances you are looking for someone who can help you out and 
* Bulletin Board: Users can post project ideas and request  
* Real-time communications: Allowing users to communicate through video chat and/or messaging.
* Reviews: Users can rate the experience they had with eachother

# Functionality & MVP
- [ ] User authorization: sign up and log in
- [ ] Video chat 
- [ ] Bulletin Board
- [ ] Messaging
- [ ] Reviews
- [ ] Production README

### Bonus Features
- [ ] Whiteboard 
- [ ] Screen Sharing
- [ ] Mobile Website


# Technologies & Technical Challenges

#### Backend: MongoDB/Express
The backend will be entirely platform agnostic with the exception of potential performance optimizations per platform. The separation of the back and front allows for either to be modified, built, updated, or swapped out entirely with minimal impact to the other.

#### Frontend: React/Node.js
The data will be visualized in a Web application using the D3 library. The visualization will take the form of linked circles. The Web app will also provide search capability

#### WebRTC/WebSocket api collection
Utilizing socket.io & peer.js libraries to create peer to peer connections through video chat and messaging. 

Our server will be listening for incoming connections and will establish a connection between clients through the WebSocket handshake when a request is made by a client.

We will be managing real-time display of changes by processing information from the upstream and downstream communications between our server and the clients.

# Group Members & Work Breakdown
Oliver Lopez, Shane Sharareh, Thomas Cheung, William Leung


