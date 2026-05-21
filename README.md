# Emby projectM Visualizer 
(proof of concept, not built or tested currently)

#Build Instructions 
This guide explains how to build:
1.	The Emby plugin DLL 
2.	The Dockerized projectM visualization server 
3.	The React frontend overlay 
4.	The complete local development environment 
________________________________________
Prerequisites
Install the following first.
Required Software
Docker Desktop
Windows / macOS:
•	Docker Desktop 
Linux:
•	Docker Engine Install Docs 
________________________________________
.NET SDK 6
Install:
•	.NET 6 SDK 
Verify:
dotnet --version
Expected:
6.x.x
________________________________________
Node.js 20+
Install:
•	Node.js 
Verify:
node -v
npm -v
________________________________________
Git
Install:
•	Git 
________________________________________
Repository Layout
After extracting the ZIP:
emby-projectm-visualizer/
│
├── emby-plugin/
├── visualizer-server/
├── frontend/
└── README.md
________________________________________
Phase 1 — Build the Emby Plugin DLL
Step 1 — Open Terminal
Navigate:
cd emby-projectm-visualizer/emby-plugin
________________________________________
Step 2 — Restore Packages
dotnet restore
________________________________________
Step 3 — Build Release DLL
dotnet publish -c Release
________________________________________
Step 4 — Locate DLL Output
Generated here:
bin/Release/net6.0/publish/
You should see:
projectm.emby.dll
________________________________________
Step 5 — Install Plugin into Emby
Create plugin folder:
Windows
C:\Users\<USER>\AppData\Roaming\Emby-Server\programdata\plugins\projectm\
Linux
/var/lib/emby/plugins/projectm/
Copy:
projectm.emby.dll
into that folder.
________________________________________
Step 6 — Restart Emby
Restart the server.
Open:
Dashboard -> Plugins
You should see:
projectM Visualizer
________________________________________
Phase 2 — Build Docker Visualization Service
________________________________________
Step 1 — Open Visualization Server Directory
cd emby-projectm-visualizer/visualizer-server
________________________________________
Step 2 — Build Docker Image
docker compose build
This installs:
•	projectM 
•	FFmpeg 
•	Node.js 
•	PulseAudio 
•	Xvfb 
•	OpenGL libraries 
________________________________________
Step 3 — Start Container
docker compose up -d
________________________________________
Step 4 — Verify Running
Check:
docker ps
Expected:
projectm-visualizer
________________________________________
Step 5 — Open Visualization Stream
Visit:
http://localhost:8080
Or:
http://localhost:8080/stream/index.m3u8
________________________________________
Docker Commands
Stop Container
docker compose down
________________________________________
Rebuild Container
docker compose up --build -d
________________________________________
View Logs
docker logs -f projectm-visualizer
________________________________________
Phase 3 — Build React Frontend
________________________________________
Step 1 — Open Frontend Directory
cd emby-projectm-visualizer/frontend
________________________________________
Step 2 — Install Dependencies
npm install
________________________________________
Step 3 — Start Dev Server
npm run dev
________________________________________
Step 4 — Open Browser
Usually:
http://localhost:5173
________________________________________
Phase 4 — Connect Everything Together
________________________________________
Configure Plugin
Open Emby:
Dashboard -> Plugins -> projectM Visualizer
Set:
Visualization Server URL:
http://localhost:8080
Save settings.
________________________________________
Playback Flow
When music starts:
Emby
  -> Plugin detects playback
  -> Sends playback event
  -> Docker renderer activates
  -> projectM renders visuals
  -> FFmpeg streams video
  -> Frontend overlay displays visualization
