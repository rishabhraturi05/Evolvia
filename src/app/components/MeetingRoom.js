"use client";

import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const MeetingRoom = ({ roomId, role = "Student", onLeave }) => {
    const [peerId, setPeerId] = useState("");
    const [remotePeerId, setRemotePeerId] = useState("");
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [status, setStatus] = useState("Initializing...");
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerRef = useRef(null);
    const callRef = useRef(null);

    // Safety check for roomId
    const safeRoomId = roomId || "test-room";
    const safeRole = role ? role.toLowerCase() : "student";

    // Deterministic IDs ensure we can connect without a backend list
    const getMyId = () => `${safeRoomId}-${safeRole}`;
    const getTargetId = () => `${safeRoomId}-${safeRole === "student" ? "mentor" : "student"}`;

    useEffect(() => {
        if (!roomId) {
            console.warn("MeetingRoom: No roomId provided. Using default.");
        }

        const initPeer = async () => {
            try {
                // 1. Get Local Stream
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                // 2. Initialize PeerJS
                const myId = getMyId();
                const peer = new Peer(myId, {
                    debug: 2,
                });

                peer.on("open", (id) => {
                    console.log("My Peer ID:", id);
                    setPeerId(id);
                    setStatus("Waiting for peer...");

                    // If we are likely to be the caller (e.g., Student calls Mentor, or just try connecting)
                    connectToPeer(peer, stream);
                });

                // 3. Handle Incoming Calls
                peer.on("call", (call) => {
                    console.log("Incoming call from:", call.peer);
                    setStatus("Receiving call...");
                    call.answer(stream); // Answer with our stream
                    setupCall(call);
                });

                // 4. Handle Errors
                peer.on("error", (err) => {
                    console.error("Peer error:", err);
                    if (err.type === "peer-unavailable") {
                        setStatus("Peer not connected yet. Retrying...");
                        setTimeout(() => {
                            if (peerRef.current && !callRef.current) {
                                connectToPeer(peerRef.current, stream);
                            }
                        }, 3000); // Retry every 3 seconds
                    } else if (err.type === "unavailable-id") {
                        setStatus("ID taken. Are you already in this meeting?");
                    } else {
                        setStatus(`Error: ${err.type}`);
                    }
                });

                peerRef.current = peer;
            } catch (err) {
                console.error("Initialization error:", err);
                setStatus("Failed to access camera/mic");
            }
        };

        initPeer();

        return () => {
            // Cleanup
            localStream?.getTracks().forEach((track) => track.stop());
            peerRef.current?.destroy();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId, role]);

    const connectToPeer = (peer, stream) => {
        const targetId = getTargetId();
        console.log("Attempting to call:", targetId);

        // Check if we are already connected to avoid loops
        if (callRef.current && callRef.current.peer === targetId && callRef.current.open) {
            return;
        }

        const call = peer.call(targetId, stream);
        setupCall(call);
    };

    const setupCall = (call) => {
        call.on("stream", (remoteStream) => {
            console.log("Receiving remote stream");
            setRemoteStream(remoteStream);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
            }
            setStatus("Connected");
            setRemotePeerId(call.peer);
        });

        call.on("close", () => {
            console.log("Call closed");
            setStatus("Peer disconnected");
            setRemoteStream(null);
            callRef.current = null;
        });

        call.on("error", (e) => {
            console.log("Call error", e);
            callRef.current = null;
        });

        callRef.current = call;
    };

    const toggleMute = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            localStream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
            setIsVideoOff(!isVideoOff);
        }
    };


    const handleLeave = () => {
        // Stop local media
        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
        }

        // Destroy peer connection
        if (peerRef.current) {
            peerRef.current.destroy();
        }

        // Notify parent
        if (onLeave) {
            onLeave();
        }

        // Force reload if needed to clear ghosts (optional, but helps with PeerJS)
        // window.location.reload(); 
    };

    return (
        <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center p-4 z-50">
            {/* Header */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white">
                <div>
                    <h2 className="text-xl font-bold">Meeting: {roomId}</h2>
                    <p className="text-slate-400 text-sm">Role: {role}</p>
                </div>
                <div className="bg-slate-800 px-3 py-1 rounded-full text-sm">
                    Status: <span className={status === "Connected" ? "text-green-400" : "text-yellow-400"}>{status}</span>
                </div>
            </div>

            {/* Video Grid */}
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-6xl h-[70vh]">
                {/* Remote Video (Main Focus) */}
                <div className="flex-1 bg-black rounded-2xl overflow-hidden relative border border-slate-800 shadow-2xl">
                    {remoteStream ? (
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 animate-pulse">
                            <div className="text-4xl mb-4">👤</div>
                            <p>Waiting for peer...</p>
                            <p className="text-xs mt-2">Target ID: {getTargetId()}</p>
                        </div>
                    )}
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-white text-sm">
                        {role === "Student" ? "Mentor" : "Student"}
                    </div>
                </div>

                {/* Local Video (PiP style or Sidebar) */}
                <div className="w-full md:w-80 h-48 md:h-64 bg-slate-900 rounded-2xl overflow-hidden relative border border-slate-700 shadow-lg shrink-0">
                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        playsInline
                        className={`w-full h-full object-cover transform scale-x-[-1] ${isVideoOff ? 'hidden' : ''}`}
                    />
                    {isVideoOff && (
                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                            📷 Video Off
                        </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur px-2 py-1 rounded text-white text-xs">
                        You ({role})
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex gap-4">
                <button
                    onClick={toggleMute}
                    className={`p-4 rounded-full transition ${isMuted ? 'bg-red-500 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
                >
                    {isMuted ? "🔇 Unmute" : "🎤 Mute"}
                </button>
                <button
                    onClick={toggleVideo}
                    className={`p-4 rounded-full transition ${isVideoOff ? 'bg-red-500 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
                >
                    {isVideoOff ? "📷 Start Video" : "🚫 Stop Video"}
                </button>
                <button
                    onClick={handleLeave}
                    className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold px-8"
                >
                    Leave Call
                </button>
            </div>
        </div>
    );
};

export default MeetingRoom;
