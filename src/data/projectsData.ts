export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ArchNode {
  id: string;
  label: string;
  details: string;
  type: 'frontend' | 'backend' | 'database' | 'external';
}

export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  technologies: string[];
  role: string;
  timeline: string;
  metrics: ProjectMetric[];
  githubUrl?: string;
  demoUrl?: string;
  challenge: string;
  solution: string;
  architectureNotes: string;
  outcomes: string[];
  architectureNodes: ArchNode[];
  architectureEdges: ArchEdge[];
}

export const projectsData: ProjectData[] = [
  {
    id: "health-tracking-vest",
    title: "Real-Time Health Tracking Vest",
    tagline: "Full-stack IoT dashboard and mobile interface for smart sensory shirts handling real-time streams.",
    description: "A high-performance IoT system designed to aggregate, parse, and visualize vital biosignals (ECG, Heart Rate, Respiratory Rate, Temperature) streamed continuously from smart textile vests.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbN5NVr9TpBCqqTNjZbl0Gds0qk8uCZPND_PEjML0NMAjlr4fwEd9R8LAlh42WJy3s2MitthrTnM3vejKIsjy5kmf4Ns6aT_4Z8Mo657gvIa7ji3-hcrs2mxHVemy1LjsvNb1wr0MtNQOYA7bgctHibD4PwTLd97n2ERSbw-m0pAZPmYM8WYSyHxlSPQA5XR5NNJnoxC0Uxp0Xpr1lDucp4B2g5A7NZQjda5V09QK4RKWircExqCodSDbVBpSuAJpc4GjlY_gH5rA",
    technologies: ["Flutter", "Node.js", "Express", "Socket.io", "MongoDB", "IoT Protocols"],
    role: "Lead Full Stack Architect",
    timeline: "8 Months (2023 - 2024)",
    metrics: [
      { label: "Data Throughput", value: "100+ Streams/sec" },
      { label: "Alert Latency", value: "< 250ms" },
      { label: "Battery Efficiency", value: "+30% savings" },
      { label: "Crash Rate", value: "< 0.05%" }
    ],
    githubUrl: "https://github.com/kirtish10",
    challenge: "Handling concurrent, continuous data streams from hardware vests over unstable Bluetooth/Cellular links without message loss, while ensuring the central dashboard visualizes live high-frequency waves (like ECG graphs) smoothly at 60fps without freezing user devices.",
    solution: "Built a double-buffered data pipeline. Vests stream raw binary telemetry over BLE to a custom Flutter mobile app which compresses and batches packets. The packets are published to a Node.js server using binary WebSocket frames, which handles backpressure gracefully, caches active frames in Redis, and persists key intervals to MongoDB while broadcasting telemetry downstream to dashboard clients using Socket.IO namespaces.",
    architectureNotes: "Continuous data streams flow from wearable hardware to mobile nodes, which acts as the edge computing gateway, performing threshold filtration before publishing to the high-throughput Node.js microservice.",
    outcomes: [
      "Orchestrated back-end that scales smoothly to sustain 100+ continuous high-frequency health streams simultaneously.",
      "Engineered automated anomaly detection rules identifying irregular cardiovascular events in under 250ms, sending immediate push notifications.",
      "Optimized data payload sizes by 45% using Protobuf binary compression instead of raw JSON frames."
    ],
    architectureNodes: [
      { id: "vest", label: "Smart Textile Vest", details: "Fitted with biosensors sending analog signals at high frequencies.", type: "external" },
      { id: "mobile", label: "Flutter Edge App", details: "BLE gateway. Gathers raw data, buffers locally, performs compression.", type: "frontend" },
      { id: "node", label: "Node.js Ingestion Engine", details: "Express web server with Socket.IO. Manages connections and backpressure.", type: "backend" },
      { id: "redis", label: "Redis Buffer Cache", details: "Fast memory layer holding transient live active stream states.", type: "database" },
      { id: "mongo", label: "MongoDB Store", details: "Stores archived historical logs and aggregate statistical trends.", type: "database" },
      { id: "dashboard", label: "React Health Portal", details: "Visualizes high-performance ECG charts using Canvas API.", type: "frontend" }
    ],
    architectureEdges: [
      { from: "vest", to: "mobile", label: "Bluetooth BLE" },
      { from: "mobile", to: "node", label: "WebSockets (Binary)" },
      { from: "node", to: "redis", label: "Pub/Sub Cached" },
      { from: "node", to: "mongo", label: "Mongoose ODM" },
      { from: "node", to: "dashboard", label: "Socket.IO Broadcast" }
    ]
  },
  {
    id: "utm-drone-system",
    title: "UTM System for Drones",
    tagline: "High-integrity Unmanned Traffic Management system featuring real-time spatial geofencing and flight safety zones.",
    description: "An automated cloud platform designed to manage dense drone traffic, register routes, enforce dynamic geofencing, and prevent mid-air collisions in congested airspaces.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-v9lf42z-gdn7uZahpSW5QECJqw4s6HMl_z-wsglCrChcCevYCw3WLDgPIPLzMzg6oTXWKExFEDoTHefWTdEKrtylYqKvRCCOo77vwcDxtH1mOAnvcAYZmYIU6XPvNkuRqE2aauarhgTA69jc84tzr5Pyct95UB-k17l49Sxz_uFa-33iHSFBdgrge4G5czajTabnrZf6FSkCDcfpFIbVLclqLjgjwEBqXXJfS0dTbDP3x1CqpJQvmepuWH4enx0p9GRBdKB6hgQ", // Default backup or customized
    technologies: ["Node.js", "Express", "GeoJSON", "MongoDB", "Socket.io", "Turf.js"],
    role: "Sole Backend & Systems Developer",
    timeline: "6 Months (2024)",
    metrics: [
      { label: "Geofence Check", value: "< 5ms latency" },
      { label: "Telemetry Load", value: "500+ Drones" },
      { label: "Map Rendering", value: "WebGL Accelerated" },
      { label: "API Uptime", value: "99.98%" }
    ],
    githubUrl: "https://github.com/kirtish10",
    challenge: "Developing a collision-avoidance system that calculates spatial intersections for hundreds of moving drone coordinates against complex 3D geofenced polygons in real-time, warning pilots instantly if a boundary is breached or flight paths cross.",
    solution: "Leveraged spatial indexing and Node.js microservices. Integrated Turf.js for complex geometry calculations on the backend, indexing geofences in MongoDB using standard 2dsphere spatial indexes. Designed a lightweight telemetry gateway that reads latitude/longitude/altitude inputs from drones, runs spatial checks, and triggers real-time visual alerts using Socket.IO protocols to push updates to air traffic control web client maps built with WebGL.",
    architectureNotes: "Spatial coordinate data is computed on the fly using Turf.js in a dedicated spatial worker, freeing up the primary web thread to handle pilot logins and routing requests.",
    outcomes: [
      "Engineered real-time geospatial processing engine executing collision queries in under 5ms per event.",
      "Structured support for standard GeoJSON formats, allowing aviation authorities to instantly upload custom restricted airspace maps.",
      "Optimized active telemetry streaming payload, utilizing customized JSON templates that reduce network consumption by 62%."
    ],
    architectureNodes: [
      { id: "drone", label: "Telemetry Transmitters", details: "On-board GPS modules publishing spatial data.", type: "external" },
      { id: "gw", label: "Node.js Flight Gateway", details: "Ingests raw telemetry coordinates and pushes to spatial queue.", type: "backend" },
      { id: "spatial", label: "Turf.js Spatial Engine", details: "Computes polygon intersections and measures path proximities.", type: "backend" },
      { id: "mongo", label: "MongoDB GeoStore", details: "Holds multi-polygon geofences using 2dsphere geospatial indices.", type: "database" },
      { id: "control", label: "ATC Dashboard", details: "WebGL-powered vector map visualizing active drone orbits.", type: "frontend" }
    ],
    architectureEdges: [
      { from: "drone", to: "gw", label: "HTTP POST / REST" },
      { from: "gw", to: "spatial", label: "Internal Node IPC" },
      { from: "spatial", to: "mongo", label: "GeoQueries" },
      { from: "spatial", to: "control", label: "Socket.IO Push" }
    ]
  },
  {
    id: "smart-attendance",
    title: "Smart Attendance Solution",
    tagline: "3-Factor secure enterprise access and biometric logging system utilizing advanced deep-learning facial recognition.",
    description: "An automated workforce access solution powered by computer vision that tracks, logs, and audits attendance in secure industrial facilities.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-v9lf42z-gdn7uZahpSW5QECJqw4s6HMl_z-wsglCrChcCevYCw3WLDgPIPLzMzg6oTXWKExFEDoTHefWTdEKrtylYqKvRCCOo77vwcDxtH1mOAnvcAYZmYIU6XPvNkuRqE2aauarhgTA69jc84tzr5Pyct95UB-k17l49Sxz_uFa-33iHSFBdgrge4G5czajTabnrZf6FSkCDcfpFIbVLclqLjgjwEBqXXJfS0dTbDP3x1CqpJQvmepuWH4enx0p9GRBdKB6hgQ",
    technologies: ["FaceNet", "Python", "Flask", "React", "MySQL", "OpenCV"],
    role: "Co-Developer & ML Engineer",
    timeline: "Smart India Hackathon Winner (2022)",
    metrics: [
      { label: "Active Workers", value: "500+" },
      { label: "Recognition Acc.", value: "99.4%" },
      { label: "Logging Time", value: "< 1.2s / Person" },
      { label: "Anti-Spoofing", value: "Liveness Check OK" }
    ],
    githubUrl: "https://github.com/kirtish10",
    challenge: "Preventing proxy logins (e.g. holding a printed photo or playing a video in front of the camera) and maintaining high recognition speeds in dark, high-traffic industrial facility entry gates with 500+ workers filing in simultaneously.",
    solution: "Designed a multi-factor system combining RFID cards, pin-codes, and neural facial matching. Implemented OpenCV and FaceNet model structures on localized edge-computing cameras. Built an interactive 'liveness' module that requires users to blink or nod their head (motion velocity validation) before extracting the 128-dimensional facial embedding vector, matching it in an SQLite/MySQL cluster database in under 0.2 seconds.",
    architectureNotes: "Deep-learning model inferences run on edge camera hardware units, reducing cloud network dependency and ensuring instant authentication speeds.",
    outcomes: [
      "Awarded 1st place in the prestigious Smart India Hackathon for addressing real industrial safety problems.",
      "Achieved a verified face-matching accuracy of 99.4% under fluctuating, harsh lighting environments.",
      "Engineered automated liveness checking that blocks 100% of proxy-attendance photo spoofing attempts."
    ],
    architectureNodes: [
      { id: "cam", label: "OpenCV Camera Unit", details: "Fitted with infrared sensor checking face geometry.", type: "external" },
      { id: "facenet", label: "FaceNet Inference Model", details: "Processes liveness and generates a 128-dimensional embedding.", type: "backend" },
      { id: "api", label: "Flask Verification API", details: "Core service managing verification logs, RFIDs, and permissions.", type: "backend" },
      { id: "mysql", label: "MySQL DB Core", details: "Stores employee master records and encrypted bio-hashes.", type: "database" },
      { id: "portal", label: "HR Portal (React)", details: "Dynamic dashboard displaying daily metrics and audit trails.", type: "frontend" }
    ],
    architectureEdges: [
      { from: "cam", to: "facenet", label: "Raw Video Frame" },
      { from: "facenet", to: "api", label: "128D Embeddings" },
      { from: "api", to: "mysql", label: "SQL Match Query" },
      { from: "api", to: "portal", label: "SSE Log Stream" }
    ]
  }
];
